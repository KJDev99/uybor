"use client";
import { useEffect, useState } from "react";

const SarlavhaKiritish = ({
  label,
  placeholder,
  message,
  type,
  setFormData,
  formData,
  reqName,
  value,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (reqName === "user" && userInfo) {
      setInputValue(userInfo.full_name || "");
      setFormData({ ...formData, user: userInfo.id });
    } else if (reqName === "phone" && userInfo) {
      setInputValue(userInfo.phone || "");
      setFormData({ ...formData, phone: userInfo.phone });
    }

    if (value) {
      setInputValue(value);
    }
    console.log(value, "value sar");
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    if (type === "number" && isNaN(value)) {
      setError("");
    } else {
      setError("");
      setInputValue(value);
      setFormData({ ...formData, [reqName]: value });
    }
  };
  return (
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-kulrang font-medium ml-[20px] mt-5 mb-2 text-sm max-md:mt-2">
        {label}
      </h2>
      <div className="flex flex-col">
        <input
          type="text" // Always use text input type for custom validation
          disabled={reqName == "user"} // Disable input field for admin users
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="outline-none pr-4 overflow-hidden text-qora font-medium flex p-[10px] h-10 w-full rounded-[10px] justify-between items-center cursor-pointer border border-yozish"
        />
        {error && <p className="text-sm mt-1 ml-5 text-red-500">{error}</p>}
        {message && !error && (
          <p className="text-sm mt-1 ml-5 text-kulrang">{message}</p>
        )}
      </div>
    </div>
  );
};

export default SarlavhaKiritish;
