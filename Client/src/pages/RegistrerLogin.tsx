import { useState } from "react";
import { login, registrerUser } from "../utils/functions";

export const RegistrerLogin = () => {
  const [makeUser, setMakeUser] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    if (password === repeatPassword && password !== "" && username !== "") {
      const status = await registrerUser(username, password);
      if (status.status === 200) {
        window.location.href = "/";
      }
    } else {
      alert("Passordene er ikke like");
    }
  };

  const handleLogin = async () => {
    if (username === "" || password === "") {
      alert("Fyll ut alle feltene");
      return;
    } else {
      const response = await login(username, password);
      if (response.status === 200) {
        window.location.href = "/";
      }
    }
  };

  if (makeUser)
    return (
      <>
        <div>
          <h1>Regisrer deg her</h1>
          <input
            type="text"
            placeholder="Brukernavn"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passord"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Gjenta passord"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Send inn</button>
        </div>
        <p
          onClick={() => {
            setMakeUser(true);
          }}
        >
          Har du ikke bruker? Click her
        </p>
      </>
    );

  return (
    <>
      <div>
        <h1>Logg inn her</h1>
        <input
          type="text"
          placeholder="Brukernavn"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passord"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Send inn</button>
      </div>
      <p
        onClick={() => {
          setMakeUser(false);
        }}
      >
        Har du allerede bruker? Click her
      </p>
    </>
  );
};
