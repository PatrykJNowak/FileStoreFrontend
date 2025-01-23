import { useEffect, useState } from "react";
import moment from "moment";
import { DownloadFile } from "./DownloadFile";
import { DeleteFile } from "./DeleteFile";
import { UploadFile } from "./UploadFile";
import { CreateDirectory } from "./CreateDirectory";
import { DeleteDirectory } from "./DeleteDirectory";
import { GetUserData } from "./GetUserData";

export const GetDirectory = (props) => {
  const [directoryId, setDirectoryId] = useState(props.directoryId || null);
  const [, setHistory] = useState([]);
  const [directories, setDirectories] = useState([]);
  const [files, setFiles] = useState([]);
  const [usedSize, setUsedSize] = useState({
    file: 0,
    maxSize: 0,
    percentageFilledIn: 0,
  });

  const reloadFiles = () => {
    const params = new URLSearchParams();
    if (directoryId !== null) params.append("directoryId", directoryId);

    fetch(`http://localhost:5123/api/File/GetList?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((body) => {
            throw new Error(`Error: ${response.status}, ${body.errorMessage}`);
          });
        }
        return response.json();
      })
      .then((data) => setFiles(data))
      .catch((error) => console.error("Error reloading files:", error));
  };

  const reloadDirectories = () => {
    const params = new URLSearchParams();
    if (directoryId !== null) params.append("directoryId", directoryId);

    fetch(`http://localhost:5123/api/Directory?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((body) => {
            throw new Error(`Error: ${response.status}, ${body.errorMessage}`);
          });
        }
        return response.json();
      })
      .then((data) => setDirectories(data))
      .catch((error) => console.error("Error reloading directories:", error));
  };

  const reloadUsedSize = () => {
    fetch(`http://localhost:5123/api/File/UsedSize`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to fetch used size`);
        return response.json();
      })
      .then((data) => setUsedSize(data))
      .catch((error) => console.error("Error fetching used size:", error));
  };

  useEffect(() => {
    reloadDirectories();
    reloadFiles();
    reloadUsedSize();
  }, [directoryId]);

  const handleDirectoryClick = (id) => {
    setHistory((prev) => [...prev, directoryId]);
    setDirectoryId(id);
  };

  const handleGoBack = () => {
    setHistory((prev) => {
      const newHistory = [...prev];
      const previousId = newHistory.pop();
      setDirectoryId(previousId || null);
      return newHistory;
    });
  };

  return (
    <div>
      <GetUserData />
      <div>
        <a>
          Used size: {usedSize.file / 1000}MB from {usedSize.maxSize / 1000} MB
          - {(usedSize.percentageFilledIn * 100).toFixed(2)}%
        </a>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {directories.map((directory) => (
            <tr
              key={directory.id}
              onClick={() => handleDirectoryClick(directory.id)}
            >
              <td>{directory.directoryName}</td>
              <td>
                {moment(directory.createdAt).format("DD.MM.YYYY HH:mm:SS")}
              </td>
              <td>
                <button>Open</button>
              </td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <DeleteDirectory
                  directoryId={directory.id}
                  onDeleteSuccess={reloadDirectories}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateDirectory
        directroyId={directoryId}
        onCreateSuccess={reloadDirectories}
      />
      {directoryId && <button onClick={handleGoBack}>Go Back</button>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td>{file.fileName}</td>
              <td>{file.fileSize}</td>
              <td>{moment(file.createdAt).format("DD.MM.YYYY HH:mm:SS")}</td>
              <td>
                <DownloadFile fileId={file.id} fileName={file.fileName} />
              </td>
              <td>
                <DeleteFile fileId={file.id} onDeleteSuccess={reloadFiles} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UploadFile directoryId={directoryId} onUploadSuccess={reloadFiles} />
    </div>
  );
};
