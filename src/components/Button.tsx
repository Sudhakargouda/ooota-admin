import React from "react";

interface ButtonProps {
  text: string;
  // onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text}) => {
  return (
    <button
      // onClick={onClick}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
    >
      {text}
    </button>
  );
};

export default Button;