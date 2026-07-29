import { useState } from "react";
import Button from "./ui/Button";
import SectionTitle from "./ui/SectionTitle";
import styles from "./WorkspaceForm.module.css"

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <fieldset className={styles.fieldset}>
        <SectionTitle>
          Create Workspace
        </SectionTitle> 

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Workspace name"
          className={styles.input}
        />
        <select value={templateId} onChange={(e) => setTemplateId(e.target.value)} className={styles.select}>
          <option value="alpine">Alpine Linux</option>
          <option value="ubuntu">Ubuntu</option>
          <option value="node">Node.js</option>
          <option value="python312">Python</option>
        </select>

        <Button type="submit" className={styles.btn} >
          Create New Workspace
        </Button>

      </fieldset>
    </form>
  );
}