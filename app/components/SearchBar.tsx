'use client';

import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Search location...',
  value,
  onChange,
  onSearch,
  className = ''
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-3 pl-10 pr-4 rounded-lg border-none bg-gray-100 border  text-gray-600 placeholder-gray-400 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}
