'use client';

import { useState } from 'react';
import './design-system.css';
import { strong, accent, mono } from './helpers';
import SectionFoundation from './SectionFoundation';
import SectionDashboard from './SectionDashboard';
import SectionCharacter from './SectionCharacter';
import SectionFeatures from './SectionFeatures';
import SectionLanding from './SectionLanding';

const COPY = {
  en: {
    toggle: 'PT',
    connectWallet: 'Connect Wallet',
    heroTitle: 'Design System',
    heroAccent: 'version two',
    tagline: 'made by a woman, for all women',
    philosophy: 'Bioluminescence, not neon. Bloom, not glow. Breath, not glitch. Feminine power encoded in every pixel.',
    caseTitle: 'The Case',
    caseDescription: 'Nudge is a behavioral finance companion for DeFi on Solana. It reads your Kamino position, profiles your financial personality through neuroscience quizzes, assigns an RPG class with stats and inventory, and deploys Lyra \u2014 an AI guide that adapts to your behavior and position.',
    closing1: 'She entered the room where they said she didn\u2019t belong.',
    closing2: 'She didn\u2019t ask for permission \u2014',
    closing3: 'she just understood the code.',
    systemLabel: 'NUDGE DESIGN SYSTEM V2',
    copyright: '\u00A9 2026 Giuliana Lopes Galv\u00E3o',
    workWithMe: 'Work with me',
  },
  pt: {
    toggle: 'EN',
    connectWallet: 'Conectar Wallet',
    heroTitle: 'Design System',
    heroAccent: 'vers\u00E3o dois',
    tagline: 'feito por uma mulher, para todas',
    philosophy: 'Bioluminesc\u00EAncia, n\u00E3o neon. Florescer, n\u00E3o brilhar. Respiro, n\u00E3o glitch. Poder feminino codificado em cada pixel.',
    caseTitle: 'O Case',
    caseDescription: 'O Nudge \u00E9 um companheiro de finan\u00E7as comportamentais para DeFi na Solana. Ele l\u00EA sua posi\u00E7\u00E3o Kamino, tra\u00E7a seu perfil financeiro com quizzes de neuroci\u00EAncia, atribui uma classe RPG com stats e invent\u00E1rio, e envia a Lyra \u2014 uma guia IA que adapta cada recomenda\u00E7\u00E3o ao seu comportamento e posi\u00E7\u00E3o.',
    closing1: 'Ela entrou na sala onde diziam que n\u00E3o era seu lugar.',
    closing2: 'N\u00E3o pediu permiss\u00E3o \u2014',
    closing3: 'apenas entendeu o c\u00F3digo.',
    systemLabel: 'NUDGE DESIGN SYSTEM V2',
    copyright: '\u00A9 2026 Giuliana Lopes Galv\u00E3o',
    workWithMe: 'Trabalhe comigo',
  },
};

export default function DesignDemo() {
  const [lang, setLang] = useState<'en' | 'pt'>('pt');
  const c = COPY[lang];

  return (
    <div className="ds-demo relative">
      {/* Cosmic background — slow breathing drift */}
      <div
        className="fixed inset-0 bg-cover bg-center pointer-events-none z-0 n2-cosmic-bg"
        style={{ backgroundImage: "url('/bg-cosmic.png')" }}
      />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px', position: 'relative', zIndex: 10 }}>

        {/* ===== Header ===== */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 72 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <h1 className="n2-gradient-text" style={{ fontFamily: strong, fontSize: 28, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
              Nudge
            </h1>
            <span style={{ fontFamily: accent, fontSize: 17, color: 'var(--n2-accent)' }}>
              by Giuliana
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="n2-btn-ghost" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}>
              {c.toggle}
            </button>
            <button className="n2-btn-primary">{c.connectWallet}</button>
          </div>
        </header>

        {/* ===== Hero ===== */}
        <section style={{ marginBottom: 48, textAlign: 'center' as const }}>
          <div className="n2-divider" style={{ width: 64, margin: '0 auto 36px' }} />
          <h2 style={{ lineHeight: 1.1 }}>
            <span style={{ fontFamily: strong, fontSize: 52, fontWeight: 700, color: 'var(--n2-text)' }}>
              {c.heroTitle}
            </span>
            <br />
            <span className="n2-gradient-text" style={{ fontFamily: accent, fontSize: 46 }}>
              {c.heroAccent}
            </span>
          </h2>
          <p style={{ fontFamily: accent, fontSize: 20, color: 'var(--n2-accent)', marginTop: 16 }}>
            {c.tagline}
          </p>
          <p style={{ fontFamily: strong, marginTop: 20, fontSize: 17, fontWeight: 400, color: 'var(--n2-text-secondary)', maxWidth: 500, margin: '20px auto 0', lineHeight: 1.8 }}>
            {c.philosophy}
          </p>
          <div className="n2-divider" style={{ width: 64, margin: '36px auto 0' }} />
        </section>

        {/* ===== Case Description ===== */}
        <section style={{ marginBottom: 72, textAlign: 'center' as const }}>
          <p style={{ fontFamily: strong, fontSize: 14, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--n2-primary)', marginBottom: 12 }}>
            {c.caseTitle}
          </p>
          <p style={{ fontFamily: strong, fontSize: 16, fontWeight: 400, color: 'var(--n2-text-secondary)', maxWidth: 620, margin: '0 auto', lineHeight: 1.8 }}>
            {c.caseDescription}
          </p>
        </section>

        {/* ===== Sections ===== */}
        <SectionFoundation />
        <SectionDashboard />
        <SectionCharacter />
        <SectionFeatures />
        <SectionLanding />

        {/* ===== Footer ===== */}
        <footer style={{ textAlign: 'center' as const, padding: '40px 0' }}>
          <div className="n2-divider" style={{ width: 64, margin: '0 auto 28px' }} />
          <p style={{ fontFamily: strong, fontSize: 18, fontWeight: 400, color: 'var(--n2-text-muted)' }}>
            &ldquo;{c.closing1}
          </p>
          <p style={{ fontFamily: strong, fontSize: 18, fontWeight: 400, color: 'var(--n2-text-muted)' }}>
            {c.closing2}
          </p>
          <p style={{ fontFamily: accent, fontSize: 24, color: 'var(--n2-accent)', marginTop: 8 }}>
            {c.closing3}&rdquo;
          </p>
          <p style={{ fontFamily: mono, fontSize: 11, color: 'var(--n2-text-muted)', letterSpacing: '0.16em', marginTop: 28 }}>
            {c.systemLabel}
          </p>
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--n2-text-muted)' }}>
              {c.copyright}
            </span>
            <span style={{ color: 'var(--n2-text-muted)', opacity: 0.4 }}>&middot;</span>
            <a
              href="https://giulopesgalvao.com.br"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: accent, fontSize: 14, color: 'var(--n2-accent)', textDecoration: 'none' }}
            >
              {c.workWithMe}
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
