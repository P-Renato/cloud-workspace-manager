import { useState } from "react";

interface WorkspaceFormProps {
  onCreate: (name: string, templateId: string) => Promise<void>;
}

export default function WorkspaceForm({
  onCreate,
}: WorkspaceFormProps) {
  const [name, setName] = useState("");
  const [ templateId, setTemplateId ] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    await onCreate(name, templateId);

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
      <select value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
        <option value="alpine">Alpine Linux</option>
        <option value="ubuntu">Ubuntu</option>
        <option value="node">Node.js</option>
        <option value="python312">Python</option>
      </select>

      <button type="submit">
        Create
      </button>
    </form>
  );
}