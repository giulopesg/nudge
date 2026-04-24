import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

type DTCGToken = { $type: string; $value: string; $description?: string }
type DTCGNode = DTCGToken | { [key: string]: DTCGNode }

const tokenPath = resolve(__dirname, '../../public/design-tokens.json')
const raw = readFileSync(tokenPath, 'utf-8')
const tokens = JSON.parse(raw) as Record<string, DTCGNode>

function isLeaf(node: DTCGNode): node is DTCGToken {
  return '$type' in node && '$value' in node
}

function collectLeaves(node: DTCGNode, leaves: DTCGToken[] = []): DTCGToken[] {
  if (isLeaf(node)) {
    leaves.push(node)
  } else {
    for (const value of Object.values(node)) {
      collectLeaves(value as DTCGNode, leaves)
    }
  }
  return leaves
}

describe('public/design-tokens.json — snapshot', () => {
  it('matches the approved output', () => {
    expect(tokens).toMatchSnapshot()
  })
})

describe('DTCG structure validation', () => {
  const leaves = collectLeaves(tokens)

  it('every leaf token has $type and $value', () => {
    for (const leaf of leaves) {
      expect(leaf).toHaveProperty('$type')
      expect(leaf).toHaveProperty('$value')
      expect(typeof leaf.$type).toBe('string')
      expect(typeof leaf.$value).toBe('string')
    }
  })

  it('total token count is 42 (19 colors + 4 fonts + 9 spacings + 4 radii + 6 shadows)', () => {
    expect(leaves).toHaveLength(42)
  })

  it('token types are from the expected set', () => {
    const validTypes = new Set(['color', 'fontFamily', 'dimension', 'shadow'])
    for (const leaf of leaves) {
      expect(validTypes.has(leaf.$type)).toBe(true)
    }
  })
})
