"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/api";

const CurrencyComponent = ({ amount, currency }) => {
  const [convertedAmount, setConvertedAmount] = useState("");
  const [rate, setRate] = useState(null);

  useEffect(() => {
    const fetchRate = async () => {
      const storedRate = localStorage.getItem("currencyRate");
      if (storedRate) {
        setRate(JSON.parse(storedRate));
      } else {
        try {
          const response = await api.get(
            "https://cbu.uz/uz/arkhiv-kursov-valyut/json/USD/"
          );
          const newRate = response.data[0]?.Rate || 0;
          localStorage.setItem("currencyRate", JSON.stringify(newRate));
          setRate(newRate);
        } catch (error) {
          console.error("Error fetching currency rate:", error);
        }
      }
    };

    fetchRate();
  }, []);

  useEffect(() => {
    if (rate !== null) {
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) {
        setConvertedAmount("Invalid amount");
        return;
      }

      if (currency === "USD") {
        setConvertedAmount(
          numericAmount.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })
        );
      } else if (currency === "UZS") {
        const converted = numericAmount / rate;
        setConvertedAmount(
          converted.toLocaleString("en-US", { maximumFractionDigits: 1 })
        );
      }
    }
  }, [amount, currency, rate]);

  return (
    <div>
      <p>
        {convertedAmount} {currency === "USD" ? "sum" : "$"}
      </p>
    </div>
  );
};

export default CurrencyComponent;
