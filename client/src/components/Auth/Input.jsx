import { styles } from "../../styles";

import { EyeIconClosed, EyeIconShow } from "./icon";

const Input = ({
  name,
  type,
  id,
  label,
  placeholder,
  handleChange,
//   isPassword = false,
  handleShowPassword,
}) => {
 

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
        type={type}
        id={id}
        onChange={handleChange}
        className={`${styles.form_input}`}
        placeholder={placeholder}
        required
      />

      {name==="password" && (
        <button
          type="button"
          onClick={handleShowPassword}
          className="absolute text-sm inline-block bottom-3 right-4"
        >
          {type === 'password' ? <EyeIconClosed /> : <EyeIconShow />}
        </button>
      )}
    </div>
  );
};

export default Input;
