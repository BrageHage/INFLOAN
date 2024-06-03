import React, { useState, useEffect } from "react";
import { getInventory } from "../utils/functions";

const Loan = () => {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getInventory().then((data) => {
      setInventory(data);
    });
  }, []);

  const filteredInventory = inventory.filter((item: { description: string }) =>
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  const countInventory = filteredInventory.reduce(
    (acc: { [key: string]: number }, curr) => {
      if (curr.rentedByUser === null)
        acc[curr.description] = (acc[curr.description] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div>
      <h1>Loans</h1>
      <input
        type="text"
        placeholder="Search descriptions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {Object.entries(countInventory).map(([description, count], index) => (
        <p key={index}>
          {description} - {count}
        </p>
      ))}
    </div>
  );
};

export default Loan;
