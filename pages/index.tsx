import { useState } from "react";
import { useRole } from "../context/RoleContext";
import { useRouter } from "next/router";

export default function Home() {
  const { login } = useRole();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleLogin = (selectRole:any) => {
    if (selectRole) {
      login(selectRole);
      router.push(selectRole === "Writer" ? "/writer" : "/reviewer");
    } else {
      alert("Please select a role to continue.");
    }
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="left-section">
        <h2>Welcome Back...</h2>{" "}
      </div>

      {/* Right Section (Login Form) */}
      <div className="right-section">
        <p>Please select your role to proceed:</p>

        {/* Role Selection Buttons */}
        <div className="role-selection">
          <button
            onClick={() => handleRoleSelect("Writer")}
            className={`role-button ${
              selectedRole === "Writer" ? "active" : ""
            }`}
          >
            Writer
          </button>
          <button
            onClick={() => handleRoleSelect("Reviewer")}
            className={`role-button ${
              selectedRole === "Reviewer" ? "active" : ""
            }`}
          >
            Reviewer
          </button>
        </div>

        {/* Login Button */}
        <button onClick={()=>handleLogin(selectedRole)} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
}
