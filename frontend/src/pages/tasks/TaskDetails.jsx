import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { getTaskByID } from "../../services/task.api";
import {
  deleteFile,
  loadAttachments,
  uploadFile,
} from "../../services/attachment.api";
import api from "../../services/api";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [attachments, setAttachments] = useState([]);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load task data
  const loadTask = useCallback(async () => {
    try {
      const res = await getTaskByID({ taskId });
      setTask(res.data);
    } catch (err) {
      console.log("Error loading task:", err);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  }, [taskId, navigate]);

  useEffect(() => {
    loadTask();
    loadAttachments({ taskId, setAttachments });
  }, [loadTask, taskId]);

  // Upload a new attachment
  const handleUpload = async () => {
    await uploadFile({ file, taskId, setFile, setAttachments });

    // Reset file input after upload
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setFile(null);
  };

  // Delete an attachment
  const handleDelete = (id) => {
    deleteFile({
      id,
      taskId,
      setAttachments,
    });
  };

  // Download attachment as file
  const handleDownload = async (id, fileName) => {
    try {
      const response = await api.get(`/attachments/${id}/download`, {
        responseType: "blob", // Required to download binary data
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);

      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  if (loading) return <p className="p-6">Loading task...</p>;
  if (!task) return <p className="p-6">Task not found.</p>;

  return (
    <div className="mx-auto mt-6 max-w-2xl rounded-xl bg-white p-6 shadow">
      <h1 className="text-3xl font-bold">{task.title}</h1>

      {/* Task metadata */}
      <div className="my-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold">Status</p>
          <p>{task.status}</p>
        </div>

        <div>
          <p className="font-semibold">Priority</p>
          <p>{task.priority}</p>
        </div>

        <div>
          <p className="font-semibold">Progress</p>
          <p>{task.progress}%</p>
        </div>

        <div>
          <p className="font-semibold">Due Date</p>
          <p>{task.dueDate ? task.dueDate.split("T")[0] : "—"}</p>
        </div>
      </div>

      {/* Task description */}
      <div className="my-4">
        <p className="font-semibold">Description</p>
        <p className="text-gray-600">{task.description || "No description"}</p>
      </div>

      {/* Attachment section */}
      <div className="p-4">
        <h2 className="mb-3 font-semibold">Attachments</h2>

        {/* Upload field */}
        <div className="mb-4 flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={handleUpload}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Upload
          </button>
        </div>

        {/* Attachment list */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {attachments.map((a) => {
            return (
              <div key={a._id} className="rounded border p-2">
                {a.mimeType.includes("image") ? (
                  <img
                    src={
                      a.filePath.startsWith("http")
                        ? a.filePath
                        : `${import.meta.env.VITE_API_URL}/uploads/${a.filePath}`
                    }
                    alt={a.fileName}
                    className="h-32 w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-6xl">📄</span>
                    <p className="mt-1 text-sm">{a.fileName}</p>
                  </div>
                )}

                {/* Attachment actions */}
                <div className="mt-2 flex flex-wrap justify-evenly text-sm">
                  <a
                    href={
                      a.filePath.startsWith("http")
                        ? a.filePath
                        : `${import.meta.env.VITE_API_URL}/uploads/${a.filePath}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Preview
                  </a>

                  <button
                    onClick={() => handleDownload(a._id, a.fileName)}
                    className="text-sm text-green-700 hover:underline"
                  >
                    Download
                  </button>

                  <button
                    onClick={() => handleDelete(a._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate(`/task/${taskId}/edit`)}
          className="rounded bg-cyan-600 px-4 py-2 text-white"
        >
          Edit Task
        </button>

        <button
          onClick={() => navigate(-1)}
          className="rounded bg-gray-200 px-4 py-2"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
