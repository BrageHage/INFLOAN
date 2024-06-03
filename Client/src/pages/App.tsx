import { RediredctButton } from "../components/redirectButton";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-[32rem] bg-lightGray">
        <h1 className="text-7xl my-10">INF Utlån av utstyr</h1>
        <div className="flex flex-row gap-24 mt-20">
          <RediredctButton url="/Lån" title="Lån" size="lg" />
          <RediredctButton url="/Levering" title="Lever" size="lg" />
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="text-xl w-[40rem] text-center mt-24">
          Her på vår utlånsside kan du enkelt finne og låne det utstyret du
          trenger for dine skoleprosjekter og oppgaver. Enten du trenger en
          bærbar PC, et kamera, programvare eller annet teknisk utstyr, er vi
          her for å gjøre det enklere for deg å få tilgang til nødvendige
          ressurser.
        </h1>
      </div>
    </>
  );
}

export default App;
