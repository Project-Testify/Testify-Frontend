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
  };

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === 'light'
            ? antdTheme.defaultAlgorithm
            : antdTheme.darkAlgorithm,
        token: {
          colorPrimary: '#6d76ed',
          colorInfo: '#6d76ed',
          colorError: '#dc3945',
          colorWarning: '#f0b84a',
        },
        components: {
          Breadcrumb: {
            linkColor: 'rgba(0,0,0,.8)',
            itemColor: 'rgba(0,0,0,.8)',
          },
          Calendar: {
            // colorBgContainer: 'none',
          },
          Card: {
            // colorBgContainer: 'none',
          },
          Carousel: {
            dotWidth: 8,
          },
          
          Segmented: {
            
            borderRadius: 6,
            colorTextLabel: '#000000',
          },
          Table: { 
            // colorBgContainer: 'none',
            headerBg: 'none',  
          },
          Timeline: {
            dotBg: 'none',
          },
        },
      }}
    >
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </ConfigProvider>
  );
};

export default ThemeContext;
