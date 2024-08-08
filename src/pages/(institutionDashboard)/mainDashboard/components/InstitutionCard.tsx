interface InstitutionCardProps {
  title: string;
  description: string;
  image: string;
}

function InstitutionCard({ title, description, image }: InstitutionCardProps) {
  return (
    <div className="flex gap-6 font-kanit border-b-2 border-black py-3 cursor-pointer">
      <img src={image} alt={title} className="rounded-md w-36 object-cover max-h-36" />
      <div>
        <h2 className="text-xl">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default InstitutionCard;
