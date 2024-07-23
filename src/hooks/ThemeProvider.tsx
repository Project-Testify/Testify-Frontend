import { ConfigProvider, theme as antdTheme } from 'antd';
import { createContext, ReactNode, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    console.log('theme', theme);
  };

  return (
    <ConfigProvider theme={{ algorithm : theme === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm}}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </ConfigProvider>
  );
};

export default ThemeContext;
