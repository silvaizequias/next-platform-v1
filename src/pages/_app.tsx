import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { Analytics } from '@vercel/analytics/react'

import NProgress from 'nprogress'

import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

import themeConfig from 'src/configs/themeConfig'

import { Toaster } from 'react-hot-toast'

import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import WindowWrapper from 'src/@core/components/window-wrapper'

import { AuthProvider } from 'src/context/AuthContext'
import {
  SettingsConsumer,
  SettingsProvider
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
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
    ))

  const setConfig = Component.setConfig ?? undefined

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Soluções Criativas Para Enriquecer Seu Negócio`}</title>
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

      <AuthProvider>
        <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  <WindowWrapper>
                    {getLayout(
                      <Component fallback={<Spinner />} {...pageProps} />
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
      </AuthProvider>
    </CacheProvider>
  )
}

export default App
