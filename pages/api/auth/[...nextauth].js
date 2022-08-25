import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import Auth0Provider from 'next-auth/providers/auth0'
import prisma from '../../../lib/db'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req, res) {
        const { email, password } = credentials

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
            role: true,
          },
        })
        if (!user) throw new Error('No Access')
        if (user.email !== email || user.password !== password)
          throw new Error('Invalid credentials')

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },

  //   CredentialsProvider({
  //     // The name to display on the sign in form (e.g. 'Sign in with...')
  //     name: 'Credentials',
  //     // The credentials is used to generate a suitable form on the sign in page.
  //     // You can specify whatever fields you are expecting to be submitted.
  //     // e.g. domain, username, password, 2FA token, etc.
  //     // You can pass any HTML attribute to the <input> tag through the object.
  //     credentials: {
  //       email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
  //       password: { label: 'Password', type: 'password' },
  //     },
  //     async authorize(credentials) {
  //       // You need to provide your own logic here that takes the credentials
  //       // submitted and returns either a object representing a user or value
  //       // that is false/null if the credentials are invalid.
  //       // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
  //       // You can also use the `req` object to obtain additional parameters
  //       // (i.e., the request IP address)
  //       // const res = await fetch('/api/customers/authenticateUser', {
  //       //   method: 'POST',
  //       //   body: JSON.stringify(credentials.email),
  //       //   headers: { 'Content-Type': 'application/json' },
  //       // })
  //       // const user = await res.json()
  //       const user = { id: '1', email: 'zoran@gmail.com', password: '123' }
  //       // If no error and we have user data, return it
  //       if (
  //         user &&
  //         credentials.email === user.email &&
  //         credentials.password === user.password
  //       ) {
  //         return user
  //       }
  //       // Return null if user data could not be retrieved
  //       return null
  //     },
  //   }),
  // ],
  // secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: 'jwt',
  // },
})
