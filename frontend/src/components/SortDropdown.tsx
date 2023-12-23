type SortDropdownProps = {
  selectedValue: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const SortDropdown = ({
  selectedValue,
  handleChange,
}: SortDropdownProps) => {
  const sortOptions = ["newest", "highest"];

  return (
    <div className="flex gap-2 items-center">
      <label className="flex gap-2 items-center">Sort by</label>
      <select
        className="capitalize"
        onChange={handleChange}
        value={selectedValue}
      >
        {sortOptions.map((sortOption) => (
          <option key={sortOption} value={sortOption}>
            {sortOption}
          </option>
        ))}
      </select>
    </div>
  );
};
