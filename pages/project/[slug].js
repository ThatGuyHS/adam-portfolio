import React from "react";
import ContainerBlock from "../../components/ContainerBlock";

const ProjectPage = ({ project }) => {
  if (!project) {
    return (
      <ContainerBlock
        title="Project not found | Adam Peleback"
        description="This project page is not currently available."
        robots="noindex, nofollow"
      >
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Project not found
          </h1>
        </div>
      </ContainerBlock>
    );
  }

  return (
    <ContainerBlock
      title={`${project.title} | Adam Peleback`}
      description={project.description || `Learn more about ${project.title}.`}
      image={project.imgUrl || project.imageUrl || "/adam.png"}
      type="article"
      robots="noindex, nofollow"
    >
      <div className="container mx-auto px-4">
        <header className="text-center my-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            {project.title}
          </h1>
        </header>
        <div className="flex justify-center my-6">
          <img
            src={project.imgUrl || project.imageUrl}
            alt={`${project.title} project screenshot`}
            className="max-w-md rounded-lg shadow-md"
          />
        </div>
        <article className="prose lg:prose-xl mx-auto text-gray-700 dark:text-gray-300">
          <p>{project.description || "Project details will be added soon."}</p>
        </article>
      </div>
    </ContainerBlock>
  );
};

export default ProjectPage;
