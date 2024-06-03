import { useEffect, useState } from "react";
import { getInventory, returnItem } from "../utils/functions";
import { jwtDecode } from "jwt-decode";

export const Levering = ({}) => {
  const [inventory, setInventory] = useState([]);
  const [userObjects, setUserObjects] = useState([]);

  let token = localStorage.getItem("token") as string; // Add type assertion here
  let decoded = jwtDecode(token);
  let username = decoded?.username;

  useEffect(() => {
    getInventory().then((data) => {
      setInventory(data);
      console.log(inventory);
      let userFilteredObjects = (data as { rentedByUser: string }[]).filter(
        (object) => object.rentedByUser === username
      );
      setUserObjects(userFilteredObjects);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[32rem]">
      <h1 className="text-7xl my-10">Innlevering</h1>
      <div className="flex flex-col gap-4">
        {userObjects.length > 0 ? (
          userObjects.map((object, index) => (
            <div key={object.id} className="flex flex-row gap-4">
              <p>{object.description}</p>
              <button
                onClick={() => {
                  returnItem(object.description);
                  // Filter out the clicked object
                  const newUserObjects = userObjects.filter(
                    (userObject) => userObject.id !== object.id
                  );
                  // Update the state
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
