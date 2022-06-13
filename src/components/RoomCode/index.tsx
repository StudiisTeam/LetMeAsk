import toast, { Toaster } from "react-hot-toast";
import { BiCopy } from "react-icons/bi";

type RoomCodeProps = {
  code: string;
};

function RoomCode(props: RoomCodeProps) {
  const notify = () => toast("Copied.");

  function copyRoomCode() {
    navigator.clipboard.writeText(props.code);
    notify();
  }
  return (
    <button
      onClick={copyRoomCode}
      className="bg-transparent border-[1px] h-11 pr-4 items-center border-purple-600 flex gap-4 rounded-lg"
    >
      <div className="h-full flex justify-center items-center w-12 bg-purple-600">
        <BiCopy size={20} />
        <Toaster />
      </div>
      Sala {props.code}
    </button>
  );
}

export default RoomCode;
