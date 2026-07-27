// Turns "Svenska Esportförbundet" into "svenska-esportforbundet".
export const toProjectSlug = (title) =>
  title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const findProjectBySlug = (projects, slug) =>
  projects.find((project) => toProjectSlug(project.title) === slug) || null;
