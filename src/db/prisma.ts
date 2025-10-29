import 'dotenv/config'
import { PrismaClient } from '@prisma/client/edge'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'
import { withAccelerate } from '@prisma/extension-accelerate'

import ws from 'ws'
neonConfig.webSocketConstructor = ws
neonConfig.poolQueryViaFetch = true

declare global {
  var prisma: PrismaClient | undefined
}

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaNeon({ connectionString })

export const prisma =
  globalThis.prisma ||
  new PrismaClient({ adapter }).$extends(withAccelerate())

if (process.env.NODE_ENV === 'development') globalThis.prisma = prisma as unknown as PrismaClient

export default prisma
