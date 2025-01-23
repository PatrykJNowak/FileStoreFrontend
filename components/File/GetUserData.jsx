import { useEffect, useState } from "react";

export const GetUserData = () => {
  const [user, setUser] = useState([]);

  const handleDelete = async () => {
    fetch(`http://localhost:5123/api/User/GetUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      });
  };

  useEffect(() => {
    handleDelete();
  }, []);

  return <div>Hi: {user.userName}</div>;
};
