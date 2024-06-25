import { ApiData } from "../utils";

const mockSkills: ApiData[] = [
  { skill: "javascript" },
  { skill: "ReactJs" },
  { skill: "NextJs" },
  { skill: "Typescript" },
  { skill: "NodeJs" },
  {skill: 'Asp.net'}
];

export const fetchSkills: Promise<ApiData[]> = new Promise(
  (resolve, reject) => {
    setTimeout(() => {
      resolve(mockSkills);
    }, 1000);
  }
);

fetchSkills
  .then((skills) => {
    console.log("Skills data retrieved", skills);
  })
  .catch((error) => {
    console.log("Error fetching skills", error);
  });
