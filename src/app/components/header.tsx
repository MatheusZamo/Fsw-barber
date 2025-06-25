"use client"

import Image from "next/image"
import { Card, CardContent } from "../../components/ui/card"

import { Button } from "../../components/ui/button"
import { CalendarIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react"
import SidebarSheet from "./sidebar-sheet"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import SignInDialog from "./sign-in-dialog"

const Header = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()
  console.log(data)
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          <Image
            alt="FSW Barber"
            src="../../Logo.svg"
            height={18}
            width={120}
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>

        <div className="hidden gap-3 lg:flex">
          <Button
            className="justify-start gap-2 text-sm"
            variant="ghost"
            asChild
          >
            <Link href="/bookings">
              <CalendarIcon size={18} />
              Agendamentos
            </Link>
          </Button>

          {data?.user && (
            <div className="flex flex-col gap-2">
              <Button
                className="justify-start gap-2 text-sm"
                variant="ghost"
                onClick={handleLogoutClick}
              >
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </div>
          )}

          {data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data?.user?.image ?? ""} />
              </Avatar>
              <div>
                <p className="font-bold">{data.user.name?.split(" ")[0]}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <h2 className="mt-2 font-bold">Olá, faça seu login!</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon">
                    <LogInIcon />
                  </Button>
                </DialogTrigger>
                <SignInDialog />
              </Dialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
