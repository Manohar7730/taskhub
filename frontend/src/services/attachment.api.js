import api from "./api";

export const loadAttachments = async ({ taskId, setAttachments }) => {
  const res = await api.get(`/tasks/${taskId}/attachments`);
  setAttachments(res.data);
};

export const uploadFile = async ({ file, taskId, setFile, setAttachments }) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  await api.post(`/tasks/${taskId}/attachments`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  setFile(null);
  await loadAttachments({ taskId, setAttachments });
};

export const deleteFile = async ({ id, taskId, setAttachments }) => {
  await api.delete(`/attachments/${id}`);
  await loadAttachments({ taskId, setAttachments });
};

export const getDownloadUrlAndOpen = async (id, fileName) => {
  try {
    const res = await api.get(`/attachments/${id}/download`, {
      responseType: "blob",
    });

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "download";
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download helper error:", error);
    alert("Failed to initiate download.");
  }
};
