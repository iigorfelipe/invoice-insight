import { createContext } from "react";

export type Theme = 'light' | 'dark';

export type AppThemeContext = {
  theme: Theme;
  oppositeTheme: Theme;
  toggleTheme: () => void;
  isSmDown: boolean;
  isMdDown: boolean;
};

export const defaultThemeValues: AppThemeContext = {
  theme: 'dark',
  oppositeTheme: 'light',
  toggleTheme: () => {},
  isSmDown: false,
  isMdDown: false,
}

export const AppThemeContext = createContext<AppThemeContext>(defaultThemeValues);
