import React, { useState } from "react";
import { authState } from "../../redux/authSlice";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile] = useState<authState>(
    JSON.parse(sessionStorage.getItem("profile") ?? "")
  );

  const navigate = useNavigate();
  return (
    <div>
      <h1>Профиль</h1>
      <h2>{profile.login}</h2>
      <h2>{profile.password}</h2>
      <Button
        onClick={() => {
          navigate("/auth");
          sessionStorage.removeItem("profile");
        }}
      >
        Выход
      </Button>
    </div>
  );
}
