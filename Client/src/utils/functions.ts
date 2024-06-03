import inventoryJson from "../../public/inventoryData.json";

const getInventory = async () => {
  const response = await fetch("http://localhost:3000/api/v1/inventory/get");
  const inventory = await response.json();
  return inventory;
};

const updateInventory = async () => {
  const updatedInventory = inventoryJson.map((item: any, index: number) => {
    return {
      ...item,
      id: index + 1,
      rentedByUser: null,
    };
  });

  const response = await fetch(
    "http://localhost:3000/api/v1/inventory/upload",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inventoryJson: updatedInventory }),
    }
  );
  return response;
};

const registrerUser = async (username: string, password: string) => {
  const response = await fetch(
    "http://localhost:3000/api/v1/users/createuser",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );
  return response;
};

const login = async (username: string, password: string) => {
  const response = await fetch("http://localhost:3000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response;
};

const redirectUrl = (url: string) => {
  window.location.href = url;
};

export { getInventory, updateInventory, redirectUrl, registrerUser, login };
