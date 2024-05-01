import AppThemeProvider from "./contexts/theme/provider";
import Header from "./components/header";
import { AppRoutes } from "./routes";

const App = () => {
  return (
    <AppThemeProvider>
      <Header />
      <AppRoutes />
    </AppThemeProvider>
  );
};

export default App;
