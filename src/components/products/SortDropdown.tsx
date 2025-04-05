import React from 'react';
import { SortOption } from '../../types/Product';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        <option value="name">Name (A-Z)</option>
        <option value="count">Count</option>
      </select>
    </div>
  );
};

export default SortDropdown;