export const clientTheme = {
    colors: {
      purple: '#663090',
      pink: '#BF437E',
      teal: '#349886',
      grey: '#888A89',
      navy: '#156082',
      white: '#FFFFFF',
      black: '#333333',
      seashell: '#FAF6F1',
      gold: '#D4AF37',
      amber: '#C58520',
      green: '#69945e',
      blue: '#1f759e',
      gunmetal: '#8D918D',
      charcoal: '#36454F',
  
      // Buttons
      buttonPrimary: '#BF437E',
      buttonSecondary: '#663090',
      buttonDisabled: '#CCCCCC',
      buttonText: '#FFFFFF',
      buttonOutline: '#333333',
  
      // Backgrounds
      backgroundPrimary: '#FFFFFF',
      backgroundSecondary: '#FAF6F1',
  
      // Progress Bar Steps
      progressColors: {
        step1: '#BF437E',
        step2: '#663090',
        step3: '#349886',
        step4: '#156082',
        inactive: '#e0e0e0',
      },
    },
  
    typography: {
      fontPrimary: "'Montserrat', sans-serif",
      fontSecondary: "'Open Sans', sans-serif",
      fontUddaraHeading: "Cormorant, serif",
      headingLarge: { fontSize: '56px', fontWeight: 600, lineHeight: '100%' },
      headingMedium: { fontSize: '40px', fontWeight: 600, lineHeight: '110%' },
      headingSmall: { fontSize: '28px', fontWeight: 500, lineHeight: '110%' },
      uddaraHeading: { fontSize: '60px', fontWeight: 400, lineHeight: '60px' },
      uddaraHeadingMobile: { fontSize: '38px', fontWeight: 500, lineHeight: '38px' },
      subHeading: { fontSize: '36px', fontWeight: 400, lineHeight: '100%' },
      subHeadingSmall: { fontSize: '20px', fontWeight: 500, lineHeight: '120%' },
      headingXSmall: { fontSize: '16px', fontWeight: 500, lineHeight: '100%' },
      paragraph: { fontSize: '16px', fontWeight: 400, lineHeight: '150%' },
      bodyText: { fontSize: '16px', fontWeight: 400, lineHeight: '160%' },
      smallText: { fontSize: '14px', fontWeight: 400 },
      footerMeta: {
        fontSize: '0.875rem',
        fontWeight: 400,
        fontStyle: 'normal',
        lineHeight: '1.5',
        letterSpacing: '-0.014rem',
      },
      blogCardTitle: {
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '130%',
        color: '#156082',
      },
      toast: {
        success: '#4BB543',
        error: '#FF5F56',
        info: '#349886',
        warning: '#F0A202',
        text: '#FFFFFF',
      },
    },
  
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '16px',
    },
  
    components: {
      header: {
        logoWidthDesktop: '70px',  // 🆕
        logoHeightDesktop: '70px',  // 🆕
        logoWidthMobile: '48px',   // 🆕
        logoHeightMobile: '48px',   // 🆕  
  
        background: '#663090',
        text: '#FFFFFF',
        hoverText: '#f0e8ff',
        hoverBg: '#6a0dad',
        activeText: '#ffd700',
        underline: '#ffd700',
        iconColor: '#FFFFFF',
        height: '80px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        logoVariant: 'light', 
        position: 'sticky',

        searchTextColor: '#1A1D91', 
        searchPlaceholderColor: 'grey', 
        searchBg: 'white', 
        searchBorderColor: 'grey',  
        searchWidth: '300px',   

        showCenterline: false,
        centerlineColor: 'yellow', 
        centerlineTop: '45%',
        slots: {
          brand: {
            position: { top: '5px', left: '1.5rem' }, // ⬅️ shift logo down by 5px
            gap: '1rem'
          },
        },

      },
      navbar: {
        text: '#FFFFFF',
        hoverText: '#663090',
        hoverBg: '#FFF',
        activeText: '#ffd700',
        underline: '#ffd700',
        activeFontWeight: 700,
      },
      banner: {
        backgroundColor: 'black',
        textColor: 'white',
        height: '40px',
        fontSize: '12px',
      },  
    },
  };
  