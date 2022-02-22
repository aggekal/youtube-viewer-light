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
    <div className="search-bar">
      <input value={term} onChange={(e) => onInputChange(e.target.value)} />
    </div>
  );
};

export default SearchBar;
