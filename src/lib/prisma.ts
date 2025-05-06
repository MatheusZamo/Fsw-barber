import { PrismaClient } from "@prisma/client"

// Declara explicitamente a propriedade no objeto global
const globalForPrisma = global as typeof global & {
  cachedPrisma?: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!globalForPrisma.cachedPrisma) {
    globalForPrisma.cachedPrisma = new PrismaClient()
  }
  prisma = globalForPrisma.cachedPrisma
}

export const db = prisma
