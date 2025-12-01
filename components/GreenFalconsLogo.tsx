import React from 'react';

const GreenFalconsLogo = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
    fill="none"
  >
    {/* Stylized Falcon Abstract Shape */}
    <path 
      d="M85 20C75 25 65 22 60 15C62 25 68 35 75 40C65 38 55 32 50 25C52 35 58 45 65 52C55 48 45 42 40 35C42 45 48 55 58 62C45 58 35 50 25 40C35 55 50 70 70 75C60 72 50 65 45 60C55 68 68 72 80 70C70 65 65 55 65 45C75 50 85 48 90 45C80 40 75 30 75 25C85 28 92 25 95 20L85 20Z" 
      fill="#4ade80" /* Green-400 */
      stroke="#22c55e" /* Green-500 */
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Wing detail */}
    <path 
      d="M25 40C20 30 25 20 35 15C30 25 32 35 40 35" 
      stroke="#4ade80" 
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default GreenFalconsLogo;
