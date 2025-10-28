import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import { H3 } from "@/components/ui/typography";
import { load } from "@tauri-apps/plugin-store";
import { Suspense, useState } from "react";
import useSWR from "swr";

const fetchApiKey = async () => {
  const store = await load("settings.json");
  const apiKey = (await store.get("apiKey")) || "";
  return apiKey as string;
};

function ApiKeyInput() {
  const { data: apiKey, mutate } = useSWR("apiKey", fetchApiKey, {
    suspense: true,
  });

  const [value, setValue] = useState(apiKey || "");

  const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const store = await load("settings.json");
    await store.set("apiKey", newValue);
    await mutate();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <PasswordInput
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Enter your API key"
    />
  );
}

export default function Settings() {
  return (
    <div>
      <div className="flex flex-col gap-2 w-1/2">
        <H3>Api Key:</H3>
        <Suspense fallback={<Spinner className="size-6" />}>
          <ApiKeyInput />
        </Suspense>
      </div>
    </div>
  );
}
