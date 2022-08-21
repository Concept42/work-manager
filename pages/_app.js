import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import AuthWrapper from '../components/AuthWrapper'
import AppLayout from '../components/Layout/AppLayout'
import TestHeader from '../components/TestHeader'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthWrapper>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </AuthWrapper>
    </SessionProvider>
  )
}

export default MyApp
