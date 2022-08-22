import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import AuthWrapper from '../components/AuthWrapper'
import AppLayout from '../components/Layout/AppLayout'
import { StyledEngineProvider } from '@mui/material'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <StyledEngineProvider injectFirst>
      <SessionProvider session={pageProps.session}>
        <AuthWrapper>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </AuthWrapper>
      </SessionProvider>
    </StyledEngineProvider>
  )
}

export default MyApp
