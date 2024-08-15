import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import InstitutionCardContainer from "./containers/InstitutionCardContainer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function MainDashboard() {
  const navigate = useNavigate();
  return (
    <div className=" flex gap-6 flex-col items-center justify-center font-kanit ">
      <h1 className="text-2xl">
        Düzenlemek yönetmek veya kurs eklemek istediğiniz kurumunuzu seçiniz
      </h1>
      <Card className="md:w-1/2 w-full ">
        <CardHeader>
          <Button
            onClick={() => {
              navigate("/dashboard/institution-create");
            }}
            className="bg-primary text-white self-end">
            Kurum Oluştur
          </Button>
        </CardHeader>
        <CardContent>
          <InstitutionCardContainer />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default MainDashboard;
