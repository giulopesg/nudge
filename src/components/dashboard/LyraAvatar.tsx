'use client';

import Image from 'next/image';

interface Props {
  size?: number;
  className?: string;
}

/**
 * Lyra avatar — uses LYRA.png image inside a circular clip.
 * The source image is not square, so we force a circular container.
 */
export default function LyraAvatar({ size = 56, className = '' }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-full border border-primary/40 shadow-[0_0_12px_var(--primary-glow)] hover:shadow-[0_0_24px_var(--primary-glow),0_0_48px_rgba(107,79,160,0.3)] hover:border-primary/60 transition-all duration-300 group ${className}`}
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <Image
        src="/lyra-avatar.png"
        alt="Lyra"
        fill
        sizes={`${size * 3}px`}
        quality={90}
        className="object-cover object-[50%_15%] scale-[1.15] transition-all duration-300 group-hover:scale-[1.25] group-hover:brightness-110"
      />
    </div>
  );
}
