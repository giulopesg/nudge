/**
 * W3C Design Token Community Group (DTCG) generator
 * Outputs a two-layer structure: primitive (raw palette) + semantic (intent).
 * Spec: https://tr.designtokens.org/format/
 */
import {
  PRIMITIVE_COLORS,
  BRAND_COLORS, SECONDARY_COLORS, STATUS_COLORS, SURFACE_COLORS, TEXT_COLORS,
  FONTS, SPACING, RADII, GLOWS,
} from '@/app/design-system/sections/foundationsData';

type DTCGToken = { $type: string; $value: string; $description?: string; $extensions?: Record<string, unknown> };
type DTCGGroup = { [key: string]: DTCGToken | DTCGGroup };

/* ── Helpers ─────────────────────────────────── */

function primitiveKey(name: string): string {
  // "orchid/500" → { group: "orchid", scale: "500" }
  const [group, scale] = name.split('/');
  return `${group}.${scale}`;
}

function aliasRef(primitiveName: string): string {
  return `{n2ds.primitive.color.${primitiveKey(primitiveName)}}`;
}

/* ── Primitive layer ─────────────────────────── */

function buildPrimitiveColors(): DTCGGroup {
  const group: DTCGGroup = {};
  for (const p of PRIMITIVE_COLORS) {
    const [family, scale] = p.name.split('/');
    if (!group[family]) group[family] = {};
    (group[family] as DTCGGroup)[scale] = {
      $type: 'color',
      $value: p.hex,
      $description: p.usage,
    };
  }
  return group;
}

function buildPrimitiveFonts(): DTCGGroup {
  return Object.fromEntries(
    FONTS.map(f => [
      f.name.toLowerCase().replace(/\s+/g, '-'),
      {
        $type: 'fontFamily',
        $value: f.name,
        $description: `${f.role} — ${f.usage}`,
      },
    ]),
  );
}

function buildPrimitiveSpacing(): DTCGGroup {
  return Object.fromEntries(
    SPACING.map(px => [
      String(px),
      {
        $type: 'dimension',
        $value: `${px}px`,
        $description: `${px / 4}rem`,
      },
    ]),
  );
}

function buildPrimitiveRadius(): DTCGGroup {
  return Object.fromEntries(
    RADII.map(r => [
      r.name,
      {
        $type: 'dimension',
        $value: r.value,
        $description: r.usage,
      },
    ]),
  );
}

/* ── Semantic layer ──────────────────────────── */

type SemanticColor = {
  name: string;
  hex: string;
  usage: string;
  primitive?: string;
  alpha?: number;
};

function semanticColorToken(c: SemanticColor): DTCGToken {
  const hasAlpha = typeof c.alpha === 'number';

  if (c.primitive && !hasAlpha) {
    // Solid token → DTCG alias
    return {
      $type: 'color',
      $value: aliasRef(c.primitive),
      $description: c.usage,
    };
  }

  if (c.primitive && hasAlpha) {
    // Opacity token → explicit value + extension documenting the base
    return {
      $type: 'color',
      $value: c.hex,
      $description: c.usage,
      $extensions: { primitive: c.primitive, alpha: c.alpha },
    };
  }

  // Fallback (no primitive info)
  return { $type: 'color', $value: c.hex, $description: c.usage };
}

function semanticColorsToGroup(colors: SemanticColor[]): DTCGGroup {
  const group: DTCGGroup = {};
  for (const c of colors) {
    const key = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '').replace(/^-+/, '');
    group[key] = semanticColorToken(c);
  }
  return group;
}

function buildSemanticFonts(): DTCGGroup {
  return Object.fromEntries(
    FONTS.map(f => {
      const key = f.name.toLowerCase().replace(/\s+/g, '-');
      return [
        key,
        {
          $type: 'fontFamily',
          $value: `{n2ds.primitive.font.${key}}`,
          $description: `${f.role} — ${f.usage}`,
        },
      ];
    }),
  );
}

function buildSemanticSpacing(): DTCGGroup {
  return Object.fromEntries(
    SPACING.map(px => [
      String(px),
      {
        $type: 'dimension',
        $value: `{n2ds.primitive.spacing.${px}}`,
        $description: `${px / 4}rem`,
      },
    ]),
  );
}

function buildSemanticRadius(): DTCGGroup {
  return Object.fromEntries(
    RADII.map(r => [
      r.name,
      {
        $type: 'dimension',
        $value: `{n2ds.primitive.radius.${r.name}}`,
        $description: r.usage,
      },
    ]),
  );
}

function buildSemanticShadows(): DTCGGroup {
  return Object.fromEntries(
    GLOWS.map(g => [
      g.cls.replace('glow-', ''),
      {
        $type: 'shadow',
        $value: g.css,
        $description: g.name,
      },
    ]),
  );
}

/* ── Public API ──────────────────────────────── */

export function generateDesignTokens(): DTCGGroup {
  return {
    n2ds: {
      primitive: {
        color: buildPrimitiveColors(),
        font: buildPrimitiveFonts(),
        spacing: buildPrimitiveSpacing(),
        radius: buildPrimitiveRadius(),
      },
      semantic: {
        color: {
          brand: semanticColorsToGroup(BRAND_COLORS),
          secondary: semanticColorsToGroup(SECONDARY_COLORS),
          status: semanticColorsToGroup(STATUS_COLORS),
          surface: semanticColorsToGroup(SURFACE_COLORS),
          text: semanticColorsToGroup(TEXT_COLORS),
        },
        font: buildSemanticFonts(),
        spacing: buildSemanticSpacing(),
        radius: buildSemanticRadius(),
        shadow: buildSemanticShadows(),
      },
    },
  };
}
