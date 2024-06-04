import { FcCheckmark } from "react-icons/fc";

type ConfirmationComponentProps = {
  message: string;
  position: number; // New prop to control the position
};

const ConfirmationComponent: React.FC<ConfirmationComponentProps> = ({
  message,
  position,
}) => {
  return (
    <div
      className="fixed right-20 bg-green-200 p-2 rounded-md flex items-center animate-fadeIn"
      style={{ bottom: `${20 + position * 60}px` }}
    >
      <FcCheckmark className="mr-2" />
      <span className="text-green-800">{message}</span>
    </div>
  );
};

export default ConfirmationComponent;
