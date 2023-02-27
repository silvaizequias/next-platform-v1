import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { Analytics } from '@vercel/analytics/react'

import { SessionProvider } from 'next-auth/react'

import NProgress from 'nprogress'

import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

import themeConfig from 'src/configs/themeConfig'

import { Toaster } from 'react-hot-toast'

import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import WindowWrapper from 'src/@core/components/window-wrapper'

import {
  SettingsConsumer,
  SettingsProvider,
} from 'src/@core/context/settingsContext'

import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

import '../../styles/globals.css'

import Spinner from 'src/@core/components/spinner'
import Script from 'next/script'

import { useEffect } from 'react'

import * as gtag from 'src/services/gtag'

type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const App = (props: ExtendedAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props

  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
    ))

  const setConfig = Component.setConfig ?? undefined

  const systemName = process.env.NEXT_PUBLIC_SYSTEM_NAME as string

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${systemName} - Sistema Dedicado`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Somos estrategistas, designers e desenvolvedores. Inovadores e solucionadores de problemas. Pequeno o suficiente para ser simples e rápido, mas grande o bastante para fornecer a estrutura e escopo que você deseja, no ritmo que você precisa`}
        />
        <meta
          name='keywords'
          content='Sistema Dedicado, Sistema Empresarial, Sistema Personalizado, SaaS'
        />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Script
        type='text/javascript'
        id='hs-script-loader'
        async
        defer
        src='//js-na1.hs-scripts.com/23603809.js'
      />
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <SessionProvider
        session={session}
        refetchInterval={14 * 24 * 60 * 60}
        refetchOnWindowFocus={false}
      >
        <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  <WindowWrapper>
                    {getLayout(
                      <Component fallback={<Spinner />} {...pageProps} />,
                    )}
                    <Analytics />
                  </WindowWrapper>
                  <ReactHotToast>
                    <Toaster
                      position={settings.toastPosition}
                      toastOptions={{ className: 'react-hot-toast' }}
                    />
                  </ReactHotToast>
                </ThemeComponent>
              )
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </SessionProvider>
    </CacheProvider>
  )
}

export default App
