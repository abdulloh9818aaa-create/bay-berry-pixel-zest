/** Original geometric Staunton-inspired silhouettes. viewBox 0 0 40 90, origin at base center. */
export const PIECES = {
  king: `
    <g fill="currentColor">
      <rect x="18.2" y="1.5" width="3.6" height="13" rx="1.1"/>
      <rect x="13.2" y="5.6" width="13.6" height="3.5" rx="1.1"/>
      <circle cx="20" cy="19.2" r="4.6"/>
      <path d="M11.2 28.5 L15.2 23.8 L20 27.6 L24.8 23.8 L28.8 28.5
               C29.4 31.8 27.2 34.2 20 34.2 C12.8 34.2 10.6 31.8 11.2 28.5Z"/>
      <rect x="16.4" y="33.6" width="7.2" height="7.2" rx="1"/>
      <ellipse cx="20" cy="42.2" rx="9.6" ry="2.6"/>
      <path d="M13.4 43.4 L26.6 43.4 L30.4 71.2 L9.6 71.2Z"/>
      <rect x="8.2" y="70.4" width="23.6" height="3.6" rx="1"/>
      <rect x="5.4" y="74.2" width="29.2" height="5.6" rx="1.6"/>
      <rect x="4.2" y="80" width="31.6" height="5.2" rx="1.4"/>
    </g>`,
  queen: `
    <g fill="currentColor">
      <circle cx="20" cy="8.2" r="2.4"/>
      <path d="M8.8 32 L11.2 14.5 L16.2 26 L20 11.2 L23.8 26 L28.8 14.5 L31.2 32Z"/>
      <circle cx="11.2" cy="13.2" r="1.7"/>
      <circle cx="20" cy="10" r="1.7"/>
      <circle cx="28.8" cy="13.2" r="1.7"/>
      <ellipse cx="20" cy="33.4" rx="11.2" ry="2.8"/>
      <path d="M12.6 35 L27.4 35 L30.2 70.6 L9.8 70.6Z"/>
      <rect x="8.2" y="70" width="23.6" height="3.6" rx="1"/>
      <rect x="5.4" y="73.8" width="29.2" height="5.6" rx="1.6"/>
      <rect x="4.2" y="79.6" width="31.6" height="5.4" rx="1.4"/>
    </g>`,
  rook: `
    <g fill="currentColor">
      <path d="M9 8 H15 V14 H17 V8 H23 V14 H25 V8 H31 V22 H9 Z"/>
      <rect x="11.2" y="21.4" width="17.6" height="6.2" rx="0.6"/>
      <path d="M13.2 27.6 H26.8 L29.4 70.4 H10.6 Z"/>
      <rect x="8.4" y="69.8" width="23.2" height="3.8" rx="1"/>
      <rect x="5.6" y="73.8" width="28.8" height="5.6" rx="1.6"/>
      <rect x="4.4" y="79.6" width="31.2" height="5.4" rx="1.4"/>
    </g>`,
  bishop: `
    <g fill="currentColor">
      <circle cx="20" cy="6.4" r="2.1"/>
      <path d="M20 10.2 C14.2 16.8 11.4 24.2 11.4 31.4
               C11.4 37.6 15.2 41.2 20 41.2
               C24.8 41.2 28.6 37.6 28.6 31.4
               C28.6 24.2 25.8 16.8 20 10.2Z"/>
      <path d="M18.4 16.2 L22.4 22.8 L20.8 24 L16.8 17.4Z" fill="#0c0b0a" opacity="0.35"/>
      <ellipse cx="20" cy="42.2" rx="8.8" ry="2.4"/>
      <path d="M14.2 43.6 H25.8 L29.2 70.6 H10.8 Z"/>
      <rect x="8.4" y="70" width="23.2" height="3.6" rx="1"/>
      <rect x="5.6" y="73.8" width="28.8" height="5.6" rx="1.6"/>
      <rect x="4.4" y="79.6" width="31.2" height="5.4" rx="1.4"/>
    </g>`,
  knight: `
    <g fill="currentColor">
      <path d="M8.6 82.2 H31.2 V76.4 H27.4
               C27.8 64.5 29.6 54.2 27.2 44.8
               C32.4 41.2 35.2 34.6 33.6 27.4
               C32.4 21.6 27.8 17.2 24.2 12.4
               C22.4 9.8 22.8 6.2 25.2 4.4
               C22.2 3.6 18.4 5.8 17.2 9.6
               C15.4 8.2 12.6 8.8 11.4 11.4
               C9.2 16.2 11.8 21.6 14.8 25.2
               C10.2 29.8 7.4 36.4 8.2 44.2
               C9.2 54.8 10.4 66.2 10.8 76.4 H8.6Z"/>
      <circle cx="22.4" cy="20.6" r="1.35" fill="#0c0b0a" opacity="0.45"/>
      <rect x="5.4" y="80.4" width="29.4" height="5.2" rx="1.4"/>
    </g>`,
  pawn: `
    <g fill="currentColor">
      <circle cx="20" cy="18.4" r="8.2"/>
      <ellipse cx="20" cy="28.8" rx="9.4" ry="2.6"/>
      <path d="M14.6 30.4 H25.4 L28.6 64.8 H11.4 Z"/>
      <rect x="9.2" y="64.2" width="21.6" height="3.4" rx="0.9"/>
      <rect x="6.6" y="67.8" width="26.8" height="5.2" rx="1.5"/>
      <rect x="5.4" y="73.2" width="29.2" height="5.2" rx="1.4"/>
    </g>`,
};
