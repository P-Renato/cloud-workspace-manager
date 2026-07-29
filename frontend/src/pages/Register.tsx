import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import styles from "../components/WorkspaceForm.module.css"

export default function Register() {
  const { register } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await register(email, password);
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <SectionTitle>Register</SectionTitle>

      <input
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        placeholder="Email"
        className={styles.input}

      />

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        placeholder="Password"
        className={styles.input}

      />
      <Card className={styles.cardSet}>
        <Button type="submit"  className={styles.btn}>
          Register
        </Button>
      </Card>
    </form>
  );
}