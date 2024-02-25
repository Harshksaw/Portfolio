// import logo1 from "../assets/browser.png";

// import logo3 from "../assets/python.gif";

// import js from "../assets/icons8-javascript.gif";
// import reacticon from "../assets/icons8-react-js.gif";
// import logo5 from "../assets/Redux-logo-vector-01.svg";
// import logo6 from "../assets/Node-JS-logo-vector-02.svg";
// import logo7 from "../assets/Next.js.png";
// import logo8 from "../assets/db.jpeg";
// import logo9 from "../assets/typescript.png";

// const Experience = () => {
//   const technologies = [
//     { id: 1, src: js, title: "JS", style: "shadow-purple-500" },

//     { id: 2, src: reacticon, title: "REACT", style: "shadow-purple-500" },
//     { id: 3, src: logo7, title: "NextJS", style: "shadow-green-400" },
//     { id: 4, src: logo5, title: "REDUX", style: "shadow-purple-800" },
//     { id: 5, src: logo6, title: "NODE", style: "shadow-green-600" },
//     { id: 6, src: logo3, title: "PYTHON", style: "shadow-yellow-900" },
//     { id: 7, src: logo1, title: "Html & CSS", style: "shadow-orange-500" },
//     { id: 8, src: logo8, title: "Mongo & Sql", style: "shadow-yellow-700" },
//     { id: 9, src: logo9, title: "TypeScript", style: "shadow-blue-800" },
//   ];

//   return (
//     <div
//       name="experience"
//       className="bg-gradient-to-tl from-violet-600 to-blue-200 w-full h-screen p-20"
//     >
//       <div>
//         <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full  text-white ">
//           <div>
//             <h1 className="text-4xl font-bold border-b-4 border-gray-300 p-2 inline">
//               Experience
//             </h1>
//             <p className="py-6">
//               These are the technologies i have worked with
//             </p>
//           </div>

//           <div className="w-full  grid grid-cols-3 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0 h-full">
//             {technologies.map(({ id, src, title, style }) => (
//               <div
//                 key={id}
//                 className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
//               >
//                 <img
//                   src={src}
//                   alt=""
//                   className="w-25 mx-auto sm:h-25 md:w-20 h-25"
//                   size={20}
//                 />
//                 <p className="mt-4">{title}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Experience;

import styled from "styled-components";
import { skills } from "../../data/constants";
import { Tilt } from "react-tilt";

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content-center;
position: relative;
z-index: 1;
align-items: center;
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 50px;
  justify-content: center;
`;
const Skill = styled.div`
  width: 100%;
  max-width: 500px;

  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 36px;

  @media (max-width: 768px) {
    max-width: 400px;
    padding: 10px 36px;
  }

  @media (max-width: 500px) {
    max-width: 330px;
    padding: 10px 36px;
  }
`;

const SkillTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;
const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 80};
  border: 1px solid ${({ theme }) => theme.text_primary + 80};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Experience = () => {
  return (
    <Container id="Skills" className="bg-violet-400 pb-5">
      <Wrapper>
        <Title>Skills</Title>
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
          Here are some of my skills on which I have been working on for the
          past 2 years.
        </Desc>

        <SkillsContainer>
          {skills.map((skill, index) => (
            <Title key={`skill-${index}`}>
              <Skill key={`skill-${index}`} className="bg-violet-300">
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillList>
                  {skill.skills.map((item, index_x) => (
                    <SkillItem key={`skill-x-${index_x}`}>
                      <SkillImage src={item.image} />
                      {item.name}
                    </SkillItem>
                  ))}
                </SkillList>
              </Skill>
            </Title>
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Experience;
