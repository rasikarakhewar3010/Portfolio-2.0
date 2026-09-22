'use client';

export default function ArchText() {
  return (
    <div className="arch-text-container" data-animate="arch-text">
      <svg className="arch-text-svg" viewBox="0 0 500 240">
        <defs>
          <path
            id="archPath"
            d="M 50,220 A 200,200 0 0,1 450,220"
            fill="none"
          />
        </defs>
        <text className="arch-text-path">
          <textPath
            href="#archPath"
            startOffset="50%"
            textAnchor="middle"
          >
            PORTFOLIO
          </textPath>
        </text>
      </svg>
    </div>
  );
}
