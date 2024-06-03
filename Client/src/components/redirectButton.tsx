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
  const buttonStyles = {
    sm: "w-24 h-24 text-lg",
    md: "w-36 h-36 text-2xl",
    lg: "w-48 h-48 text-4xl",
  };

  return (
    <div
      className={`bg-green-700 rounded-md text-white border-green-700 border-4 flex justify-center items-center hover:bg-white hover:text-green-700 ${buttonStyles[size]}`}
    >
      <button
        onClick={() => {
          redirectUrl(url);
        }}
        className={`h-full w-full ${buttonStyles[size]}`}
      >
        {title}
      </button>
    </div>
  );
};
