import React from "react";

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default Checkbox;
