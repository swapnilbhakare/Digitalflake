import React from "react";
import { MdOutlineFileUpload } from "react-icons/md";

const InputField = React.forwardRef(
  ({ id, label, type, value, onChange, required, options }, refProp) => {
    const handleChange = (event) => {
      let inputValue;
      if (event.target.type === "file") {
        inputValue = event.target.files[0];
      } else {
        inputValue = event.target.value;
      }

      onChange(inputValue);
    };

    return (
      <div className="relative flex flex-col w-3/12  ml-1 mb-2">
        {type === "select" ? (
          <select
            id={id}
            className="rounded-sm block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-[2px] border-gray-500 appearance-none dark:text-gray-400 dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-500"
            ref={refProp}
            value={value}
            onChange={handleChange}
            required={required}
          >
            {label && (
              <option value="" disabled>
                {label}
              </option>
            )}

            {options && options.map
              ? options.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))
              : Object.entries(options).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
          </select>
        ) : (
          <div className="relative">
            <label
              htmlFor={id}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-500 cursor-pointer"
            >
              {type === "file" ? <MdOutlineFileUpload size={20} /> : ""}
            </label>
            <input
              type={type}
              id={id}
              className={` rounded-sm block pl-8 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-[2px] border-gray-500 appearance-none dark:text-gray-400 dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-500`}
              placeholder={label ? " " : undefined}
              ref={refProp}
              value={value}
              onChange={handleChange}
              required={required}
            />
          </div>
        )}

        {label && (
          <label
            htmlFor={id}
            className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-500 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

export default InputField;
