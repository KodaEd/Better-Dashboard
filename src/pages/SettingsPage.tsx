import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
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
  const [domain, setDomain] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [queryPolling, setQueryPolling] = useState("");
  const [enablePolling, setEnablePolling] = useState(false);

  const handleDomainBlur = async (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const store = await load("settings.json");
    await store.set("domain", value);
  };

  const handleSearchQueryBlur = async (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const store = await load("settings.json");
    await store.set("searchQuery", value);
  };

  const handleQueryPollingBlur = async (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const store = await load("settings.json");
    await store.set("queryPolling", value);
  };

  const handleEnablePollingChange = async (checked: boolean) => {
    setEnablePolling(checked);
    const store = await load("settings.json");
    await store.set("enablePolling", checked);
  };

  return (
    <div>
      <div className="flex flex-col gap-2 w-1/2">
        <H3>Api Key:</H3>
        <Suspense fallback={<Spinner className="size-6" />}>
          <ApiKeyInput />
        </Suspense>

        <H3>Domain:</H3>
        <Input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onBlur={handleDomainBlur}
          placeholder="e.g., yourcompany.atlassian.net"
        />

        <H3>Search Query:</H3>
        <Textarea
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onBlur={handleSearchQueryBlur}
          placeholder="Enter your search query"
        />

        <div className="flex items-center gap-2">
          <H3>Query Polling (seconds):</H3>
          <Checkbox
            checked={enablePolling}
            onCheckedChange={handleEnablePollingChange}
          />
        </div>
        <Input
          type="number"
          value={queryPolling}
          onChange={(e) => setQueryPolling(e.target.value)}
          onBlur={handleQueryPollingBlur}
          placeholder="Enter polling interval in seconds"
        />
      </div>
    </div>
  );
}
