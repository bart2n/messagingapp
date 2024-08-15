import { useGetInstitutionDetailQuery } from "@/redux/institution/institutionApi"
import InstitutionExtensions from "./components/InstitutionExtensions"
import InstitutionTopDetail from "./components/InstitutionTopDetail"
import { useParams } from "react-router-dom"

function InstitutionDetail() {
  const { id } = useParams()
  const { data, error, isLoading } = useGetInstitutionDetailQuery(id);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {isLoading && <p>Loading...</p>}
      <InstitutionTopDetail name={data?.name} />
      <InstitutionExtensions courses={data?.courses} />
    </div>
  )
}

export default InstitutionDetail