import { useState } from "react";
import Button from "../ui/Button";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import styles from "./WorkspaceForm.module.css";

interface WorkspaceFormProps {
  onCreate: (name: string) => Promise<void>;
}

export default function WorkspaceForm({
  onCreate,
}: WorkspaceFormProps) {
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a workspace name.");
      return;
    }

    await onCreate(name);

    setName("");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Card>
        <fieldset className={styles.fieldset}>
          <SectionTitle>
            Create Workspace
          </SectionTitle>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Workspace name"
            className={styles.input}
          />

          <Button
            type="submit"
            className={styles.btn}
          >
            Create Ubuntu Workspace
          </Button>
        </fieldset>
      </Card>
    </form>
  );
}