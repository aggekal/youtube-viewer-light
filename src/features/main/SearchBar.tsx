import { useState } from "react";

interface SearchBarBarProps {
  onSearchTermChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarBarProps> = ({ onSearchTermChange }) => {
  const [term, setTerm] = useState("");
  const onInputChange = (term: string) => {
    setTerm(term);
    onSearchTermChange(term);
  };

  return (
    <div className="flex justify-center mb-2 mt-2">
      <input
        placeholder="Search"
        className="appearance-none border-b border-gray-300  focus:outline-none w-2/4 "
        value={term}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
