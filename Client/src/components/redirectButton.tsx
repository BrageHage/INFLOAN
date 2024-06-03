import { redirectUrl } from "../utils/functions";

type RedirectButtonProps = {
  url: string;
  title: string;
  size: string;
};

export const RediredctButton: React.FC<RedirectButtonProps> = ({
  url,
  title,
  size,
}) => {
  switch (size) {
    case "sm":
      return (
        <div className="">
          <button
            onClick={() => {
              redirectUrl(url);
            }}
            className=""
          >
            {title}
          </button>
        </div>
      );
    case "md":
      return (
        <div className="">
          <button
            onClick={() => {
              redirectUrl(url);
            }}
          >
            {title}
          </button>
        </div>
      );
    case "lg":
      return (
        <div className="w-48 bg-darkGreen h-48 rounded-md text-white border-darkGreen border-4 flex justify-center text-4xl hover:bg-white hover:text-darkGreen">
          <button
            onClick={() => {
              redirectUrl(url);
            }}
            className="h-48 w-48"
          >
            {title}
          </button>
        </div>
      );
  }
};
