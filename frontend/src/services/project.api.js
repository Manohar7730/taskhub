import api from "./api";

export const getAllProjects = () => {
  return api.get(`/projects`);
};

export const getProjectByID = ({ projectId }) => {
  return api.get(`/projects/project/${projectId}`);
};

export const createProject = ({ title, description, dueDate }) => {
  return api.post(`/projects`, { title, description, dueDate });
};

export const updateProject = ({ projectId, title, description, dueDate }) => {
  return api.put(`/projects/project/${projectId}`, {
    title,
    description,
    dueDate,
  });
};

export const deleteProject = ({ projectId }) => {
  return api.delete(`/projects/project/${projectId}`);
};
