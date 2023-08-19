import { useState } from "react";
import InputProps from "../../interfaces/Input";
import "./Input.scss";
const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  setValue,
  type = "text",
  required = false,
  name,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
    setInputValue(value);
  };
  return (
    <section className="input-container d-flex flex-column position-relative ">
      <label htmlFor={name}>{placeholder}</label>
      <input
        type={type}
        name={name}
        value={inputValue}
        onChange={handleOnChange}
        className="position-relative  p-1 rounded-4"
        required={required}
        autoComplete="on"
      />
    </section>
  );
};
export default Input;
