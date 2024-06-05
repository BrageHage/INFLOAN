import { useEffect, useState } from "react";
import { getInventory, returnItem } from "../utils/functions";
import { jwtDecode } from "jwt-decode";
import ConfirmationComponent from "../components/confirmationComponent";

interface InventoryItem {
  id: string;
  description: string;
  rentedByUser: string | null;
}

export const Levering = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [userObjects, setUserObjects] = useState<InventoryItem[]>([]);
  const [confirmationMessages, setConfirmationMessages] = useState<
    { message: string; id: number }[]
  >([]);

  const token = localStorage.getItem("token");
  let username = "";

  if (token) {
    const decoded = jwtDecode<{ username: string }>(token);
    username = decoded.username;
  }

  useEffect(() => {
    if (!token) {
      window.location.href = "/LoggInn";
      return;
    }
    console.log("fetching inventory", inventory);
    const fetchInventory = async () => {
      try {
        const data = await getInventory();
        setInventory(data);
        const userFilteredObjects = data.filter(
          (object: { rentedByUser: string }) =>
            object && object.rentedByUser === username
        );
        setUserObjects(userFilteredObjects);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
      }
    };

    fetchInventory();
  }, [token, username]);

  useEffect(() => {
    if (confirmationMessages.length > 0) {
      const timer = setTimeout(() => {
        setConfirmationMessages((prevMessages) => prevMessages.slice(1));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [confirmationMessages]);

  const handleReturn = async (object: InventoryItem) => {
    try {
      await returnItem(object.description);
      setConfirmationMessages((prevMessages) => [
        ...prevMessages,
        {
          message: `${object.description} er nå levert!`,
          id: Date.now(),
        },
      ]);
      setUserObjects((prevUserObjects) =>
        prevUserObjects.filter((userObject) => userObject.id !== object.id)
      );
    } catch (error) {
      console.error("Failed to return item:", error);
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
      <h1 className="text-4xl font-bold my-10">Innlevering</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
        {userObjects.length > 0 ? (
          userObjects.map((object) => (
            <div
              key={object.id}
              className="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
            >
              <p className="text-gray-800 font-semibold">
                {object.description}
              </p>
              <button
                onClick={() => handleReturn(object)}
                className="ml-3 mt-2 bg-red-700 text-white rounded-sm px-4 py-2"
              >
                Returner
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Du har ingen ting å levere</p>
        )}
      </div>
    </div>
  );
};
