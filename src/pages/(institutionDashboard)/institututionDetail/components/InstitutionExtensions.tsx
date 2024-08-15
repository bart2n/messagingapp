import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseContainer from "../containers/CourseContainer";
import EmployeeContainer from "../containers/EmployeeContainer";

function InstitutionExtensions({ courses }: any) {
  return (
    <div className="w-1/2 mt-8">
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="w-full justify-around">
          <TabsTrigger defaultChecked value="courses">Kurslar</TabsTrigger>
          <TabsTrigger value="employee">Kadro</TabsTrigger>
          <TabsTrigger value="students">Öğrenciler</TabsTrigger>
          <TabsTrigger value="info">Kurum Bilgileri</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <CourseContainer courses={courses} />
        </TabsContent>
        <TabsContent value="employee">
          <EmployeeContainer />
        </TabsContent>
        <TabsContent value="students">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="info">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

export default InstitutionExtensions;
