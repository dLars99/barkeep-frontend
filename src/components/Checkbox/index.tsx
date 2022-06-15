import React, { useState } from "react";

const Checkbox = ({
  id,
  label,
  onChange,
}: {
  id: string;
  label: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setChecked(!checked);
    onChange(e);
  };
  return (
    <label>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
      />
      {label}
    </label>
  );
};

export default Checkbox;
