import React, { useState, useEffect } from "react";
import { getInventory } from "../utils/functions";

const Loan = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    getInventory().then((data) => {
      setInventory(data);
    });
  }, []);

  const uniqueCategories = [...new Set(inventory.map((item) => item.Kategori))];

  return (
    <div>
      <h1>Loans</h1>
      {uniqueCategories.map((category, index) => (
        <p key={index}>{category}</p>
      ))}
    </div>
  );
};

export default Loan;
