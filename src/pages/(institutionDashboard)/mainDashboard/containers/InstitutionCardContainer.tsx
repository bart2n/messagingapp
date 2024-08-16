import InstitutionCard from "../components/InstitutionCard";
import noImage from "@/assets/no-image-icon.png";
import { Link } from "react-router-dom";
import { useGetUserInstitutionsQuery } from "@/redux/institution/institutionApi";
import { Skeleton } from "@/components/ui/skeleton";

function InstitutionCardContainer() {
  const { data, error, isLoading } = useGetUserInstitutionsQuery("");
  return (
    <div className="container mx-auto p-4">
      {isLoading &&
        new Array(3)
          .fill(0)
          .map((_, index) => <InstitutionSkeleton key={index} />)}

      {data?.map((institution: any) => (
        <Link
          to={`/dashboard/institution-detail/${institution.id}`}
          key={institution.id}
        >
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
  );
}

export default InstitutionCardContainer;
