import { createContext } from "react";

export type Theme = 'light' | 'dark';

export type AppThemeContext = {
  theme: Theme;
  oppositeTheme: Theme;
  toggleTheme: () => void;
};

export const defaultThemeValues: AppThemeContext = {
  theme: 'dark',
  oppositeTheme: 'light',
  toggleTheme: () => {},
}

export const AppThemeContext = createContext<AppThemeContext>(defaultThemeValues);
