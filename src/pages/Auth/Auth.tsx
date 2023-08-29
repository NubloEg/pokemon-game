import React, { useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [profile, setProfile] = useState<{ login: string; password: string }>({
    login: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <form>
      <h1>Вход</h1>
      <input
        value={profile.login}
        onChange={(e) =>
          setProfile({ login: e.target.value, password: profile.password })
        }
      />
      <input
        value={profile.password}
        onChange={(e) =>
          setProfile({ login: profile.login, password: e.target.value })
        }
      />
      <Button
        onClick={() => {
          sessionStorage.setItem("profile", JSON.stringify(profile));
          navigate("/firstpokemon");
        }}
      />
    </form>
  );
}
