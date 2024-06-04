import { useState } from "react";
import { login, registrerUser } from "../utils/functions";
import ConfirmationComponent from "../components/confirmationComponent";

export const RegistrerLogin = () => {
  const [makeUser, setMakeUser] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRegister = async () => {
    if (password === repeatPassword && password !== "" && username !== "") {
      try {
        const status = await registrerUser(username, password);
        if (status.status === 200 || status.status === 201) {
          setShowConfirmation(true);
          console.log(showConfirmation);
          const timer = setTimeout(() => {
            window.location.reload();
            setShowConfirmation(false);
          }, 1500);
          return () => clearTimeout(timer);
        } else {
          console.error(`Error: ${status.statusText}`);
        }
      } catch (error) {
        console.error("An error occurred during registration.");
      }
    } else {
      console.error("Passordene er ikke like");
    }
  };

  const handleLogin = async () => {
    if (username === "" || password === "") {
      console.error("Fyll ut alle feltene");
      return;
    } else {
      try {
        const response = await login(username, password);
        if (response.status === 200 || response.status === 201) {
          window.location.href = "/";
        } else {
          console.error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error("An error occurred during login.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen p-4 mt-8">
      {showConfirmation && (
        <ConfirmationComponent message="Brukeren er blitt oprettet!" />
      )}
      {makeUser ? (
        <>
          <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold mb-6">Registrer deg her</h1>
            <input
              type="text"
              placeholder="Brukernavn"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm"
            />
            <input
              type="password"
              placeholder="Passord"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm"
            />
            <input
              type="password"
              placeholder="Gjenta passord"
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm"
            />
            <button
              onClick={handleRegister}
              className="w-full bg-green-700 text-white rounded-lg py-2"
            >
              Send inn
            </button>
          </div>
          <p
            className="text-blue-500 mt-4 cursor-pointer"
            onClick={() => {
              setMakeUser(false);
            }}
          >
            Har du allerede bruker? Klikk her
          </p>
        </>
      ) : (
        <>
          <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold mb-6">Logg inn her</h1>
            <input
              type="text"
              placeholder="Brukernavn"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm"
            />
            <input
              type="password"
              placeholder="Passord"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-green-700 text-white rounded-lg py-2"
            >
              Send inn
            </button>
          </div>
          <p
            className="text-blue-500 mt-4 cursor-pointer"
            onClick={() => {
              setMakeUser(true);
            }}
          >
            Har du ikke bruker? Klikk her
          </p>
        </>
      )}
    </div>
  );
};
