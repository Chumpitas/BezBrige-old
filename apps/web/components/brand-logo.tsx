/**
 * Logo „Rakija Srbije" u beloj (negativ) verziji za tamnu podlogu.
 * Trenutno vektorska rekreacija; kad stigne originalni vektor, zameniti
 * sadržaj ovog SVG-a (ili učitati /logo/rakija-srbije-belo.svg).
 */
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 250 66"
      className={className}
      fill="none"
      role="img"
      aria-label="Rakija Srbije"
    >
      <g stroke="#ffffff" strokeWidth={3} strokeLinecap="round" fill="none">
        <path d="M33 11 C20 11 11 21 11 34 C11 47 21 56 33 56 C45 56 55 47 55 34 C55 24 49 16 40 13" />
        <path d="M33 13 C29 22 29 30 33 36" strokeWidth={2} />
      </g>
      <path d="M34 12 C40 3 50 4 54 9 C48 15 39 15 34 12 Z" fill="#ffffff" />
      <path d="M33 25 C27 34 29 45 33 45 C37 45 39 34 33 25 Z" fill="#ffffff" />
      <text
        x="70"
        y="31"
        fontFamily="'Alegreya SC','Alegreya',Georgia,serif"
        fontSize="23"
        fontWeight="700"
        fill="#ffffff"
        letterSpacing="1.5"
      >
        РАКИЈА
      </text>
      <text
        x="70"
        y="55"
        fontFamily="'Alegreya SC','Alegreya',Georgia,serif"
        fontSize="23"
        fontWeight="700"
        fill="#ffffff"
        letterSpacing="1.5"
      >
        СРБИЈЕ
      </text>
    </svg>
  );
}
