import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
function EmployeeContainer() {
  return (
    <div className="flex gap-6 flex-col items-center justify-center font-kanit">
      <Card className="w-full max-h-64 min-h-56 overfloy-y-scroll">
        <CardHeader>
          <Button className="bg-primary text-white self-end">
            Personel Ekle
          </Button>
        </CardHeader>
        <CardContent className="text-center">
          Henüz kurumunuza kayıtlı personel bulunmuyor <br />
          personel eklemek için personel ekle butonuna tıklayınız
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default EmployeeContainer;
