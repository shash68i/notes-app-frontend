import axios from 'axios';

// const AUTH_BASE_URL = 'http://localhost:8080/api/v1';
const AUTH_BASE_URL = 'https://notes-app-backend-three.vercel.app/api/v1';

export const getTasksAPI = () => {
  return axios.get(`${AUTH_BASE_URL}/tasks`);
};

export const createTaskAPI = (taskData) => {
  return axios.post(`${AUTH_BASE_URL}/create-task`, taskData);
};

export const completeTaskAPI = (taskData) => {
  return axios.put(
    `${AUTH_BASE_URL}/tasks/${taskData.taskNo}/complete`,
    taskData,
  );
};
