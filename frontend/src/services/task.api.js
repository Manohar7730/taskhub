import api from "./api";

export const deleteTask = ({ taskId }) => {
  return api.delete(`/tasks/task/${taskId}`);
};

export const addTask = ({
  projectId,
  title,
  description,
  status,
  priority,
  dueDate,
  progress,
}) => {
  return api.post(`/projects/${projectId}/tasks`, {
    title,
    description,
    status,
    priority,
    dueDate,
    progress: Number(progress),
  });
};

export const getTaskByID = ({ taskId }) => {
  return api.get(`/tasks/task/${taskId}`);
};

export const updateTask = ({
  taskId,
  title,
  description,
  status,
  priority,
  dueDate,
  progress,
}) => {
  return api.put(`/tasks/task/${taskId}`, {
    title,
    description,
    status,
    priority,
    dueDate,
    progress: Number(progress),
  });
};
