import type { Experience } from "../../data/experiences";

interface ExperienceCardProps {
  experience: Experience;
  nailId: string;
  rotation: string;
  justification: string;
  marginClass?: string;
}

export default function ExperienceCard({ 
  experience, 
  nailId, 
  rotation, 
  justification, 
  marginClass = "" 
}: ExperienceCardProps) {
  return (
    <div className={`w-full flex ${justification} ${marginClass}`}>
      <article className={`h-[430px] aspect-[9/12] md:aspect-[9/10] ${rotation} bg-white z-10 rounded-[32px] relative shadow-2xl border border-neutral-200`}>
        <div
          id={nailId}
          className="h-6 w-6 rounded-full bg-black absolute top-4 left-1/2 -translate-x-1/2"
        >
          <span className="h-4 w-4 border-2 rounded-full bg-black border-neutral-500 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></span>
        </div>
        <div className="px-4 py-4 pt-12 flex flex-col h-full">
          <h3 className="font-bold text-2xl">
            {experience.company} — <span className="text-neutral-500">{experience.position}</span>
          </h3>
          <span className="flex mb-1 text-[13px] md:text-sm text-neutral-500 justify-between">
            <span>{experience.position}</span>
            <span>{experience.duration}</span>
          </span>
          <div className="bg-neutral-200 p-2 flex-1 h-full w-full rounded-2xl">
            <h3 className="font-bold text-lg mt-4">Role Summary</h3>
            <ul className="list-disc ml-4 text-sm md:text-sm space-y-2 pt-2 text-neutral-600">
              {experience.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}