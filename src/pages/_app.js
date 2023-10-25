import ReduxProvider from '@/providers/ReduxProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ReduxProvider>
  );
}
