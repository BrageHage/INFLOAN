import { jwtDecode } from "jwt-decode";
import LogoSvartTekst from "../assets/LogoSvartTekst.png";
import { redirectUrl } from "../utils/functions";

export const Header = () => {
  const token = localStorage.getItem("token");
  let username = null;

  if (token) {
    const decoded = jwtDecode<{ username: string }>(token);
    username = decoded.username;
  }

  return (
    <>
      <div className="flex w-full h-16 p-2 ">
        <img
          src={LogoSvartTekst}
          className="absolute h-16"
          onClick={() => {
            redirectUrl("/");
          }}
        />
        <div className="flex flex-row w-full justify-center text-center">
          <button
            className="m-2"
            disabled={!token}
            onClick={() => {
              redirectUrl("/Lan");
            }}
          >
            Lån
          </button>
          <button
            className="m-2"
            disabled={!token}
            onClick={() => {
              redirectUrl("/Levering");
            }}
          >
            Lever
          </button>
          <button
            className="m-2"
            disabled={!token}
            onClick={() => {
              redirectUrl("/Kontakt");
            }}
          >
            Kontakt
          </button>
        </div>
        {username ? (
          <div>
            <p>{username}</p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            className="w-24"
            onClick={() => {
              redirectUrl("/LoggInn");
            }}
          >
            Logg Inn
          </button>
        )}
      </div>
      <hr className="w-full mt-3 bg-lightGreen h-1" />
    </>
  );
};
