'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'nord' | 'solar' | 'dracula' | 'tokyo' | 'catppuccin';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme, x?: number, y?: number) => void;
  isPickerOpen: boolean;
  togglePicker: () => void;
}>({ theme: 'dark', setTheme: () => {}, isPickerOpen: false, togglePicker: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as Theme) || 'dark';
    setThemeState(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  function setTheme(t: Theme, x?: number, y?: number) {
    const transition = document.getElementById('themeTransition');
    if (transition && x !== undefined && y !== undefined) {
      transition.style.setProperty('--tx', x + '%');
      transition.style.setProperty('--ty', y + '%');
      transition.classList.add('active');
      setTimeout(() => {
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
        setThemeState(t);
      }, 250);
      setTimeout(() => transition.classList.remove('active'), 700);
    } else {
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('theme', t);
      setThemeState(t);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isPickerOpen, togglePicker: () => setIsPickerOpen(o => !o) }}>
      <div className="theme-transition" id="themeTransition" />
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
