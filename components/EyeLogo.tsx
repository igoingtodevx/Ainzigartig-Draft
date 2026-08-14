import React from 'react';

export interface EyeLogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  animated?: boolean;
}

export const EyeLogo: React.FC<EyeLogoProps> = ({
  width = 26,
  height = 18,
  className = '',
  'aria-hidden': ariaHidden = true,
  animated = false,
}) => {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${animated ? 'eye-logo-animated' : ''} ${className}`}
      aria-hidden={ariaHidden}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 16"
        fill="none"
        className={animated ? 'eye-logo-svg block' : 'block'}
      >
        <g className={animated ? 'eye-blink-group' : undefined} style={animated ? { transformOrigin: '12px 8px' } : undefined}>
          <ellipse
            cx="12"
            cy="8"
            rx="11"
            ry="7"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="#ECA867"
            className="eye-sclera"
          />
          <g className={animated ? 'eye-pupil-group' : undefined} style={animated ? { transformOrigin: '12px 8px' } : undefined}>
            <circle cx="12" cy="8" r="3.5" fill="#1A1918" className="eye-pupil" />
            <circle cx="10.5" cy="6.5" r="1" fill="#FFFFFF" className="eye-glint" />
          </g>
        </g>
      </svg>
    </span>
  );
};
