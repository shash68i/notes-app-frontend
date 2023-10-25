import { createContext, useContext } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import themes from '../../themes';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  //   const [theme, setTheme] = useState('light');
  const theme = 'light';

  const providerValue = {
    // toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={providerValue}>
      {/* <SCThemeProvider theme={theme === 'light' ? themes.light : themes.dark}> */}
      <SCThemeProvider theme={themes.light}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
