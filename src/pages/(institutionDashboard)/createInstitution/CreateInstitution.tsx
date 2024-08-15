import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateInstitutionMutation } from "@/redux/institution/institutionApi";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function CreateInstitution() {
  const navigation = useNavigate();
  const [createInstitution, { isLoading, isError, isSuccess }] = useCreateInstitutionMutation();
  const [institutionName, setInstitutionName] = useState("");

  const createInstitutionHandler = async (e: any) => {
    e.preventDefault();

    await createInstitution({ name: institutionName });
    if (isSuccess)
      console.log("succes")
      navigation("/dashboard/institution-main");
  };

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
                name="name"
                placeholder="Kurum Adını Giriniz"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            className={isLoading ? "bg-gray-400" : "bg-primary"}
            onClick={createInstitutionHandler}>
            Oluştur
          </Button>

        </CardFooter>
        {isError && <p className="text-red-500 text-center mb-3">Bir hata oluştu. Lütfen tekrar deneyin.</p>}

      </Card>
    </div>
  );
}
