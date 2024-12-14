import React from 'react';

const ProjectPage = ({ project }) => {
  return (
    <div className="container mx-auto px-4">
      <header className="text-center my-6">
        <h1 className="text-4xl font-bold text-gray-800">{project.title}</h1>
      </header>
      <div className="flex justify-center my-6">
        <img src={project.imageUrl} alt={project.title} className="max-w-md rounded-lg shadow-md" />
      </div>
      <article className="prose lg:prose-xl mx-auto text-gray-700">
        <p>{project.description}</p>
      </article>
    </div>
  );
};

export default ProjectPage;
