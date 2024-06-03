import LogoSvartTekst from "../assets/LogoSvartTekst.png";
import { redirectUrl } from "../utils/functions";

export const Header = () => {
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
          <button className="m-2">Lån</button>
          <button className="m-2">Lever</button>
          <button className="m-2">Kontakt</button>
        </div>
      </div>
      <hr className="w-full mt-3 bg-lightGreen h-1" />
    </>
  );
};
