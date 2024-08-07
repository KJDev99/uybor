"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/api";

const CurrencyComponent = ({ amount, currency }) => {
  const [convertedAmount, setConvertedAmount] = useState("");

  useEffect(() => {
    const convertCurrency = async () => {
      try {
        // Convert amount to number
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount)) {
          setConvertedAmount("Invalid amount");
          return;
        }

        let rate;
        const response = await api.get(
          "https://cbu.uz/uz/arkhiv-kursov-valyut/json/USD/"
        );
        if (currency === "USD") {
          rate = response.data[0]?.Rate || 0;
          const converted = numericAmount;
          setConvertedAmount(
            converted.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })
          );
        } else if (currency === "UZS") {
          rate = response.data[0]?.Rate || 0;
          const converted = numericAmount / rate;
          setConvertedAmount(
            converted.toLocaleString("en-US", { maximumFractionDigits: 1 })
          );
        }
      } catch (error) {
        console.error("Error converting currency:", error);
        setConvertedAmount("Error");
      }
    };

    convertCurrency();
  }, [amount, currency]);

  return (
    <div>
      <p>
        {convertedAmount} {currency === "USD" ? "sum" : "$"}
      </p>
    </div>
  );
};

export default CurrencyComponent;
