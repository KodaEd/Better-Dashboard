import { Button } from "./ui/button";
import { FaBitbucket } from "react-icons/fa";
import { SiJira } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <FaBitbucket className="text-2xl" />
        <SiJira className="text-2xl" />
      </div>
      <Button>
        <IoSettingsSharp className="text-2xl" />
      </Button>
    </div>
  );
}
