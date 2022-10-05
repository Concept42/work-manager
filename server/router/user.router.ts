import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { userSchema, userYup } from '../../components/Forms/FormValidate'
import { createRouter } from '../createRouter'
import * as trpc from '@trpc/server'
import Users from '../../pages/users'
import { User } from '@prisma/client'

export const userRouter = createRouter()
  .query('getUsersData', {
    async resolve({ ctx }) {
      const { email } = ctx.req.body
      const users = await ctx.prisma.user.findMany({
        where: {
          email,
        },
        include: {
          workOrders: true,
        },
      })
      return users as User[]
    },
  })
  .mutation('addNewUser', {
    input: userYup,
    async resolve({ ctx, input }) {
      const { name, email, role, password } = input
      try {
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
            role,
            password,
          },
        })
        return user
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new trpc.TRPCError({
              code: 'CONFLICT',
              message: 'User with that email already exists',
            })
          }
        }
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        })
      }
    },
  })
