import InstitutionCard from "../components/InstitutionCard";
import post1 from "@/assets/post1.webp";
import post2 from "@/assets/post2.jpg"
import post3 from "@/assets/post3.jpeg";
import { Link } from "react-router-dom";

const dummyData = [
  { id: 1, title: "Kurum 1", description: "Kurum 1 açıklaması", image: post1 },
  { id: 2, title: "Kurum 2", description: "Kurum 2 açıklaması", image: post2 },
  { id: 3, title: "Kurum 3", description: "Kurum 3 açıklaması", image: post3 },
];

function InstitutionCardContainer() {
  return (
    <div className="container mx-auto p-4">
      {dummyData.map((data) => (
        <Link to={`/dashboard/institution-detail`} key={data.id}>
        <InstitutionCard
          title={data.title}
          description={data.description}
          image={data.image}
        />
        </Link>
      ))}
    </div>
  );
}

export default InstitutionCardContainer;
