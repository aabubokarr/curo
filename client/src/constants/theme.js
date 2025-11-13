// Design System - Color Palette and Theme Constants
export const theme = {
  colors: {
    // Primary Colors
    primary: {
      main: '#009BA9',
      dark: '#007A85',
      light: '#00B8C7',
      hover: '#298E9E',
    },
    // Secondary Colors
    secondary: {
      main: '#EFF0F6',
      dark: '#D0D1DB',
      light: '#F5F6FA',
    },
    // Text Colors
    text: {
      primary: '#20211A',
      secondary: '#4A4A4A',
      light: '#6B6B6B',
      white: '#FFFFFF',
    },
    // Background Colors
    background: {
      default: '#EFF0F6',
      paper: '#FFFFFF',
      dark: '#0A0A0A',
      light: '#FAF9F6',
    },
    // Border Colors
    border: {
      default: '#C4C4C4',
      light: '#E0E0E0',
      dark: '#9A9A9A',
    },
    // Status Colors
    status: {
      success: '#42B127',
      error: '#FE3F32',
      warning: '#FEB50D',
      info: '#3EB3F2',
      errorDark: '#D60601',
    },
    // BMI Colors
    bmi: {
      underweight: '#3EB3F2',
      normal: '#42B127',
      overweight: '#FEB50D',
      obese: '#FE3F32',
      extremelyObese: '#D60601',
    },
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    full: '9999px',
  },
  breakpoints: {
    sm: '475px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  },
};

export default theme;

