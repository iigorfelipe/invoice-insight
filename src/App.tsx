import AppThemeProvider from "./contexts/theme/provider";
import Header from "./components/header";
import { AppRoutes } from "./routes";
import SettingsProvider from "./contexts/settings/provider";

const App = () => {
  return (
    <AppThemeProvider>
      <SettingsProvider>
        <Header />
        <AppRoutes />
      </SettingsProvider>
    </AppThemeProvider>
  );
};

export default App;
