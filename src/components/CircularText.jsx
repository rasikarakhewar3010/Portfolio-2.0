'use client';

export default function CircularText() {
  return (
    <div className="circular-text-container" data-animate="circular-text">
      <svg className="circular-text-svg" viewBox="0 0 800 800">
        <defs>
          <path
            id="circlePath"
            d="M 400, 400 m -340, 0 a 340,340 0 1,1 680,0 a 340,340 0 1,1 -680,0"
            fill="none"
          />
        </defs>
        <text className="circular-text-path">
          <textPath
            href="#circlePath"
            startOffset="25%"
            textAnchor="middle"
          >
            PORTFOLIO
          </textPath>
        </text>
      </svg>
    </div>
  );
}
