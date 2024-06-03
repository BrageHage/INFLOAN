import { jwtDecode } from "jwt-decode";
import LogoSvartTekst from "../assets/LogoSvartTekst.png";
import { redirectUrl } from "../utils/functions";
import logout from "../assets/logout.svg";

export const Header = () => {
  const token = localStorage.getItem("token");
  let username = null;

  if (token) {
    const decoded = jwtDecode<{ username: string }>(token);
    username = decoded.username;
  }

  return (
    <div>
      <div className="flex w-full h-16 p-2 justify-between font-sans">
        <div className="w-[33vw] cursor-pointer">
          <img
            src={LogoSvartTekst}
            className="h-16 "
            onClick={() => {
              redirectUrl("/");
            }}
          />
        </div>
        <div className="flex flex-row w-[33vw] justify-between text-center text-4xl">
          <button
            className="my-2 relative hover-border-b"
            disabled={!token}
            onClick={() => {
              redirectUrl("/Lan");
            }}
          >
            Lån
          </button>
          <button
            className="my-2 relative hover-border-b"
            disabled={!token}
            onClick={() => {
              redirectUrl("/Levering");
            }}
          >
            Lever
          </button>
          <button
            className="my-2 relative hover-border-b"
            disabled={!token}
            onClick={() => {
              redirectUrl("/");
            }}
          >
            Kontakt
          </button>
        </div>
        {username ? (
          <div
            className="flex flex-row h-14 w-[33vw] justify-end text-center items-center text-2xl mr-2 cursor-pointer"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <p>{username}</p>
            <img src={logout} />
          </div>
        ) : (
          <button
            className="flex flex-row h-14 w-[33vw] justify-end text-center items-center text-2xl mr-2 cursor-pointer"
            onClick={() => {
              redirectUrl("/LoggInn");
            }}
          >
            Logg Inn
          </button>
        )}
      </div>
      <hr className="w-full mt-3 bg-lightGreen h-1" />
    </div>
  );
};
