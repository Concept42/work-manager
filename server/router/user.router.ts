import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { userSchema } from "../../components/Forms/FormValidate"
import { createRouter } from '../createRouter';
import * as trpc from '@trpc/server';


export const userRouter = createRouter()
.query("getUsersData", {
  async resolve({ctx}){
    const { email } = ctx.req.body
    const users = await ctx.prisma.user.findMany({
      where: {
        email,
      },
      include: {
        workOrders: true,
      },
    })
    return users;
  }
})
  .mutation('addNewUser', {
    input: userSchema,
    async resolve({ ctx, input }) {
      const { name, email, role, password  } = input;
try {
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
            role,
            password
          },
        });
        
        return user;
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === 'P2002') {
            throw new trpc.TRPCError({
              code: 'CONFLICT',
              message: 'User already exists',
            });
          }
        }
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        });
      }
    },
  })