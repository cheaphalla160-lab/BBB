import React from 'react';

interface IllustrationProps {
  id: string;
  className?: string;
  size?: number | string;
}

export const WordIllustration: React.FC<IllustrationProps> = ({ id, className = 'w-full h-full' }) => {
  switch (id) {
    case 'short-pencil':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Background soft glow circle */}
          <circle cx="100" cy="100" r="88" fill="#FEF3C7" />
          {/* Cute Shadow */}
          <ellipse cx="100" cy="175" rx="45" ry="10" fill="#E5E7EB" />
          {/* Comparison height indicator */}
          <g opacity="0.6">
            <line x1="42" y1="95" x2="42" y2="165" stroke="#D97706" strokeWidth="2.5" strokeDasharray="4 4" />
            <path d="M38 97 L42 90 L46 97 M38 160 L42 167 L46 160" fill="none" stroke="#D97706" strokeWidth="2.5" />
            <text x="32" y="132" fill="#D97706" fontSize="11" fontWeight="bold" textAnchor="end">SHORT</text>
          </g>
          {/* Cute Short Pencil Body */}
          <rect x="75" y="90" width="50" height="52" rx="4" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          {/* Pencil Stripes */}
          <line x1="91" y1="90" x2="91" y2="142" stroke="#F59E0B" strokeWidth="3" />
          <line x1="109" y1="90" x2="109" y2="142" stroke="#F59E0B" strokeWidth="3" />
          {/* Pencil Tip (Sharpened wood + lead) */}
          <polygon points="75,142 125,142 100,172" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
          <polygon points="92,162 108,162 100,172" fill="#374151" />
          {/* Ferrule (Metal band) */}
          <rect x="75" y="78" width="50" height="12" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2.5" />
          <line x1="75" y1="84" x2="125" y2="84" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Pink Eraser with blushing look */}
          <path d="M75,78 C75,65 125,65 125,78 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="3" />
          {/* Cute Eyes & Smile */}
          <circle cx="89" cy="112" r="4.5" fill="#1F2937" />
          <circle cx="111" cy="112" r="4.5" fill="#1F2937" />
          <circle cx="87.5" cy="110" r="1.5" fill="#FFFFFF" />
          <circle cx="109.5" cy="110" r="1.5" fill="#FFFFFF" />
          {/* Rosy Cheeks */}
          <circle cx="83" cy="118" r="3.5" fill="#F87171" opacity="0.6" />
          <circle cx="117" cy="118" r="3.5" fill="#F87171" opacity="0.6" />
          {/* Happy Mouth */}
          <path d="M96 120 Q100 126 104 120" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Star sparkles */}
          <path d="M152 70 L154 75 L159 77 L154 79 L152 84 L150 79 L145 77 L150 75 Z" fill="#F59E0B" />
        </svg>
      );

    case 'long-pencil':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#FEF3C7" />
          <ellipse cx="100" cy="184" rx="35" ry="7" fill="#E5E7EB" />
          {/* Comparison ruler */}
          <g opacity="0.6">
            <line x1="42" y1="25" x2="42" y2="175" stroke="#D97706" strokeWidth="2.5" strokeDasharray="4 4" />
            <path d="M38 27 L42 20 L46 27 M38 170 L42 177 L46 170" fill="none" stroke="#D97706" strokeWidth="2.5" />
            <text x="32" y="105" fill="#D97706" fontSize="11" fontWeight="bold" textAnchor="end">LONG</text>
          </g>
          {/* Long Pencil Body */}
          <rect x="83" y="38" width="34" height="118" rx="3" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          <line x1="94" y1="38" x2="94" y2="156" stroke="#F59E0B" strokeWidth="2.5" />
          <line x1="106" y1="38" x2="106" y2="156" stroke="#F59E0B" strokeWidth="2.5" />
          {/* Sharp Tip */}
          <polygon points="83,156 117,156 100,182" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
          <polygon points="94,173 106,173 100,182" fill="#374151" />
          {/* Ferrule */}
          <rect x="83" y="27" width="34" height="11" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2.5" />
          {/* Eraser */}
          <path d="M83,27 C83,15 117,15 117,27 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="3" />
          {/* Cute Face in center of pencil */}
          <circle cx="93" cy="95" r="3.5" fill="#1F2937" />
          <circle cx="107" cy="95" r="3.5" fill="#1F2937" />
          <circle cx="91.5" cy="93.5" r="1.2" fill="#FFFFFF" />
          <circle cx="105.5" cy="93.5" r="1.2" fill="#FFFFFF" />
          <circle cx="89" cy="100" r="2.8" fill="#F87171" opacity="0.6" />
          <circle cx="111" cy="100" r="2.8" fill="#F87171" opacity="0.6" />
          <path d="M97 102 Q100 106 103 102" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Upward sparkles */}
          <path d="M140 35 L142 40 L147 42 L142 44 L140 49 L138 44 L133 42 L138 40 Z" fill="#F59E0B" />
        </svg>
      );

    case 'short-tree':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#ECFDF5" />
          <ellipse cx="100" cy="172" rx="55" ry="9" fill="#D1FAE5" />
          {/* Cute Short Tree Trunk */}
          <rect x="91" y="125" width="18" height="42" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="2.5" />
          {/* Cute Foliage - Compact rounded dome */}
          <circle cx="100" cy="105" r="42" fill="#10B981" stroke="#047857" strokeWidth="3.5" />
          <circle cx="78" cy="115" r="26" fill="#34D399" />
          <circle cx="122" cy="115" r="26" fill="#059669" />
          <circle cx="100" cy="85" r="28" fill="#6EE7B7" opacity="0.9" />
          {/* Cute Face on foliage */}
          <circle cx="90" cy="104" r="4.5" fill="#064E3B" />
          <circle cx="110" cy="104" r="4.5" fill="#064E3B" />
          <circle cx="88" cy="102" r="1.5" fill="#FFFFFF" />
          <circle cx="108" cy="102" r="1.5" fill="#FFFFFF" />
          <circle cx="82" cy="112" r="4" fill="#F43F5E" opacity="0.4" />
          <circle cx="118" cy="112" r="4" fill="#F43F5E" opacity="0.4" />
          <path d="M96 113 Q100 118 104 113" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Apples on tree */}
          <circle cx="68" cy="102" r="5" fill="#EF4444" />
          <circle cx="132" cy="100" r="5" fill="#EF4444" />
          {/* Height marker */}
          <text x="35" y="145" fill="#059669" fontSize="12" fontWeight="bold">SHORT</text>
        </svg>
      );

    case 'long-tree':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#ECFDF5" />
          <ellipse cx="100" cy="178" rx="60" ry="10" fill="#D1FAE5" />
          {/* Soft clouds at top to emphasize height */}
          <path d="M30 40 C30 32 40 28 48 32 C54 26 66 26 72 32 C78 28 88 32 88 40 Z" fill="#FFFFFF" opacity="0.9" />
          <path d="M125 55 C125 48 133 44 140 47 C145 42 155 42 160 47 C165 44 173 47 173 55 Z" fill="#FFFFFF" opacity="0.9" />
          {/* Tall Trunk reaching high */}
          <rect x="90" y="55" width="20" height="120" rx="5" fill="#92400E" stroke="#78350F" strokeWidth="3" />
          {/* Tree branches */}
          <path d="M90 100 Q75 90 68 95" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M110 85 Q125 75 132 80" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Foliage clustered at high altitude */}
          <circle cx="100" cy="45" r="32" fill="#10B981" stroke="#047857" strokeWidth="3" />
          <circle cx="70" cy="90" r="18" fill="#34D399" />
          <circle cx="130" cy="75" r="20" fill="#059669" />
          <circle cx="95" cy="35" r="22" fill="#6EE7B7" opacity="0.8" />
          {/* Cute Face on tall trunk */}
          <circle cx="96" cy="120" r="3.5" fill="#FFFFFF" />
          <circle cx="104" cy="120" r="3.5" fill="#FFFFFF" />
          <circle cx="96" cy="120" r="2" fill="#451A03" />
          <circle cx="104" cy="120" r="2" fill="#451A03" />
          <path d="M97 127 Q100 131 103 127" stroke="#451A03" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Height marker */}
          <text x="35" y="115" fill="#059669" fontSize="12" fontWeight="bold">TALL/LONG</text>
        </svg>
      );

    case 'thick-book':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#EEF2FF" />
          <ellipse cx="100" cy="165" rx="55" ry="9" fill="#E0E7FF" />
          {/* Thick Book Stack / Giant Encyclopedia */}
          {/* Cover bottom */}
          <rect x="48" y="138" width="104" height="14" rx="4" fill="#4338CA" stroke="#312E81" strokeWidth="2.5" />
          {/* Thick Pages (multi-layered accordion) */}
          <rect x="52" y="74" width="96" height="66" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
          <line x1="56" y1="84" x2="144" y2="84" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="56" y1="94" x2="144" y2="94" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="56" y1="104" x2="144" y2="104" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="56" y1="114" x2="144" y2="114" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="56" y1="124" x2="144" y2="124" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="56" y1="134" x2="144" y2="134" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Top Cover */}
          <path d="M46 72 L154 72 L146 58 L38 58 Z" fill="#6366F1" stroke="#4338CA" strokeWidth="2.5" />
          {/* Spine with gold star */}
          <rect x="46" y="60" width="14" height="88" rx="3" fill="#4F46E5" stroke="#3730A3" strokeWidth="2.5" />
          <polygon points="53,88 55,92 59,93 56,96 57,100 53,98 49,100 50,96 47,93 51,92" fill="#FCD34D" />
          {/* Hanging Ribbon Bookmark */}
          <path d="M120 72 L120 120 L126 114 L132 120 L132 72 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" />
          {/* Label Indicator */}
          <text x="100" y="112" fill="#4338CA" fontSize="13" fontWeight="bold" textAnchor="middle">THICK BOOK</text>
        </svg>
      );

    case 'thin-book':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#EEF2FF" />
          <ellipse cx="100" cy="165" rx="50" ry="8" fill="#E0E7FF" />
          {/* Thin booklet / single light notebook */}
          <rect x="52" y="130" width="96" height="8" rx="2" fill="#4338CA" stroke="#312E81" strokeWidth="2" />
          {/* Thin pages layer - just 1-2 thin lines */}
          <rect x="54" y="118" width="92" height="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="56" y1="124" x2="142" y2="124" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Light Cover with cute cartoon star */}
          <path d="M50 118 L150 118 L142 98 L42 98 Z" fill="#818CF8" stroke="#4F46E5" strokeWidth="2" />
          <circle cx="95" cy="108" r="4" fill="#FDE047" />
          {/* Thin arrow label */}
          <g opacity="0.7">
            <line x1="162" y1="112" x2="162" y2="136" stroke="#4338CA" strokeWidth="2" />
            <path d="M159 114 L162 109 L165 114 M159 134 L162 139 L165 134" fill="none" stroke="#4338CA" strokeWidth="2" />
            <text x="170" y="128" fill="#4338CA" fontSize="10" fontWeight="bold">THIN</text>
          </g>
          <text x="96" y="152" fill="#4338CA" fontSize="12" fontWeight="bold" textAnchor="middle">THIN BOOK</text>
        </svg>
      );

    case 'fat-people':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#FFE4E6" />
          <ellipse cx="100" cy="178" rx="55" ry="9" fill="#FECDD3" />
          {/* Cute Round Plump Body (Fat) */}
          <ellipse cx="100" cy="132" rx="46" ry="38" fill="#FB7185" stroke="#E11D48" strokeWidth="3" />
          {/* Cheerful stripes on sweater */}
          <path d="M57 122 Q100 135 143 122" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M60 140 Q100 152 140 140" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Cute chubby legs */}
          <rect x="80" y="162" width="14" height="16" rx="6" fill="#1E293B" />
          <rect x="106" y="162" width="14" height="16" rx="6" fill="#1E293B" />
          {/* Chubby Head */}
          <circle cx="100" cy="68" r="28" fill="#FED7AA" stroke="#F97316" strokeWidth="2.5" />
          {/* Cute Hair */}
          <path d="M74 62 C74 42 126 42 126 62 C120 54 105 52 100 55 C95 52 80 54 74 62 Z" fill="#78350F" />
          {/* Chubby Rosy Cheeks */}
          <circle cx="82" cy="74" r="5.5" fill="#FB7185" opacity="0.6" />
          <circle cx="118" cy="74" r="5.5" fill="#FB7185" opacity="0.6" />
          {/* Happy Eyes & Big Smile */}
          <path d="M86 66 Q90 62 94 66" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M106 66 Q110 62 114 66" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M93 75 Q100 84 107 75" fill="#BE123C" stroke="#1F2937" strokeWidth="2" />
          {/* Waving chubby hand */}
          <circle cx="150" cy="115" r="10" fill="#FED7AA" stroke="#F97316" strokeWidth="2" />
          <text x="100" y="193" fill="#BE123C" fontSize="11" fontWeight="bold" textAnchor="middle">FAT / PLUMP</text>
        </svg>
      );

    case 'thin-people':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#FFE4E6" />
          <ellipse cx="100" cy="180" rx="40" ry="7" fill="#FECDD3" />
          {/* Slender Thin Body */}
          <rect x="88" y="95" width="24" height="60" rx="10" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
          {/* Slender Legs */}
          <rect x="90" y="152" width="7" height="28" rx="3.5" fill="#1E293B" />
          <rect x="103" y="152" width="7" height="28" rx="3.5" fill="#1E293B" />
          {/* Slender Head */}
          <ellipse cx="100" cy="62" rx="20" ry="24" fill="#FED7AA" stroke="#F97316" strokeWidth="2.5" />
          {/* Hair */}
          <path d="M80 56 C80 38 120 38 120 56 C115 50 104 48 100 50 C96 48 85 50 80 56 Z" fill="#92400E" />
          {/* Cheerful Eyes & Smile */}
          <circle cx="93" cy="62" r="3" fill="#1F2937" />
          <circle cx="107" cy="62" r="3" fill="#1F2937" />
          <circle cx="89" cy="67" r="3" fill="#FB7185" opacity="0.5" />
          <circle cx="111" cy="67" r="3" fill="#FB7185" opacity="0.5" />
          <path d="M96 69 Q100 74 104 69" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Waving slender arms */}
          <path d="M88 105 Q70 95 65 82" stroke="#FED7AA" strokeWidth="6" strokeLinecap="round" />
          <circle cx="65" cy="80" r="6" fill="#FED7AA" stroke="#F97316" strokeWidth="1.5" />
          <text x="100" y="193" fill="#BE123C" fontSize="11" fontWeight="bold" textAnchor="middle">THIN / SLENDER</text>
        </svg>
      );

    case 'blonde-hair':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#FEF9C3" />
          {/* Background Blonde volume */}
          <path d="M60 90 C50 140 70 160 85 160 C90 160 90 145 90 135 C110 145 110 160 115 160 C130 160 150 140 140 90 Z" fill="#FACC15" />
          {/* Face */}
          <circle cx="100" cy="95" r="36" fill="#FED7AA" stroke="#F59E0B" strokeWidth="2" />
          {/* Sparkling Big Golden Blonde Hair Front */}
          <path d="M60 85 C55 45 145 45 140 85 C130 65 115 65 100 70 C85 65 70 65 60 85 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          <path d="M72 65 C85 58 100 58 115 64" stroke="#FEF08A" strokeWidth="3.5" strokeLinecap="round" />
          {/* Blue Eyes for blonde doll */}
          <ellipse cx="88" cy="95" rx="5" ry="6" fill="#0284C7" />
          <ellipse cx="112" cy="95" rx="5" ry="6" fill="#0284C7" />
          <circle cx="86" cy="93" r="2" fill="#FFFFFF" />
          <circle cx="110" cy="93" r="2" fill="#FFFFFF" />
          {/* Cheeks */}
          <circle cx="80" cy="105" r="5" fill="#FB7185" opacity="0.6" />
          <circle cx="120" cy="105" r="5" fill="#FB7185" opacity="0.6" />
          {/* Smile */}
          <path d="M94 107 Q100 113 106 107" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Sun Sparkle */}
          <path d="M152 48 L154 53 L159 55 L154 57 L152 62 L150 57 L145 55 L150 53 Z" fill="#EAB308" />
          <text x="100" y="180" fill="#CA8A04" fontSize="12" fontWeight="bold" textAnchor="middle">BLONDE HAIR</text>
        </svg>
      );

    case 'dark-hair':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#F5F5F4" />
          {/* Background Dark hair volume */}
          <path d="M60 90 C50 140 70 160 85 160 C90 160 90 145 90 135 C110 145 110 160 115 160 C130 160 150 140 140 90 Z" fill="#1C1917" />
          {/* Face */}
          <circle cx="100" cy="95" r="36" fill="#FED7AA" stroke="#78716C" strokeWidth="2" />
          {/* Glossy Black Hair */}
          <path d="M60 85 C55 45 145 45 140 85 C130 65 115 65 100 70 C85 65 70 65 60 85 Z" fill="#18181B" stroke="#09090B" strokeWidth="3" />
          {/* Glossy highlights on dark hair */}
          <path d="M75 62 C85 55 95 55 105 58" stroke="#71717A" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          {/* Warm Dark Eyes */}
          <circle cx="88" cy="95" r="5" fill="#292524" />
          <circle cx="112" cy="95" r="5" fill="#292524" />
          <circle cx="86" cy="93" r="1.8" fill="#FFFFFF" />
          <circle cx="110" cy="93" r="1.8" fill="#FFFFFF" />
          {/* Cheeks & Smile */}
          <circle cx="80" cy="105" r="5" fill="#FB7185" opacity="0.5" />
          <circle cx="120" cy="105" r="5" fill="#FB7185" opacity="0.5" />
          <path d="M94 107 Q100 113 106 107" stroke="#78716C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <text x="100" y="180" fill="#292524" fontSize="12" fontWeight="bold" textAnchor="middle">DARK HAIR</text>
        </svg>
      );

    case 'straight-hair':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#E0F2FE" />
          {/* Long Straight Silky Hair Curtain */}
          <path d="M62 70 L62 165 C62 168 76 168 76 165 L76 115 L124 115 L124 165 C124 168 138 168 138 165 L138 70 Z" fill="#854D0E" stroke="#713F12" strokeWidth="2.5" />
          {/* Straight hair strands guidelines */}
          <line x1="68" y1="85" x2="68" y2="155" stroke="#A16207" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="132" y1="85" x2="132" y2="155" stroke="#A16207" strokeWidth="2" strokeDasharray="6 4" />
          {/* Face */}
          <circle cx="100" cy="95" r="34" fill="#FED7AA" stroke="#CA8A04" strokeWidth="2" />
          {/* Straight Bangs */}
          <path d="M66 82 L134 82 L134 68 C134 50 66 50 66 68 Z" fill="#854D0E" stroke="#713F12" strokeWidth="2.5" />
          <line x1="66" y1="82" x2="134" y2="82" stroke="#713F12" strokeWidth="2.5" />
          {/* Cute Straight Hairpin / Clip */}
          <rect x="116" y="70" width="16" height="5" rx="2.5" fill="#EC4899" />
          {/* Eyes & Smile */}
          <circle cx="89" cy="96" r="4.5" fill="#1E293B" />
          <circle cx="111" cy="96" r="4.5" fill="#1E293B" />
          <circle cx="87.5" cy="94.5" r="1.5" fill="#FFFFFF" />
          <circle cx="109.5" cy="94.5" r="1.5" fill="#FFFFFF" />
          <circle cx="82" cy="104" r="4" fill="#F43F5E" opacity="0.5" />
          <circle cx="118" cy="104" r="4" fill="#F43F5E" opacity="0.5" />
          <path d="M95 106 Q100 111 105 106" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <text x="100" y="186" fill="#0284C7" fontSize="12" fontWeight="bold" textAnchor="middle">STRAIGHT HAIR</text>
        </svg>
      );

    case 'curly-hair':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#FFF7ED" />
          {/* Fluffy Curly Hair Cloud around head */}
          <g fill="#EA580C" stroke="#C2410C" strokeWidth="2">
            <circle cx="65" cy="80" r="20" />
            <circle cx="56" cy="105" r="18" />
            <circle cx="62" cy="130" r="18" />
            <circle cx="135" cy="80" r="20" />
            <circle cx="144" cy="105" r="18" />
            <circle cx="138" cy="130" r="18" />
            <circle cx="80" cy="55" r="20" />
            <circle cx="100" cy="50" r="22" />
            <circle cx="120" cy="55" r="20" />
          </g>
          {/* Face */}
          <circle cx="100" cy="100" r="34" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          {/* Bouncy Curls inside */}
          <path d="M72 85 C80 75 90 90 98 80 C106 90 118 75 128 85" fill="none" stroke="#C2410C" strokeWidth="4" strokeLinecap="round" />
          {/* Spiral Curl indicators */}
          <path d="M64 105 C60 100 66 95 68 98 C70 101 64 106 60 104" stroke="#FDBA74" strokeWidth="2" fill="none" />
          <path d="M136 105 C140 100 134 95 132 98 C130 101 136 106 140 104" stroke="#FDBA74" strokeWidth="2" fill="none" />
          {/* Eyes & Big Cheerful Grin */}
          <circle cx="89" cy="100" r="4.5" fill="#1E293B" />
          <circle cx="111" cy="100" r="4.5" fill="#1E293B" />
          <circle cx="87" cy="98" r="1.5" fill="#FFFFFF" />
          <circle cx="109" cy="98" r="1.5" fill="#FFFFFF" />
          <circle cx="82" cy="108" r="4" fill="#FB7185" opacity="0.6" />
          <circle cx="118" cy="108" r="4" fill="#FB7185" opacity="0.6" />
          <path d="M94 110 Q100 118 106 110" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <text x="100" y="186" fill="#EA580C" fontSize="12" fontWeight="bold" textAnchor="middle">CURLY HAIR</text>
        </svg>
      );

    case 'ugly':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#FAF5FF" />
          <ellipse cx="100" cy="175" rx="50" ry="9" fill="#F3E8FF" />
          {/* Cute, Goofy, Silly Monster (Kid-friendly Ugly) */}
          {/* Mismatched Horns */}
          <polygon points="65,60 55,30 80,48" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5" />
          <path d="M125 50 Q145 35 140 25 Q130 35 120 52" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
          {/* Wobbly Silly Monster Body */}
          <path d="M60 120 C50 75 75 60 100 60 C125 60 150 75 140 120 C145 150 130 165 100 165 C70 165 55 150 60 120 Z" fill="#C084FC" stroke="#7E22CE" strokeWidth="3" />
          {/* Goofy Spots */}
          <circle cx="75" cy="100" r="7" fill="#A855F7" />
          <circle cx="125" cy="130" r="9" fill="#A855F7" />
          <circle cx="80" cy="142" r="5" fill="#A855F7" />
          {/* Giant Single Goofy Eye in Center! */}
          <circle cx="100" cy="95" r="18" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          <circle cx="102" cy="96" r="9" fill="#3B82F6" />
          <circle cx="104" cy="94" r="3.5" fill="#FFFFFF" />
          {/* Wonky Eyebrow */}
          <path d="M85 75 Q100 68 118 78" stroke="#581C87" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Goofy Wobbly Mouth with ONE cute snaggletooth! */}
          <path d="M78 128 Q100 145 122 125" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <polygon points="88,131 94,131 91,142" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
          {/* Little green antenna */}
          <line x1="100" y1="60" x2="100" y2="40" stroke="#7E22CE" strokeWidth="2.5" />
          <circle cx="100" cy="38" r="6" fill="#F43F5E" />
          <text x="100" y="190" fill="#7E22CE" fontSize="12" fontWeight="bold" textAnchor="middle">UGLY (FUNNY MONSTER)</text>
        </svg>
      );

    case 'moustache':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#F0FDFA" />
          <ellipse cx="100" cy="175" rx="45" ry="8" fill="#CCFBF1" />
          {/* Gentleman Face */}
          <circle cx="100" cy="90" r="45" fill="#FED7AA" stroke="#F97316" strokeWidth="2.5" />
          {/* Dapper Bowler Hat */}
          <path d="M58 60 L142 60 L142 55 C142 55 135 25 100 25 C65 25 58 55 58 55 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <ellipse cx="100" cy="60" rx="48" ry="6" fill="#334155" />
          <rect x="70" y="52" width="60" height="5" fill="#EF4444" />
          {/* Friendly Eyes */}
          <circle cx="85" cy="85" r="4" fill="#1E293B" />
          <circle cx="115" cy="85" r="4" fill="#1E293B" />
          {/* Nose */}
          <ellipse cx="100" cy="95" rx="6" ry="5" fill="#FDBA74" />
          {/* THE PROMINENT MOUSTACHE (Twirled Handlebars!) */}
          <g filter="drop-shadow(0px 3px 2px rgba(0,0,0,0.15))">
            <path
              d="M100 108 C88 98 72 100 62 104 C52 108 50 118 56 122 C62 126 72 120 84 116 C92 113 97 112 100 114 C103 112 108 113 116 116 C128 120 138 126 144 122 C150 118 148 108 138 104 C128 100 112 98 100 108 Z"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="2"
            />
          </g>
          {/* Smiling lip under moustache */}
          <path d="M92 126 Q100 131 108 126" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Pointer label */}
          <text x="100" y="165" fill="#0D9488" fontSize="13" fontWeight="bold" textAnchor="middle">MOUSTACHE (LIP)</text>
        </svg>
      );

    case 'beard':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="88" fill="#ECFEFF" />
          <ellipse cx="100" cy="180" rx="48" ry="8" fill="#CFFAFE" />
          {/* Sailor / Explorer Cap */}
          <path d="M62 60 C62 38 138 38 138 60 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2.5" />
          <rect x="56" y="58" width="88" height="7" rx="3.5" fill="#0369A1" />
          {/* Face */}
          <circle cx="100" cy="85" r="38" fill="#FED7AA" stroke="#F97316" strokeWidth="2" />
          {/* Kind Crinkly Eyes */}
          <path d="M84 80 Q89 76 94 80" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M106 80 Q111 76 116 80" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Round Nose */}
          <circle cx="100" cy="90" r="6" fill="#FDBA74" />
          {/* THE BIG LUXURIOUS FLUFFY BEARD (covers jawline & chin) */}
          <g filter="drop-shadow(0px 4px 3px rgba(0,0,0,0.12))">
            <path
              d="M65 92 C60 115 62 145 80 162 C90 172 110 172 120 162 C138 145 140 115 135 92 C125 102 115 98 100 98 C85 98 75 102 65 92 Z"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="2.5"
            />
            {/* Beard fluff texture lines */}
            <path d="M85 125 Q100 135 115 125" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M90 145 Q100 152 110 145" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
          {/* Mouth inside beard */}
          <ellipse cx="100" cy="112" rx="6" ry="4" fill="#991B1B" />
          <text x="100" y="190" fill="#0891B2" fontSize="13" fontWeight="bold" textAnchor="middle">BEARD (CHIN)</text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="100" cy="100" r="80" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
          <text x="100" y="105" fill="#6B7280" fontSize="16" textAnchor="middle">Image</text>
        </svg>
      );
  }
};
