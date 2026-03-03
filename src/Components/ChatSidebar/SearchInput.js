import React from "react";
// import { FaSearch } from "react-icons/fa";
import { CgSearch } from "react-icons/cg";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        style={{color:"black"}}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-black">
        <CgSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
