import { describe, it, expect } from 'vitest'
import { generateDesignTokens } from '@/lib/design-tokens'

describe('generateDesignTokens() — snapshot', () => {
  const tokens = generateDesignTokens()

  it('matches the approved token snapshot', () => {
    expect(tokens).toMatchSnapshot()
  })

  it('has the expected top-level groups', () => {
    const n2ds = tokens.n2ds as Record<string, unknown>
    expect(Object.keys(n2ds).sort()).toEqual(
      ['color', 'font', 'radius', 'shadow', 'spacing'],
    )
  })

  it('has all 5 color sub-groups', () => {
    const color = (tokens.n2ds as Record<string, Record<string, unknown>>).color
    expect(Object.keys(color).sort()).toEqual(
      ['brand', 'secondary', 'status', 'surface', 'text'],
    )
  })
})
