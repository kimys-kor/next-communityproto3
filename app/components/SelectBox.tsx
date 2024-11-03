import { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  onChange: (value: string) => void;
  defaultValue?: string;
};

const SelectBox: React.FC<SelectProps> = ({
  options,
  onChange,
  defaultValue = "",
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="relative w-24 md:w-32 h-[1.75rem]">
      <select
        value={selectedValue}
        onChange={handleChange}
        className="w-full h-full box-border block text-sm border border-gray-300 text-slate-500  rounded-lg focus:ring-blue focus:border-blue"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
