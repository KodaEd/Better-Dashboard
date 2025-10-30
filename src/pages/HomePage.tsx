import { Button } from "@/components/ui/button";
import { invoke } from "@tauri-apps/api/core";

export default function Home() {
  const handleGetTickets = async () => {
    try {
      await invoke("get_jira_tickets");
      console.log("Tickets fetched successfully");
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleGetTickets}>Get Jira Tickets</Button>
    </div>
  );
}
