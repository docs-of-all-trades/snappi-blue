import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import { Layout } from '@/components/Layout';
import * as mdxComponents from '@/components/mdx';
import { useMobileNavigationStore } from '@/components/MobileNavigation';
import '@/styles/tailwind.css';
import 'focus-visible';
import CookieConsentPopup from '../components/CookieConsent'; // Import Cookie Consent component

//import { CustomMDXProvider } from '../components/MDXProvider';

function onRouteChange() {
  useMobileNavigationStore.getState().close();
}

Router.events.on('routeChangeStart', onRouteChange);
Router.events.on('hashChangeStart', onRouteChange);

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {router.pathname === '/' ? (
          <title>Snappi Docs</title>
        ) : (
          <title>{`${pageProps.title} - Snappi Docs`}</title>
        )}
        <meta name="description" content={pageProps.description} />
      </Head>
      <MDXProvider components={mdxComponents}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
      <CookieConsentPopup /> {/* Add CookieConsentPopup here */}
    </>
  );
}