"use client"; // Ushbu qatorni qo'shing

import { Provider } from "react-redux";
import store from "@/store";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import i18n from "@/i18n";
import { I18nextProvider } from "react-i18next";

// import { useRouter } from "next/router";

const ClientProvider = ({ children }) => {
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "uz"; // Default to 'uz' if no language is stored
    i18n.changeLanguage(storedLanguage);
  }, []);
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Provider>
  );
};

export default ClientProvider;
