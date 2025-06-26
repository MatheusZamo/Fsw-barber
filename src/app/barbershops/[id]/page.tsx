import { db } from "@/lib/prisma"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import SidebarSheet from "@/app/components/sidebar-sheet"
import ServiceItem from "@/app/components/service-item"
import { Button } from "@/components/ui/button"
import PhoneItem from "@/app/components/phone-item"
import Header from "@/app/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <>
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="block lg:flex lg:justify-around">
        <div>
          {/* IMAGE */}
          <div className="relative h-[250px] w-full lg:ml-6 lg:mt-6 lg:h-[300px] lg:w-[600px]">
            <Image
              alt={barbershop.name}
              src={barbershop.imageUrl}
              fill
              className="rounded-md object-cover"
            />

            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-4 lg:hidden"
              asChild
            >
              <Link href="/">
                <ChevronLeftIcon />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute right-4 top-4"
                >
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SidebarSheet />
            </Sheet>
          </div>

          {/* TITLE, ADDRESS AND STARS */}
          <div className="border-b border-solid p-5">
            <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
            <div className="lg:flex lg:justify-between">
              <div className="mb-2 flex items-center gap-2">
                <MapPinIcon className="text-primary" size={18} />
                <p className="text-sm">{barbershop.address}</p>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <StarIcon className="fill-primary text-primary" size={18} />
                <p className="text-sm">5,0 (499 avaliações)</p>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2 border-b border-solid p-5 lg:hidden">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Sobre nós
            </h2>
            <p className="text-justify text-sm">{barbershop.description}</p>
          </div>

          {/* SERVICES */}
          <div className="space-y-3 border-b border-solid p-5 lg:w-[700px]">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Serviços
            </h2>
            <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  barbershop={JSON.parse(JSON.stringify(barbershop))}
                  service={JSON.parse(JSON.stringify(service))}
                />
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div className="space-y-3 p-5 lg:hidden">
            {barbershop.phones.map((phone) => (
              <PhoneItem phone={phone} key={phone} />
            ))}
          </div>
        </div>

        <div className="hidden max-w-sm lg:block">
          <div className="relative mt-6 flex h-[180px] w-full items-end">
            <Image
              // ${booking.service.barbershop.name}
              alt={`Mapa da barbearia `}
              src="/map.svg"
              fill
              className="rounded-xl object-cover"
            />

            <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
              <CardContent className="gap- flex items-center gap-3 px-5 py-3">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-bold">{barbershop.name}</h3>
                  <p className="text-xs">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2 border-b border-solid p-5">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Sobre nós
            </h2>
            <p className="text-justify text-sm">{barbershop.description}</p>
          </div>

          <div className="space-y-3 p-5">
            {barbershop.phones.map((phone) => (
              <PhoneItem phone={phone} key={phone} />
            ))}
          </div>
          <div className="mt-5 flex justify-between">
            <p className="pl-5 text-xs uppercase text-gray-400">
              Em parceria com
            </p>
            <Link href="/">
              <Image
                alt="FSW Barber"
                src="../../Logo.svg"
                height={18}
                width={120}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default BarbershopPage
