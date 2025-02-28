import Image from "next/image";

interface ProjectDetailsProps {
  name: string;
  description: string;
  icon: string;
  onSelect: () => void;
  isSelected: boolean;
}

const ProjectDetails = ({ name, icon, onSelect, isSelected }: ProjectDetailsProps) => {
  return (
    <div
      className={`flex flex-col items-center p-4 rounded-lg shadow-lg transition cursor-pointer ${
        isSelected ? "bg-blue-600" : "bg-gray-800"
      }`}
      onClick={onSelect}
    >
      <Image src={icon} alt={name} width={50} height={50} />
      <h3 className=" md:text-md font-semibold mt-2">{name}</h3>
    </div>
  );
};

export default ProjectDetails;
