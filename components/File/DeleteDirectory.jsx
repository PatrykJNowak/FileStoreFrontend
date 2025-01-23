export const DeleteDirectory = (props) => {
  const handleDelete = async () => {
    const url = `http://localhost:5123/api/Directory/${props.directoryId}`;
    const token = localStorage.getItem("token");

    try {
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

      props.onDeleteSuccess(); // Wywołanie funkcji przekazanej przez rodzica
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return <button onClick={handleDelete}>Delete File</button>;
};
