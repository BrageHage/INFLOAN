import { useEffect, useState } from "react";
import { getInventory, returnItem } from "../utils/functions";
import { jwtDecode } from "jwt-decode";

interface InventoryItem {
  id: string;
  description: string;
  rentedByUser: string;
}

export const Levering = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [userObjects, setUserObjects] = useState<InventoryItem[]>([]);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token ?? "") as { username: string };
  const username = decoded?.username;

  useEffect(() => {
    getInventory().then((data: InventoryItem[]) => {
      setInventory(data);
      console.log(inventory);
      let userFilteredObjects = data.filter(
        (object) => object.rentedByUser === username
      );
      setUserObjects(userFilteredObjects);
    });
  }, [username]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[32rem]">
      <h1 className="text-7xl my-10">Innlevering</h1>
      <div className="flex flex-col gap-4">
        {userObjects.length > 0 ? (
          userObjects.map((object) => (
            <div key={object.id} className="flex flex-row gap-4">
              <p>{object.description}</p>
              <button
                onClick={() => {
                  returnItem(object.description);
                  const newUserObjects = userObjects.filter(
                    (userObject) => userObject.id !== object.id
                  );
                  setUserObjects(newUserObjects);
                }}
                className="bg-darkGreen text-white rounded-sm w-8"
              >
                Return
              </button>
            </div>
          ))
        ) : (
          <p>Du har ingen ting å levere</p>
        )}
      </div>
    </div>
  );
};
