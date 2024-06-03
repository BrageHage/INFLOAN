import { useState, useEffect } from "react";
import { getInventory, loanItem } from "../utils/functions";

const Loan = () => {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [countInventory, setCountInventory] = useState<{
    [key: string]: number;
  }>({});
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getInventory().then((data) => {
      setInventory(data);
      const initialCountInventory = data.reduce(
        (
          acc: { [key: string]: number },
          curr: { description: string; rentedByUser: any }
        ) => {
          if (curr.rentedByUser === null)
            acc[curr.description] = (acc[curr.description] || 0) + 1;
          return acc;
        },
        {}
      );
      setCountInventory(initialCountInventory);
    });
  }, []);

  const checkToken = () => {
    if (token === null) {
      alert("You need to be logged in to loan items");
      return false;
    }
    return true;
  };

  return (
    <div>
      <h1>Loans</h1>
      <input
        type="text"
        placeholder="Search descriptions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {Object.entries(countInventory)
        .filter(([description]) =>
          description.toLowerCase().includes(search.toLowerCase())
        )
        .map(([description, count], index) => (
          <p key={index}>
            {description} - {count}
            <button
              className="ml-3 bg-darkGreen text-white rounded-sm w-8"
              onClick={() => {
                if (checkToken()) {
                  loanItem(description);
                  setCountInventory((prevCountInventory) => ({
                    ...prevCountInventory,
                    [description]: prevCountInventory[description] - 1,
                  }));
                }
              }}
            >
              Lån
            </button>
          </p>
        ))}
    </div>
  );
};

export default Loan;
