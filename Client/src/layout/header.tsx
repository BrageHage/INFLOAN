import { jwtDecode } from "jwt-decode";
import LogoSvartTekst from "../assets/hamar-katedralskole.svg";
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
    <div className="bg-gray-100 w-full">
      <div className="flex w-full h-16 p-2 justify-between items-center font-sans mt-2">
        <div className="w-1/3 md:w-[33vw] cursor-pointer">
          <img
            src={LogoSvartTekst}
            className="h-12 md:h-16"
            onClick={() => {
              redirectUrl("/");
            }}
          />
        </div>
        <div className="hidden md:flex flex-row w-1/3 md:w-[33vw] justify-between text-center text-lg md:text-xl lg:text-2xl">
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
        <div className="flex items-center justify-end w-1/3 md:w-[33vw]">
          {username ? (
            <div
              className="flex items-center text-lg md:text-2xl cursor-pointer"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/LoggInn";
              }}
            >
              <p className="mr-2">{username}</p>
              <img src={logout} className="h-6 md:h-8 w-6 md:w-8" />
            </div>
          ) : (
            <button
              className="text-lg md:text-2xl cursor-pointer"
              onClick={() => {
                redirectUrl("/LoggInn");
              }}
            >
              Logg Inn
            </button>
          )}
        </div>
      </div>
      <div className="flex md:hidden justify-around w-full text-center text-lg mt-2">
        <button
          className="hover-border-b"
          disabled={!token}
          onClick={() => {
            redirectUrl("/Lan");
          }}
        >
          Lån
        </button>
        <button
          className="hover-border-b"
          disabled={!token}
          onClick={() => {
            redirectUrl("/Levering");
          }}
        >
          Lever
        </button>
        <button
          className="hover-border-b"
          disabled={!token}
          onClick={() => {
            redirectUrl("/");
          }}
        >
          Kontakt
        </button>
      </div>
      <hr className="w-full mt-3 bg-lightGreen h-1" />
    </div>
  );
};
