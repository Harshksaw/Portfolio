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
      <article className={`h-[430px] aspect-[9/12] md:aspect-[9/10] ${rotation} bg-gradient-to-br from-primary-darkest to-primary-darker z-10 rounded-[32px] relative shadow-[0_0_25px_rgba(112,0,255,0.4)] hover:shadow-[0_0_40px_rgba(112,0,255,0.6)] transition-shadow duration-300 border border-primary-violet/30`}>
        <div
          id={nailId}
          className="h-6 w-6 rounded-full bg-primary-violet absolute top-4 left-1/2 -translate-x-1/2"
        >
          <span className="h-4 w-4 border-2 rounded-full bg-primary-main border-primary-light/50 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></span>
        </div>
        <div className="px-4 py-4 pt-12 flex flex-col h-full">
          <h3 className="font-bold text-2xl text-white">
            {experience.companyUrl ? (
              <a 
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-violet transition-colors duration-200 underline decoration-primary-violet/30 hover:decoration-primary-violet"
              >
                {experience.company}
              </a>
            ) : (
              experience.company
            )} — <span className="text-gray-300">{experience.position}</span>
          </h3>
          <span className="flex mb-1 text-[13px] md:text-sm text-gray-300 justify-between">
            <span>{experience.position}</span>
            <span>{experience.duration}</span>
          </span>
          <div className="bg-gradient-to-br from-primary-darkest/80 to-primary-darker/60 p-2 flex-1 h-full w-full rounded-2xl border border-primary-main/10">
            <h3 className="font-bold text-lg mt-4 text-white">Role Summary</h3>
            <ul className="list-disc ml-4 text-sm md:text-sm space-y-2 pt-2 text-gray-200">
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