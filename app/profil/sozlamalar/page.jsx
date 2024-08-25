"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import SarlavhaKiritishEdit from "@/components/SarlavhaKiritishEdit";
import rasmYuklash from "@/assets/images/rasmyuklash.png";
import Loader from "@/components/Loader";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({
    fullName: "",
    newPassword: "",
    confirmPassword: "",
    photos: "",
  });
  const [formErrors, setFormErrors] = useState({
    passwordError: false,
  });

  const fetchUserProfile = async () => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      console.error("Foydalanuvchi tizimga kirilgan emas.");
      return;
    }
    try {
      const response = await api.get("/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      setUserData(response.data);
      setFormValues((prev) => ({
        ...prev,
        fullName: response.data.full_name,
      }));
      if (response.data.photo) {
        setImage(response.data.photo);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Xatolik yuz berdi.");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);
  if (loading) return <Loader type="ball-grid-pulse" />;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage1(file);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    if (
      formValues.newPassword &&
      formValues.newPassword !== formValues.confirmPassword
    ) {
      setFormErrors((prev) => ({ ...prev, passwordError: true }));
      isValid = false;
    } else {
      setFormErrors((prev) => ({ ...prev, passwordError: false }));
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        console.error("Foydalanuvchi tizimga kirilgan emas.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("full_name", formValues.fullName || "");
        if (image) {
          formData.append("photo", image1);
        }
        if (formValues.newPassword)
          formData.append("password", formValues.newPassword);
        if (formValues.confirmPassword)
          formData.append("confirm_password", formValues.confirmPassword);

        await api.put("/api/v1/user/profile", formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setSuccess(t("sozlamalar1"));
        // Refresh the user data to reflect changes
        window.location.reload();
      } catch (err) {
        setError(err.response?.data?.message || "Xatolik yuz berdi.");
        console.error("Submit Error:", err);
      }
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="md:bg-white md:p-[30px] rounded-[10px] mb-[30px] flex justify-between max-md:flex-col">
      <Link
        href={"/profil"}
        className="md:hidden text-lg font-semibold flex items-center max-md:mb-5"
      >
        <FaAngleLeft />
        {t("navbar2")}
      </Link>
      <h2 className="text-lg text-[#343434] font-semibold md:hidden">
        {t("sozlamalar2")}
      </h2>
      <div className="flex justify-between w-full max-md:flex-col-reverse">
        <div className="w-3/5 flex flex-col max-md:w-full">
          <h2 className="text-xl text-qora font-semibold max-md:hidden">
            {t("sozlamalar7")}
          </h2>
          <SarlavhaKiritishEdit
            label={t("login6")}
            type="text"
            placeholder={t("login7")}
            name="fullName"
            value={formValues.fullName}
            onChange={handleInputChange}
          />
          <SarlavhaKiritishEdit
            label={t("login3")}
            type="text"
            placeholder={t("login3")}
            value={userData.phone} // Displaying phone number, but it's not editable
            disabled
          />
          <h2 className="text-xl text-qora font-semibold mt-[30px]">
            {t("login25")}
          </h2>
          <SarlavhaKiritishEdit
            label={t("sozlamalar3")}
            type="password"
            placeholder={t("sozlamalar3")}
            name="newPassword"
            value={formValues.newPassword}
            onChange={handleInputChange}
          />
          <SarlavhaKiritishEdit
            label={t("sozlamalar4")}
            type="password"
            placeholder={t("sozlamalar4")}
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
            message={formErrors.passwordError ? t("sozlamalar8") : ""}
          />
          <button
            className="h-[44px] w-full border-none bg-main outline-none text-white text-lg rounded-[10px] mt-[30px]"
            onClick={handleSubmit}
          >
            {t("sozlamalar5")}
          </button>
        </div>
        <div className="w-2/5 flex flex-col items-center max-md:w-full">
          <div className="relative w-[223px] h-[223px] max-md:h-[102px] max-md:w-[102px] rounded-full mt-10 overflow-hidden">
            {image ? (
              <img
                className="w-full h-full object-cover"
                src={image}
                alt="user"
              />
            ) : (
              <Image
                className="w-full h-full object-cover"
                src={rasmYuklash}
                alt="user"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="cursor-pointer absolute bottom-0 left-0 h-[38px] max-md:h-[30px] max-md:text-[10px] w-full bg-[#ffffffcd] text-lg text-logoKok flex items-center justify-center">
              {t("sozlamalar6")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;