// Data-file image paths are occasionally written as "./foo.png"; public/
// assets must be referenced as "/foo.png".
export const normalizeImageSrc = (imgUrl) =>
  imgUrl.startsWith("/") ? imgUrl : `/${imgUrl.replace(/^\.\//, "")}`;

// Projects with a `featured` rank, in rank order — drives the homepage grid.
export const getFeaturedProjects = (projects) =>
  projects
    .filter((project) => project.featured)
    .sort((a, b) => a.featured - b.featured);
