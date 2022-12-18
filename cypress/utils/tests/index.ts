import path from "path";

const getFixturesPath = (file: string) => {
  const fixturesRelativePath = "cypress/fixtures";

  return path.join(fixturesRelativePath, file);
};

export { getFixturesPath };
