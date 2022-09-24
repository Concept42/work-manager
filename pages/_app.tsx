import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import AuthWrapper from '../components/AuthWrapper'
import AppLayout from '../components/Layout/AppLayout'
import { ThemeProvider } from '@material-tailwind/react'
import { store } from '../store'
import { Provider } from 'react-redux'
import {} from '../slices/userSlice'
import { fetchCustomers } from '../slices/customerSlice'
import { fetchWorkOrders } from '../slices/workOrderSlice'
import { withTRPC } from '@trpc/next'
import type { AppRouter } from '../server/router/app.router'
import type { Session } from 'next-auth'

import superjson from 'superjson'

store.dispatch(fetchCustomers())
store.dispatch(fetchWorkOrders())

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

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          }
        }
        return {}
      },
      url,
      transformer: superjson,
    }
  },
})(MyApp)
