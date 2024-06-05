import { useEffect } from "react";
import { RediredctButton } from "../components/redirectButton";
import { jwtDecode } from "jwt-decode";
import { updateInventory } from "../utils/functions";

function App() {
  const token = localStorage.getItem("token");
  let username = null;

  if (token) {
    const decoded = jwtDecode<{ username: string }>(token);
    username = decoded.username;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = "/LoggInn";
    }
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen bg-gray-100 mt-10">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold my-5 text-gray-800">
        INF Utlån av utstyr
      </h1>
      <div className="flex flex-col md:flex-row gap-8 mt-5">
        <RediredctButton url="/Lan" title="Lån" size="lg" />
        {username === "admin" && (
          <RediredctButton url="/LeggTilEnhet" title="Legg til" size="lg" />
        )}
        <RediredctButton url="/Levering" title="Lever" size="lg" />
      </div>
      {username === "admin" && (
        <button
          onClick={updateInventory}
          className="bg-green-700 w-30 h-30 text-white rounded-md mt-10 p-5"
        >
          Legg til demo data
        </button>
      )}
    </div>
  );
}

export default App;
