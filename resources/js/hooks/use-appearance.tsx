import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

// Force light mode
const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = () => {
    // Always ensure dark mode is disabled
    document.documentElement.classList.remove('dark');
};

export function initializeTheme() {
    // Always apply light theme
    localStorage.setItem('appearance', 'light');
    setCookie('appearance', 'light');
    applyTheme();
}

export function useAppearance() {
    // Always set appearance to light
    const [appearance] = useState<Appearance>('light');

    const updateAppearance = useCallback(() => {
        // No-op function that always sets to light
        localStorage.setItem('appearance', 'light');
        setCookie('appearance', 'light');
        applyTheme();
    }, []);

    useEffect(() => {
        // Ensure light mode is applied on mount
        localStorage.setItem('appearance', 'light');
        setCookie('appearance', 'light');
        applyTheme();
    }, []);

    return { appearance, updateAppearance } as const;
}
