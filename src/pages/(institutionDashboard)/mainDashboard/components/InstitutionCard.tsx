import noImage from "@/assets/no-image-icon.png";
import { Link } from "react-router-dom";
import { useGetUserInstitutionsQuery } from "@/redux/institution/institutionApi";
import InstitutionSkeleton from "@/components/sekeletonLayouts/InstitutionSkeleton.tsx";

function InstitutionCard() {
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
          <div className="flex gap-6 font-kanit border-b-2 border-black py-3 cursor-pointer">
            <img
              src={institution.logo || noImage}
              alt={institution.title}
              className="rounded-md w-36 object-cover max-h-36"
            />
            <div>
              <h2 className="text-xl">{institution.name}</h2>
              <p>{institution.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default InstitutionCard;
