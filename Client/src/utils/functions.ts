import inventoryJson from "../../public/inventoryData.json";

const getInventory = async () => {
  const response = await fetch("http://localhost:3000/api/v1/inventory/get");
  const inventory = await response.json();
  return inventory;
};

const updateInventory = async () => {
  const response = await fetch(
    "http://localhost:3000/api/v1/inventory/upload",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inventoryJson }),
    }
  );
  return response;
};

export { getInventory, updateInventory };
