import { useState } from "react";

interface WorkspaceFormProps {
  onCreate: (name: string) => Promise<void>;
}

export default function WorkspaceForm({
  onCreate,
}: WorkspaceFormProps) {
  const [name, setName] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    await onCreate(name);

    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Workspace</h2>

      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Workspace name"
      />

      <button type="submit">
        Create
      </button>
    </form>
  );
}