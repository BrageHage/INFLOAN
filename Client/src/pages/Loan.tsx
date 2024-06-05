import { useState, useEffect } from "react";
import { deleteItems, getInventory, loanItem } from "../utils/functions";
import ConfirmationComponent from "../components/confirmationComponent";
import { jwtDecode } from "jwt-decode";

interface InventoryItem {
  description: string;
  rentedByUser: string | null;
  specifications: string;
  count: number;
}

const Loan = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [countInventory, setCountInventory] = useState<
    Record<string, { count: number; specifications: string }>
  >({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showSpecifications, setShowSpecifications] = useState<string | null>(
    null
  );
  const [confirmationMessages, setConfirmationMessages] = useState<
    { message: string; id: number }[]
  >([]);
  let username = null;

  const fetchInventory = async () => {
    try {
      const data = await getInventory();
      setInventory(data);
      console.log(inventory);
      const initialCountInventory = data.reduce(
        (
          acc: { [key: string]: { count: number; specifications: string } },
          curr: {
            description: string;
            rentedByUser: any;
            specifications: string;
          }
        ) => {
          if (curr && curr.rentedByUser === null)
            acc[curr.description] = {
              count: (acc[curr.description]?.count || 0) + 1,
              specifications: curr.specifications,
            };
          return acc;
        },
        {}
      );
      setCountInventory(initialCountInventory);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    fetchInventory();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/LoggInn";
    }
  }, []);

  useEffect(() => {
    if (confirmationMessages.length > 0) {
      const timer = setTimeout(() => {
        setConfirmationMessages((prevMessages) => prevMessages.slice(1));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [confirmationMessages]);

  const checkToken = () => {
    if (token === null) {
      alert("You need to be logged in to loan items");
      return false;
    }
    return true;
  };

  if (token) {
    const decoded = jwtDecode<{ username: string }>(token);
    username = decoded.username;
  }

  const toggleSpecifications = (description: string) => {
    setShowSpecifications((prev) =>
      prev === description ? null : description
    );
  };

  const handleLoan = (description: string) => {
    if (checkToken() && countInventory[description]?.count > 0) {
      loanItem(description).then(() => {
        setConfirmationMessages((prevMessages) => [
          ...prevMessages,
          { message: `${description} er nå lånt!`, id: Date.now() },
        ]);
        setCountInventory((prevCountInventory) => ({
          ...prevCountInventory,
          [description]: {
            ...prevCountInventory[description],
            count: prevCountInventory[description].count - 1,
          },
        }));
      });
    }
  };

  const handleDelete = async (description: string) => {
    try {
      await deleteItems(description);
      fetchInventory();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4">
      {confirmationMessages.map((message, index) => (
        <ConfirmationComponent
          key={message.id}
          message={message.message}
          position={index}
        />
      ))}
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
                  <div className="flex justify-center flex-row gap-3">
                    <button
                      className={`ml-3 ${
                        count === 0 ? "bg-red-700" : "bg-green-700"
                      } text-white rounded-sm px-4 py-2`}
                      onClick={() => handleLoan(description)}
                      disabled={count === 0}
                    >
                      {count === 0 ? "Utlånt" : "Lån"}
                    </button>
                    {username === "admin" && (
                      <button
                        onClick={() => handleDelete(description)}
                        className="text-white bg-red-600 hover:bg-red-700 rounded-sm px-4 py-2"
                      >
                        Slett
                      </button>
                    )}
                  </div>
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
