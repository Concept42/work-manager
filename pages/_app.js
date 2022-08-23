import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import AuthWrapper from '../components/AuthWrapper'
import AppLayout from '../components/Layout/AppLayout'
import { ThemeProvider } from '@material-tailwind/react'
import { store } from '../store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SessionProvider session={pageProps.session}>
          <AuthWrapper>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </AuthWrapper>
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
