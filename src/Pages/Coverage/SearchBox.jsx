import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = ({ onSearch }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(text);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[571px] mx-auto bg-[#f5f7f9] rounded-full px-3 py-2 flex items-center gap-2"
    >
      <FaSearch className="text-gray-500 text-base flex-shrink-0" />
      <input
        type="text"
        placeholder="Search here"
        className="flex-grow bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="whitespace-nowrap bg-lime-300 text-black text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-lime-400 transition-all flex-shrink-0"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
