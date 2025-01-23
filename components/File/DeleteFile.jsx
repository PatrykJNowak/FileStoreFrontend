export const DeleteFile = (props) => {
  const handleDelete = async () => {
    const url = `http://localhost:5123/api/File/${props.fileId}`;
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
      method: "DELETE",
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
    props.onDeleteSuccess();
  };

  return <button onClick={handleDelete}>Delete File</button>;
};
