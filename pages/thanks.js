import React from "react";
import ContainerBlock from "../components/ContainerBlock";

const ThanksPage = () => {
  return (
    <ContainerBlock
      title="Thanks for reaching out | Adam Peleback"
      description="Thank you for your message. Adam will get back to you shortly."
      robots="noindex, nofollow"
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Thank you!</h1>
          <p className="text-gray-700 dark:text-gray-300">
            Your message has been sent. I'll get back to you shortly.
          </p>
        </div>
      </div>
    </ContainerBlock>
  );
};

export default ThanksPage;
