import inventoryJson from "../../public/inventoryData.json";

const token = localStorage.getItem("token");

const getInventory = async () => {
  const response = await fetch("http://10.0.0.190/api/v1/inventory/get");
  const inventory = await response.json();
  return inventory;
};

const deleteItems = async (description: string) => {
  const response = await fetch("http://10.0.0.190/api/v1/inventory/delete", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description, token }),
  });
  return response;
};

const updateInventory = async () => {
  const updatedInventory = inventoryJson.map((item: any, index: number) => {
    return {
      ...item,
      id: index + 1,
      rentedByUser: null,
    };
  });

  const response = await fetch("http://10.0.0.190/api/v1/inventory/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inventoryJson: updatedInventory }),
  });
  return response;
};

const addItem = async (item: any, token: string) => {
  const response = await fetch("http://10.0.0.190/api/v1/inventory/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item, token }),
  });
  return response;
};

const registrerUser = async (username: string, password: string) => {
  const response = await fetch("http://10.0.0.190/api/v1/users/createuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response;
};

const login = async (username: string, password: string) => {
  const response = await fetch("http://10.0.0.190/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  const token = data.token;
  localStorage.setItem("token", token);

  return response;
};

const loanItem = async (description: string) => {
  const response = await fetch("http://10.0.0.190/api/v1/inventory/loan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description, token }),
  });
  return response;
};

const returnItem = async (description: string) => {
  const response = await fetch("http://10.0.0.190/api/v1/inventory/return", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description, token }),
  });
  return response;
};

const redirectUrl = (url: string) => {
  window.location.href = url;
};

export {
  getInventory,
  updateInventory,
  redirectUrl,
  registrerUser,
  login,
  loanItem,
  returnItem,
  deleteItems,
  addItem,
};
