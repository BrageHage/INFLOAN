import { useEffect } from "react";
import { RediredctButton } from "../components/redirectButton";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = "/LoggInn";
    }
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-full h-[32rem]">
      <h1 className="text-7xl my-10">INF Utlån av utstyr</h1>
      <div className="flex flex-row gap-24 mt-20">
        <RediredctButton url="/Lan" title="Lån" size="lg" />
        <RediredctButton url="/Levering" title="Lever" size="lg" />
      </div>
    </div>
  );
}

export default App;
