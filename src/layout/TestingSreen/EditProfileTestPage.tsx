import React from "react";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

type Props = {};

export default function EditProfileTestPage({}: Props) {
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div>
      <Button label="Logout" onClick={signOut} />
      <Button label="Post Artwork" onClick={() => navigate("/postAw")} />
    </div>
  );
}
