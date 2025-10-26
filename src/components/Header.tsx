import { Button } from "./ui/button";
import { FaBitbucket } from "react-icons/fa";
import { SiJira } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";
import { useLocation } from "wouter";

export default function Header() {
  const [_location, navigate] = useLocation();

  const handleBitbucketClick = () => {
    console.log("Bitbucket clicked");
  };
  const handleJiraClick = () => {
    console.log("Jira clicked");
  };
  const handleSettingsClick = () => {
    navigate("/settings");
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={handleBitbucketClick}>
          <FaBitbucket />
        </Button>
        <Button variant="ghost" onClick={handleJiraClick}>
          <SiJira />
        </Button>
      </div>
      <Button variant="ghost" onClick={handleSettingsClick}>
        <IoSettingsSharp />
      </Button>
    </div>
  );
}
