import { useState } from "react";

export const CreateDirectory = (props) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5123/api/Directory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        parentDirectoryId: props.DirectoryId,
        directoryName: name,
      }),
    });

    if (!response.ok) {
      const responseBody = await response.json();
      alert(
        `Error code: ${response.status} with message: ${responseBody.errorMessage}`
      );
    }

    setName("");
    props.onCreateSuccess();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Folder Name"
          />
          <button>Add folder</button>
        </div>
      </form>
    </>
  );
};
