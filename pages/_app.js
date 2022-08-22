import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import AuthWrapper from '../components/AuthWrapper'
import AppLayout from '../components/Layout/AppLayout'
import { ThemeProvider } from '@material-tailwind/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider>
      <SessionProvider session={pageProps.session}>
        <AuthWrapper>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </AuthWrapper>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default MyApp
