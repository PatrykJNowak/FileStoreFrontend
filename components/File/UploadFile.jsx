import { useState } from "react";

export const UploadFile = (props) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    const params = new URLSearchParams();
    if (props.directoryId !== null) {
      params.append("directoryId", props.directoryId);
    }

    try {
      const response = await fetch(
        `http://localhost:5123/api/File?${params.toString()}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": "pl-PL,pl;q=0.9,en;q=0.8",
            Accept: "*/*",
          },
          body: formData,
        }
      );

      if (response.ok) {
        props.onUploadSuccess();
      } else {
        const responseBody = await response.json();
        alert(
          `Error code: ${response.status} with message: ${responseBody.errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={uploading} />
    </div>
  );
};
