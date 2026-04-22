/**
 * Generate public/design-tokens.json from foundationsData.
 * Run: npm run tokens
 *
 * Uses dynamic import via tsx or ts-node — but since foundationsData is
 * plain TS (no JSX), we inline-read and eval via a simple approach:
 * we import the compiled output. For simplicity, we read the source
 * and extract data manually.
 *
 * Approach: spawn a small inline TS snippet via tsx.
 */
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Use npx tsx to run the token generator in TS context
const json = execSync(
  `npx tsx -e "import { generateDesignTokens } from './src/lib/design-tokens'; console.log(JSON.stringify(generateDesignTokens(), null, 2))"`,
  { cwd: root, encoding: 'utf-8' },
);

const outPath = resolve(root, 'public/design-tokens.json');
writeFileSync(outPath, json.trim() + '\n');
console.log(`✔ Written ${outPath}`);
