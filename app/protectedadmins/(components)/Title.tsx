import React from "react";

type TitleProps = {
  title: string;
};

const Title: React.FC<TitleProps> = ({ title }) => {
  return <h1 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h1>;
};

export default Title;
