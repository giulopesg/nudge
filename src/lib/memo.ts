import {
  PublicKey,
  TransactionInstruction,
  Transaction,
  type Connection,
} from '@solana/web3.js';

const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

/**
 * SHA-256 hash of "wallet:neurotags_sorted:goals_sorted" → first 16 hex chars.
 */
export async function hashProfile(
  wallet: string,
  neurotags: string[],
  goals: string[],
): Promise<string> {
  const input = `${wallet}:${[...neurotags].sort().join(',')}:${[...goals].sort().join(',')}`;
  const encoded = new TextEncoder().encode(input);
  const data = new Uint8Array(encoded).buffer as ArrayBuffer;
  const buffer = await crypto.subtle.digest('SHA-256', data);
  const hex = Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hex.slice(0, 16);
}

/**
 * Build the JSON payload for the memo instruction.
 */
export function buildMemoPayload(hash: string, characterClass: string): string {
  return JSON.stringify({
    app: 'nudge',
    action: 'register',
    hash,
    class: characterClass,
    v: 1,
  });
}

/**
 * Build a Transaction with a single Memo Program v2 instruction.
 */
export function buildMemoTransaction(
  payload: string,
  signer: PublicKey,
): Transaction {
  const instruction = new TransactionInstruction({
    programId: MEMO_PROGRAM_ID,
    keys: [{ pubkey: signer, isSigner: true, isWritable: false }],
    data: Buffer.from(payload, 'utf-8'),
  });

  const tx = new Transaction();
  tx.add(instruction);
  return tx;
}

/**
 * Full registration flow: hash → build → send → confirm.
 * Returns the transaction signature on success.
 */
export async function sendRegistration(
  wallet: PublicKey,
  connection: Connection,
  sendTransaction: (tx: Transaction, connection: Connection) => Promise<string>,
  neurotags: string[],
  goals: string[],
  characterClass: string,
): Promise<{ txSignature: string; hash: string }> {
  const hash = await hashProfile(wallet.toBase58(), neurotags, goals);
  const payload = buildMemoPayload(hash, characterClass);
  const tx = buildMemoTransaction(payload, wallet);

  const txSignature = await sendTransaction(tx, connection);
  await connection.confirmTransaction(txSignature, 'confirmed');

  return { txSignature, hash };
}
