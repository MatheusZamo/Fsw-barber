import Header from "./components/header"
import { Button } from "../components/ui/button"
import { db } from "@/lib/prisma"
import Image from "next/image"
import { quickSearchOptions } from "@/app/constants/search"
import BookingItem from "./components/booking-item"
import BarbershopItem from "./components/barbershop-item"
import Search from "./components/search"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "./data/get-confirmed-bookings"
import Carousel from "./components/carousel"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-5xl p-5 lg:flex lg:w-full lg:flex-col lg:justify-center">
        <div>
          <h2 className="text-xl font-bold">
            Olá,{" "}
            {session?.user ? session.user.name?.split(" ")[0] : "Bem Vindo"}!
          </h2>
          <p>
            <span className="capitalize">
              {format(new Date(), "EEEE, dd", { locale: ptBR })}
            </span>
            <span>&nbsp;de&nbsp;</span>
            <span className="capitalize">
              {format(new Date(), "MMMM", { locale: ptBR })}
            </span>
          </p>

          <div className="mt-6 max-w-xl">
            <Search />
          </div>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll lg:hidden [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-[150px] w-full lg:hidden">
          <Image
            alt="Agende nas melhores com FSW Barber"
            src="Banner.svg"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {confirmedBookings.length > 0 && (
          <Carousel title="Agendamentos" className="mt-6">
            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </Carousel>
        )}

        <Carousel title="Recomendados" className="mt-6">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </Carousel>

        <Carousel title="Populares" className="mt-6">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default Home
