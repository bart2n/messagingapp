import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useNavigate } from "react-router-dom";

export default function CreateInstitution() {
  const navigation = useNavigate();

  return (
    <div className="h-full flex gap-6 flex-col items-center justify-center font-kanit">
      <h1 className="text-2xl text-center md:w-1/2 w-full">
        Herhangi Bir Kuruma veya Takıma ait değilsiniz lütfen kurumunuz
        tarafından davet alın veya kendi kurumunuzu oluşturun
      </h1>
      <Card className="md:w-1/2 w-full">
        <CardHeader></CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
                <Label htmlFor="institutionName">Kurum Adı</Label>
                <Input
                  id="institutionName"
                  placeholder="Kurum Adını Giriniz"
                />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={() => navigation("/dashboard/institution-main")}>
            Oluştur
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
