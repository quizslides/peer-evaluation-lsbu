import path from "path";

const getFixturesPath = (file: string) => {
  const fixturesRelativePath = "cypress/fixtures";

  return path.join(fixturesRelativePath, file);
};

const getRandomScore = (min: number, max: number) => Math.floor(Math.random() * max) + min;

export { getFixturesPath, getRandomScore };
