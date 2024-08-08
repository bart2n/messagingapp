import InstitutionExtensions from "./components/InstitutionExtensions"
import InstitutionTopDetail from "./components/InstitutionTopDetail"

function InstitutionDetail() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <InstitutionTopDetail />
      <InstitutionExtensions />
    </div>
  )
}

export default InstitutionDetail