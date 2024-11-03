"use client";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ScrollButtons: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed flex md:fixed md:flex bottom-20 md:bottom-4 right-4  flex-col items-center space-y-3">
      <button
        onClick={scrollToTop}
        className="p-1 bg-indigo-500/50 text-white rounded-full shadow-lg hover:bg-indigo-600 transition duration-300"
      >
        <FaArrowUp size={20} />
      </button>
      <button
        onClick={scrollToBottom}
        className="p-1 bg-indigo-500/50 text-white rounded-full shadow-lg hover:bg-indigo-600 transition duration-300"
      >
        <FaArrowDown size={20} />
      </button>
    </div>
  );
};

export default ScrollButtons;
