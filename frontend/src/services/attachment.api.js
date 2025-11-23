import api from "./api";

export const loadAttachments = async ({ taskId, setAttachments }) => {
  const res = await api.get(`/tasks/${taskId}/attachments`);
  setAttachments(res.data);
};

/* UPLOAD FILE */
export const uploadFile = async ({ file, taskId, setFile, setAttachments }) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  await api.post(`/tasks/${taskId}/attachments`, formData);

  setFile(null);

  await loadAttachments({ taskId, setAttachments });
};

/* DELETE FILE */
export const deleteFile = async ({ id, taskId, setAttachments }) => {
  await api.delete(`/attachments/${id}`);

  await loadAttachments({ taskId, setAttachments });
};
