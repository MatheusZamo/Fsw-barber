"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"

interface CreateBookingParams {
  serviceId: string
  date: Date
}

interface UserWithId {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export const createBooking = async (params: CreateBookingParams) => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error("Usuário não autenticado")
  }

  const user = session.user as UserWithId
  if (!user.id) {
    throw new Error("ID do usuário não encontrado")
  }

  await db.booking.create({
    data: {
      ...params,
      userId: user.id,
    },
  })

  revalidatePath("/barbershops/[id]")
  revalidatePath("/bookings")
}
