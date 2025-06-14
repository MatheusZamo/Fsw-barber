import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"

//TODO: receber agendamento como propriedade
const BookingItem = () => {
  return (
    <>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>
      <Card className="mt-6">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png" />
              </Avatar>
              <p className="text-sm">Barbearia FSW</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm">Maio</p>
            <p className="text-2x1">10</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
