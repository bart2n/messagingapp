import post3 from "@/assets/post3.jpeg";

function InstitutionTopDetail() {
  return (
    <div className="flex justify-between w-1/2">
      <div>
        <h1 className="text-2xl">Kurum Adı</h1>
        <p className="mt-8">Kurum Açıklaması</p>
      </div>
      <img src={post3} alt="Kurum Adı"  className="rounded-md w-36 object-cover max-h-36" />
    </div>
  );
}

export default InstitutionTopDetail;
