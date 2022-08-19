import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import TestHeader from '../components/TestHeader'
import AuthWrapper from '../components/AuthWrapper'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthWrapper>
        <TestHeader />
        <Component {...pageProps} />
      </AuthWrapper>
    </SessionProvider>
  )
}

export default MyApp
