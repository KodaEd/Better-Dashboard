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

const fetchDomain = async () => {
  const store = await load("settings.json");
  const domain = (await store.get("domain")) || "";
  return domain as string;
};

const fetchEmail = async () => {
  const store = await load("settings.json");
  const email = (await store.get("email")) || "";
  return email as string;
};

const fetchSearchQuery = async () => {
  const store = await load("settings.json");
  const searchQuery = (await store.get("searchQuery")) || "";
  return searchQuery as string;
};

const fetchQueryPolling = async () => {
  const store = await load("settings.json");
  const queryPolling = (await store.get("queryPolling")) || "";
  return queryPolling as string;
};

const fetchEnablePolling = async () => {
  const store = await load("settings.json");
  const enablePolling = (await store.get("enablePolling")) || false;
  return enablePolling as boolean;
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

function DomainInput() {
  const { data: domain, mutate } = useSWR("domain", fetchDomain, {
    suspense: true,
  });

  const [value, setValue] = useState(domain || "");

  const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const store = await load("settings.json");
    await store.set("domain", newValue);
    await mutate();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="e.g., yourcompany.atlassian.net"
    />
  );
}

function EmailInput() {
  const { data: email, mutate } = useSWR("email", fetchEmail, {
    suspense: true,
  });

  const [value, setValue] = useState(email || "");

  const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const store = await load("settings.json");
    await store.set("email", newValue);
    await mutate();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Input
      type="email"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Enter your email"
    />
  );
}

function SearchQueryInput() {
  const { data: searchQuery, mutate } = useSWR("searchQuery", fetchSearchQuery, {
    suspense: true,
  });

  const [value, setValue] = useState(searchQuery || "");

  const handleBlur = async (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    const store = await load("settings.json");
    await store.set("searchQuery", newValue);
    await mutate();
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <Textarea
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Enter your search query"
    />
  );
}

function QueryPollingInput() {
  const { data: queryPolling, mutate } = useSWR("queryPolling", fetchQueryPolling, {
    suspense: true,
  });

  const [value, setValue] = useState(queryPolling || "");

  const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const store = await load("settings.json");
    await store.set("queryPolling", newValue);
    await mutate();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Input
      type="number"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Enter polling interval in seconds"
    />
  );
}

function EnablePollingCheckbox() {
  const { data: enablePolling, mutate } = useSWR("enablePolling", fetchEnablePolling, {
    suspense: true,
  });

  const handleChange = async (checked: boolean) => {
    const store = await load("settings.json");
    await store.set("enablePolling", checked);
    await mutate();
  };

  return (
    <Checkbox
      checked={enablePolling}
      onCheckedChange={handleChange}
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

        <H3>Domain:</H3>
        <Suspense fallback={<Spinner className="size-6" />}>
          <DomainInput />
        </Suspense>

        <H3>Email:</H3>
        <Suspense fallback={<Spinner className="size-6" />}>
          <EmailInput />
        </Suspense>

        <H3>Search Query:</H3>
        <Suspense fallback={<Spinner className="size-6" />}>
          <SearchQueryInput />
        </Suspense>

        <div className="flex items-center gap-2">
          <H3>Query Polling (seconds):</H3>
          <Suspense fallback={<Spinner className="size-6" />}>
            <EnablePollingCheckbox />
          </Suspense>
        </div>
        <Suspense fallback={<Spinner className="size-6" />}>
          <QueryPollingInput />
        </Suspense>
      </div>
    </div>
  );
}
