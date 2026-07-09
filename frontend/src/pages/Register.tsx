import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

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
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>

      <input
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        placeholder="Password"
      />

      <button type="submit">
        Register
      </button>
    </form>
  );
}