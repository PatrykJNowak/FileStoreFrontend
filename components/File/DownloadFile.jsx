import { useState } from "react";

export const DownloadFile = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownload = async () => {
    setIsLoading(true);
    const url = `http://localhost:5123/api/File/${props.fileId}`;
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const responseBody = await response.json();
      alert(
        `Error code: ${response.status} with message: ${responseBody.errorMessage}`
      );
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = props.fileName;
    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(downloadUrl);
    setIsLoading(false);
  };

  return (
    <button onClick={handleDownload} disabled={isLoading}>
      {isLoading ? "Downloading..." : "Download File"}
    </button>
  );
};
