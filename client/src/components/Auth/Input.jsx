import { useState } from "react";
import { styles } from "../../styles";

import { EyeIconClosed, EyeIconShow } from "./icon";

const Input = ({
  name,
  type,
  id,
  label,
  placeholder,
  handleChange,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>

      <input
        name={name}
        type={isPassword && showPassword ? "text" : type}
        id={id}
        onChange={handleChange}
        className={`${styles.form_input}`}
        placeholder={placeholder}
        required
      />

      {isPassword && (
        <button
          type="button"
          onClick={handleShowPassword}
          className="absolute text-sm inline-block bottom-3 right-4"
        >
          {showPassword ? <EyeIconClosed /> : <EyeIconShow />}
        </button>
      )}
    </div>
  );
};

export default Input;
