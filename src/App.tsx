import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { StylesContext, GlobalStateProvider } from './context';


import routes from './routes/routes.tsx';
import { ThemeProvider } from './hooks/ThemeProvider.tsx';

import './App.css';

// color palettes: triadic #A1A7CB, #CBA1A7, #A7CBA1
// 10 color objects of primary #2378c3 as generated by https://smart-swatch.netlify.app/#2378c3
// This is for reference purposes

export const COLOR = {
  50: '#e0f1ff',
  100: '#b0d2ff',
  200: '#7fb0ff',
  300: '#4d8bff',
  400: '#1e79fe',
  500: '#076ee5',
  600: '#0062b3',
  700: '#004f81',
  800: '#003650',
  900: '#001620',
  borderColor: '#E7EAF3B2',
};



function App() {

  return (
      <ThemeProvider>
        <HelmetProvider>
          <StylesContext.Provider
            value={{
              rowProps: {
                gutter: [
                  { xs: 8, sm: 16, md: 24, lg: 32 },
                  { xs: 8, sm: 16, md: 24, lg: 32 },
                ],
              },
              carouselProps: {
                autoplay: true,
                dots: true,
                dotPosition: 'bottom',
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            }}
          >
            <GlobalStateProvider>
              <RouterProvider router={routes} />
            </GlobalStateProvider>
          </StylesContext.Provider>
        </HelmetProvider>
      </ThemeProvider>
  );
}

export default App;
