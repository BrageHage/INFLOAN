import { RediredctButton } from "../components/redirectButton";

function App() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[32rem]">
      <h1 className="text-7xl my-10">INF Utlån av utstyr</h1>
      <div className="flex flex-row gap-24 mt-20">
        <RediredctButton url="/Lån" title="Lån" size="lg" />
        <RediredctButton url="/Levering" title="Lever" size="lg" />
      </div>
    </div>
  );
}

export default App;
