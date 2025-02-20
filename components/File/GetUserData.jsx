import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GetUserData = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5123/api/User/GetUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="UserName">Hi: {user.userName}</div>
      <div className="Logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
