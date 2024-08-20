import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
function CourseContainer({ courses }: any) {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex gap-6 flex-col items-center justify-center font-kanit">
      <Card className=" w-full max-h-64 min-h-56 overfloy-y-scroll">
        <CardHeader>
          <Button
            onClick={() =>
              navigate(`/dashboard/institution-detail/${id}/create-course`)
            }
            className="bg-primary text-white self-end"
          >
            Kurs Oluştur
          </Button>
        </CardHeader>
        <CardContent className="text-center">
          {courses?.length > 0 ? (
            courses.map((course: any) => (
              <div key={course.id} className="flex justify-between">
                <p>{course.name}</p>
                <p>{course.price}</p>
              </div>
            ))
          ) : (
            <p>
              {" "}
              Henüz kursunuz bulunmuyor <br />
              oluşturmak için kurs oluştur butonuna tıklayınız
            </p>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default CourseContainer;
