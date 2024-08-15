import InstitutionCard from "../components/InstitutionCard";
import post1 from "@/assets/post1.webp";
import post2 from "@/assets/post2.jpg"
import post3 from "@/assets/post3.jpeg";
import noImage from "@/assets/no-image-icon.png";
import { Link } from "react-router-dom";
import { useGetUserInstitutionsQuery } from "@/redux/institution/institutionApi";
import { Skeleton } from "@/components/ui/skeleton";
const dummyData = [
  { id: 1, title: "Kurum 1", description: "Kurum 1 açıklaması", image: post1 },
  { id: 2, title: "Kurum 2", description: "Kurum 2 açıklaması", image: post2 },
  { id: 3, title: "Kurum 3", description: "Kurum 3 açıklaması", image: post3 },
];

function InstitutionCardContainer() {
  const { data, error, isLoading } = useGetUserInstitutionsQuery("");
  console.log(data)
  return (
    <div className="container mx-auto p-4">
      {isLoading && new Array(3).fill(0).map((_, index) => (
        <InstitutionSkeleton key={index} />
      ))}

      {data?.map((institution: any) => (
        <Link to={`/dashboard/institution-detail/${institution.id}`} key={institution.id}>
          <InstitutionCard
            title={institution.name}
            description={institution.created_at}
            image={institution.logo || noImage}
          />
        </Link>
      ))}
    </div>
  );
}

function InstitutionSkeleton() {
  return (
    <div className="flex items-center w-full space-x-12">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}

export default InstitutionCardContainer;
