import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Auth } from '@supabase/ui'
import { supabaseClient } from '../lib/supabase/client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabaseClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Fsociety</title>
      </Head>
      <main className="py-14">
        <Component {...pageProps} />
      </main>
    </Auth.UserContextProvider>
  )
}

export default MyApp
