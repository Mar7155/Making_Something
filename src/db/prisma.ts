import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const connectionString = process.env.DATABASE_URL
const pool = new PrismaNeon({ connectionString })

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = new PrismaClient({ adapter: pool });

