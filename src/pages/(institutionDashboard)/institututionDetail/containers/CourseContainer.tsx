import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
function CourseContainer() {
  return (
    <div className="flex gap-6 flex-col items-center justify-center font-kanit">
      <Card className=" w-full max-h-64 min-h-56 overfloy-y-scroll">
        <CardHeader>
          <Button className="bg-primary text-white self-end">
            Kurs Oluştur
          </Button>
        </CardHeader>
        <CardContent className="text-center">
          Henüz kursunuz bulunmuyor <br />
          oluşturmak için kurs oluştur butonuna tıklayınız
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default CourseContainer;
