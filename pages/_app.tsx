import { store } from '@/redux/store';
import '@/styles/globals.css';
import '@/styles/leaflet.css';
import { PageWithLayout } from '@/types/page';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
interface AppPropsWithLayout extends AppProps {
  Component: PageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>;
}
