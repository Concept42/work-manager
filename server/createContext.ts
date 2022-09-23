import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../lib/db"
export function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  return { req, res, prisma };
}
export type Context = ReturnType<typeof createContext>;