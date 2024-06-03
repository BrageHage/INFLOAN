const getInventory = async () => {
  const response = await fetch("/inventoryData.json");
  const inventory = await response.json();
  console.log(inventory);
  return inventory;
};

export { getInventory };
