import { Skeleton } from "../ui/skeleton";

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

export default InstitutionSkeleton;
