import { useState, useEffect } from "react";
import { getInventory, loanItem } from "../utils/functions";

interface InventoryItem {
  description: string;
  rentedByUser: string | null;
  specifications: string;
  count: number;
}

const Loan = () => {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [countInventory, setCountInventory] = useState<
    Record<string, InventoryItem>
  >({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showSpecifications, setShowSpecifications] = useState<string | null>(
    null
  );

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getInventory().then((data) => {
      setInventory(inventory);
      const initialCountInventory = data.reduce(
        (
          acc: { [key: string]: { count: number; specifications: string } },
          curr: {
            description: string;
            rentedByUser: any;
            specifications: string;
          }
        ) => {
          if (curr.rentedByUser === null)
            acc[curr.description] = {
              count: (acc[curr.description]?.count || 0) + 1,
              specifications: curr.specifications,
            };
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

  const toggleSpecifications = (description: string) => {
    setShowSpecifications((prev) =>
      prev === description ? null : description
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-screen p-4">
      <h1 className="text-4xl font-bold my-10">Utleie</h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search descriptions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 rounded-lg shadow-sm"
        />
      </div>
      <div className="flex flex-wrap justify-center w-full max-w-4xl">
        {Object.entries(countInventory)
          .filter(([description]) =>
            description.toLowerCase().includes(search.toLowerCase())
          )
          .map(([description, { count, specifications }], index) => (
            <div key={index} className="w-full sm:w-1/2 p-2">
              <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
                <div className="flex justify-between items-center">
                  <div className="text-gray-800">
                    <p className="font-semibold">{description}</p>
                    <p className="text-gray-500">Antall igjen: {count}</p>
                  </div>
                  <button
                    className={`ml-3 mt-2 ${
                      count === 0 ? "bg-red-700" : "bg-green-700"
                    } text-white rounded-sm px-4 py-2`}
                    onClick={() => {
                      if (checkToken() && count > 0) {
                        loanItem(description);
                        setCountInventory((prevCountInventory) => ({
                          ...prevCountInventory,
                          [description]: {
                            ...prevCountInventory[description],
                            count: prevCountInventory[description].count - 1,
                          },
                        }));
                      }
                    }}
                    disabled={count === 0}
                  >
                    {count === 0 ? "Utlånt" : "Lån"}
                  </button>
                </div>
                <button
                  className="text-blue-500 mt-2"
                  onClick={() => toggleSpecifications(description)}
                >
                  {showSpecifications === description
                    ? "Vis mindre informasjon"
                    : "Vis mer informasjon"}
                </button>
                {showSpecifications === description && (
                  <p className="text-gray-500 mt-2">
                    Spesifikasjoner: {specifications}
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Loan;
