export const darkTheme = {
    colors: {
        // Primary colors
        primary: '#6366f1',
        primaryHover: '#4f46e5',
        primaryLight: '#818cf8',
        primaryDark: '#4338ca',

        // Secondary colors
        secondary: '#8b5cf6',
        secondaryHover: '#7c3aed',
        secondaryLight: '#a78bfa',
        secondaryDark: '#6d28d9',

        // Background colors
        background: '#0f0f23',
        surface: '#1a1b2f',
        surfaceLight: '#25273d',
        surfaceDark: '#0d0e1e',
        surfaceHover: '#2d3748',

        // Text colors
        text: '#ffffff',
        textSecondary: '#94a3b8',
        textMuted: '#64748b',
        textInverted: '#0f0f23',

        // Status colors
        success: '#10b981',
        successLight: '#34d399',
        successDark: '#059669',

        warning: '#f59e0b',
        warningLight: '#fbbf24',
        warningDark: '#d97706',

        error: '#ef4444',
        errorLight: '#f87171',
        errorDark: '#dc2626',

        info: '#3b82f6',
        infoLight: '#60a5fa',
        infoDark: '#2563eb',

        // Border colors
        border: '#2d3748',
        borderLight: '#374151',
        borderDark: '#1f2937',

        // Gradient colors
        gradientPrimary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        gradientSuccess: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        gradientWarning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        gradientError: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',

        // Shadow colors
        shadowLight: 'rgba(0, 0, 0, 0.1)',
        shadowMedium: 'rgba(0, 0, 0, 0.2)',
        shadowDark: 'rgba(0, 0, 0, 0.3)'
    },

    shadows: {
        sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        md: '0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -1px rgba(0,0,0,0.2)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.3), 0 4px 6px -2px rgba(0,0,0,0.2)',
        xl: '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
        inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)'
    },

    borderRadius: {
        none: '0',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        full: '9999px'
    },

    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px'
    },

    typography: {
        fontFamily: {
            sans: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
        },
        fontSize: {
            xs: '12px',
            sm: '14px',
            base: '16px',
            lg: '18px',
            xl: '20px',
            '2xl': '24px',
            '3xl': '30px',
            '4xl': '36px'
        },
        fontWeight: {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800'
        },
        lineHeight: {
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2'
        }
    },

    breakpoints: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    },

    zIndex: {
        hide: -1,
        auto: 'auto',
        base: 0,
        docked: 10,
        dropdown: 1000,
        sticky: 1100,
        banner: 1200,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        skipLink: 1600,
        toast: 1700,
        tooltip: 1800
    },

    transitions: {
        duration: {
            fast: '150ms',
            normal: '300ms',
            slow: '500ms'
        },
        timing: {
            ease: 'ease',
            'ease-in': 'ease-in',
            'ease-out': 'ease-out',
            'ease-in-out': 'ease-in-out'
        }
    }
};

// Light theme for future implementation
export const lightTheme = {
    ...darkTheme,
    colors: {
        ...darkTheme.colors,
        background: '#ffffff',
        surface: '#f8fafc',
        surfaceLight: '#ffffff',
        surfaceDark: '#f1f5f9',
        text: '#0f172a',
        textSecondary: '#475569',
        textMuted: '#64748b',
        border: '#e2e8f0',
        borderLight: '#cbd5e1'
    }
};