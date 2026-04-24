import { describe, it, expect } from 'vitest'
import {
  BRAND_COLORS, SECONDARY_COLORS, STATUS_COLORS, SURFACE_COLORS, TEXT_COLORS,
  FONTS, SPACING, RADII, GLOWS,
} from '@/app/design-system/sections/foundationsData'

const ALL_COLORS = [
  ...BRAND_COLORS, ...SECONDARY_COLORS, ...STATUS_COLORS,
  ...SURFACE_COLORS, ...TEXT_COLORS,
]

const HEX_OR_RGBA = /^(#[0-9A-Fa-f]{6}|rgba?\(.+\))$/

describe('Color tokens', () => {
  it('every color has name, hex, var, tw, usage', () => {
    for (const c of ALL_COLORS) {
      expect(c).toHaveProperty('name')
      expect(c).toHaveProperty('hex')
      expect(c).toHaveProperty('var')
      expect(c).toHaveProperty('tw')
      expect(c).toHaveProperty('usage')
    }
  })

  it('hex values match #XXXXXX or rgba(...) format', () => {
    for (const c of ALL_COLORS) {
      expect(c.hex).toMatch(HEX_OR_RGBA)
    }
  })

  it('no duplicate color names', () => {
    const names = ALL_COLORS.map(c => c.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('total color count is 19', () => {
    expect(ALL_COLORS).toHaveLength(19)
  })
})

describe('FONTS', () => {
  it('has exactly 4 entries', () => {
    expect(FONTS).toHaveLength(4)
  })

  it('every font has required fields', () => {
    for (const f of FONTS) {
      expect(f).toHaveProperty('name')
      expect(f).toHaveProperty('role')
      expect(f).toHaveProperty('variable')
      expect(f).toHaveProperty('twClass')
      expect(f).toHaveProperty('weights')
      expect(f).toHaveProperty('sizes')
      expect(f).toHaveProperty('usage')
    }
  })

  it('no duplicate font names', () => {
    const names = FONTS.map(f => f.name)
    expect(new Set(names).size).toBe(names.length)
  })
})

describe('SPACING', () => {
  it('has 9 values', () => {
    expect(SPACING).toHaveLength(9)
  })

  it('all positive integers', () => {
    for (const s of SPACING) {
      expect(Number.isInteger(s)).toBe(true)
      expect(s).toBeGreaterThan(0)
    }
  })

  it('sorted ascending', () => {
    for (let i = 1; i < SPACING.length; i++) {
      expect(SPACING[i]).toBeGreaterThan(SPACING[i - 1])
    }
  })
})

describe('RADII', () => {
  it('has 4 entries', () => {
    expect(RADII).toHaveLength(4)
  })

  it('every radius has name, var, value, usage', () => {
    for (const r of RADII) {
      expect(r).toHaveProperty('name')
      expect(r).toHaveProperty('var')
      expect(r).toHaveProperty('value')
      expect(r).toHaveProperty('usage')
    }
  })

  it('no duplicate radius names', () => {
    const names = RADII.map(r => r.name)
    expect(new Set(names).size).toBe(names.length)
  })
})

describe('GLOWS', () => {
  it('has 6 entries', () => {
    expect(GLOWS).toHaveLength(6)
  })

  it('css values are non-empty strings', () => {
    for (const g of GLOWS) {
      expect(typeof g.css).toBe('string')
      expect(g.css.length).toBeGreaterThan(0)
    }
  })

  it('no duplicate glow class names', () => {
    const cls = GLOWS.map(g => g.cls)
    expect(new Set(cls).size).toBe(cls.length)
  })
})
