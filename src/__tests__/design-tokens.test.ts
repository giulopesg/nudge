import { describe, it, expect } from 'vitest'
import { generateDesignTokens } from '@/lib/design-tokens'

describe('generateDesignTokens() — snapshot', () => {
  const tokens = generateDesignTokens()

  it('matches the approved token snapshot', () => {
    expect(tokens).toMatchSnapshot()
  })

  it('has the expected top-level groups (primitive + semantic)', () => {
    const n2ds = tokens.n2ds as Record<string, unknown>
    expect(Object.keys(n2ds).sort()).toEqual(
      ['primitive', 'semantic'],
    )
  })

  it('primitive has color, font, spacing, radius', () => {
    const primitive = (tokens.n2ds as Record<string, Record<string, unknown>>).primitive
    expect(Object.keys(primitive).sort()).toEqual(
      ['color', 'font', 'radius', 'spacing'],
    )
  })

  it('semantic has color, font, radius, shadow, spacing', () => {
    const semantic = (tokens.n2ds as Record<string, Record<string, unknown>>).semantic
    expect(Object.keys(semantic).sort()).toEqual(
      ['color', 'font', 'radius', 'shadow', 'spacing'],
    )
  })

  it('semantic color has all 5 sub-groups', () => {
    const color = (
      (tokens.n2ds as Record<string, Record<string, Record<string, unknown>>>)
        .semantic.color
    )
    expect(Object.keys(color).sort()).toEqual(
      ['brand', 'secondary', 'status', 'surface', 'text'],
    )
  })

  it('primitive color has the 12 palette families', () => {
    const color = (
      (tokens.n2ds as Record<string, Record<string, Record<string, unknown>>>)
        .primitive.color
    )
    expect(Object.keys(color).sort()).toEqual(
      ['amber', 'coral', 'cream', 'emerald', 'mint', 'orchid', 'rose', 'void'],
    )
  })

  it('solid semantic tokens use DTCG alias syntax', () => {
    const brand = (
      tokens.n2ds as Record<string, Record<string, Record<string, Record<string, Record<string, { $value: string }>>>>>
    ).semantic.color.brand
    expect(brand.primary.$value).toBe('{n2ds.primitive.color.orchid.500}')
  })

  it('opacity semantic tokens include $extensions', () => {
    const brand = (
      tokens.n2ds as Record<string, Record<string, Record<string, Record<string, Record<string, { $value: string; $extensions?: Record<string, unknown> }>>>>>
    ).semantic.color.brand
    expect(brand['primary-muted'].$extensions).toEqual({
      primitive: 'orchid/500',
      alpha: 0.12,
    })
  })
})
