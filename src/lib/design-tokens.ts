/**
 * W3C Design Token Community Group (DTCG) generator
 * Reads from foundationsData and outputs a spec-compliant token object.
 * Spec: https://tr.designtokens.org/format/
 */
import {
  BRAND_COLORS, SECONDARY_COLORS, STATUS_COLORS, SURFACE_COLORS, TEXT_COLORS,
  FONTS, SPACING, RADII, GLOWS,
} from '@/app/design-system/sections/foundationsData';

type DTCGToken = { $type: string; $value: string; $description?: string };
type DTCGGroup = { [key: string]: DTCGToken | DTCGGroup };

function colorToken(hex: string, usage: string): DTCGToken {
  return { $type: 'color', $value: hex, $description: usage };
}

function colorsToGroup(colors: { name: string; hex: string; usage: string }[]): DTCGGroup {
  const group: DTCGGroup = {};
  for (const c of colors) {
    const key = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '').replace(/^-+/, '');
    group[key] = colorToken(c.hex, c.usage);
  }
  return group;
}

export function generateDesignTokens(): DTCGGroup {
  return {
    n2ds: {
      color: {
        brand: colorsToGroup(BRAND_COLORS),
        secondary: colorsToGroup(SECONDARY_COLORS),
        status: colorsToGroup(STATUS_COLORS),
        surface: colorsToGroup(SURFACE_COLORS),
        text: colorsToGroup(TEXT_COLORS),
      },
      font: Object.fromEntries(
        FONTS.map(f => [
          f.name.toLowerCase().replace(/\s+/g, '-'),
          {
            $type: 'fontFamily',
            $value: f.name,
            $description: `${f.role} — ${f.usage}`,
          },
        ]),
      ),
      spacing: Object.fromEntries(
        SPACING.map(px => [
          String(px),
          {
            $type: 'dimension',
            $value: `${px}px`,
            $description: `${px / 4}rem`,
          },
        ]),
      ),
      radius: Object.fromEntries(
        RADII.map(r => [
          r.name,
          {
            $type: 'dimension',
            $value: r.value,
            $description: r.usage,
          },
        ]),
      ),
      shadow: Object.fromEntries(
        GLOWS.map(g => [
          g.cls.replace('glow-', ''),
          {
            $type: 'shadow',
            $value: g.css,
            $description: g.name,
          },
        ]),
      ),
    },
  };
}
