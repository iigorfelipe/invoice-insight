import { useContext } from "react";
import { AppThemeContext } from "./context"

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error(
      'useAppTheme deve ser usado em um AppThemeProvider'
    );
  };

  return context;
};