import React from "react";

const FallbackNFT: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    {/* Background */}
    <rect width="400" height="400" fill="#2A2A2A" />

    {/* JYD Text */}
    <text
      x="200"
      y="180"
      fontFamily="Arial"
      fontSize="60"
      fill="#444444"
      textAnchor="middle"
      fontWeight="bold"
    >
      JYD
    </text>

    {/* NFT Text */}
    <text
      x="200"
      y="240"
      fontFamily="Arial"
      fontSize="40"
      fill="#444444"
      textAnchor="middle"
    >
      NFT
    </text>

    {/* Border */}
    <rect
      x="20"
      y="20"
      width="360"
      height="360"
      stroke="#444444"
      strokeWidth="4"
      fill="none"
    />

    {/* Corner Designs */}
    <path d="M40 40 L80 40 L80 45 L45 45 L45 80 L40 80 Z" fill="#444444" />
    <path
      d="M360 40 L320 40 L320 45 L355 45 L355 80 L360 80 Z"
      fill="#444444"
    />
    <path
      d="M40 360 L80 360 L80 355 L45 355 L45 320 L40 320 Z"
      fill="#444444"
    />
    <path
      d="M360 360 L320 360 L320 355 L355 355 L355 320 L360 320 Z"
      fill="#444444"
    />
  </svg>
);

export default FallbackNFT;
