import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import InstitutionCardContainer from "./containers/InstitutionCardContainer";

function MainDashboard() {
  return (
    <div className="h-full flex gap-6 flex-col items-center justify-center font-kanit">
      <h1 className="text-2xl">
        Düzenlemek yönetmek veya kurs eklemek istediğiniz kurumunuzu seçiniz
      </h1>
      <Card className="md:w-1/2 w-full">
        <CardHeader></CardHeader>
        <CardContent>
          <InstitutionCardContainer />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default MainDashboard;
