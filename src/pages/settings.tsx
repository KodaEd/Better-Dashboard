import { PasswordInput } from "@/components/ui/password-input";
import { H1, H3 } from "@/components/ui/typography";
import { load } from "@tauri-apps/plugin-store";
import { useCallback, useState } from "react";

export default function Settings() {
  const saveApiKey = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const apiKey = event.target.value;
    const store = await load("settings.json");
    store.set("apiKey", apiKey);
  };

  return (
    <div>
      <div className="flex flex-col gap-2 w-1/2">
        <H3>Api Key:</H3>
        <PasswordInput onBlur={saveApiKey} placeholder="Enter your password" />
      </div>
    </div>
  );
}
