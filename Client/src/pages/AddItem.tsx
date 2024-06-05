import { useState, useEffect } from "react";
import { addItem } from "../utils/functions";
import ConfirmationComponent from "../components/confirmationComponent";

const AddItem = () => {
  const [newItem, setNewItem] = useState({
    Produsent: "",
    Beskrivelse: "",
    Spesifikasjoner: "",
    Innkjøpsdato: "",
    Innkjøpspris: "",
    "Forventet levetid (i år)": "",
    Kategori: "",
    rentedByUser: null,
  });
  const [confirmationMessages, setConfirmationMessages] = useState<
    { message: string; id: number }[]
  >([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/LoggInn";
    }
  }, []);

  useEffect(() => {
    if (confirmationMessages.length >= 0) {
      const timer = setTimeout(() => {
        setConfirmationMessages((prevMessages) => prevMessages.slice(1));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [confirmationMessages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") ?? "";
      await addItem(newItem, token);
      setConfirmationMessages((prevMessages) => [
        ...prevMessages,
        { message: "Item added successfully!", id: Date.now() },
      ]);
      setNewItem({
        Produsent: "",
        Beskrivelse: "",
        Spesifikasjoner: "",
        Innkjøpsdato: "",
        Innkjøpspris: "",
        "Forventet levetid (i år)": "",
        Kategori: "",
        rentedByUser: null,
      });
      setShowConfirmation(true);
      const timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4">
      {showConfirmation && (
        <ConfirmationComponent message="Enheten er lagt til!" />
      )}
      {confirmationMessages.map((message) => (
        <ConfirmationComponent
          key={message.id}
          message={message.message}
          position={message.id}
        />
      ))}
      <h1 className="text-4xl font-bold my-10">Legg til nytt element</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Produsent</label>
          <input
            type="text"
            name="Produsent"
            value={newItem.Produsent}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Beskrivelse</label>
          <input
            type="text"
            name="Beskrivelse"
            value={newItem.Beskrivelse}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Spesifikasjoner</label>
          <input
            type="text"
            name="Spesifikasjoner"
            value={newItem.Spesifikasjoner}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Innkjøpsdato</label>
          <input
            type="date"
            name="Innkjøpsdato"
            value={newItem.Innkjøpsdato}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Innkjøpspris</label>
          <input
            type="number"
            name="Innkjøpspris"
            value={newItem.Innkjøpspris}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Forventet levetid (i år)
          </label>
          <input
            type="number"
            name="Forventet levetid (i år)"
            value={newItem["Forventet levetid (i år)"]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Kategori</label>
          <input
            type="text"
            name="Kategori"
            value={newItem.Kategori}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-lightGreen hover:bg-white hover:text-lightGreen text-white rounded-lg py-2 border-2 border-lightGreen"
        >
          Legg til element
        </button>
      </form>
    </div>
  );
};

export default AddItem;
