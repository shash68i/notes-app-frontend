import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  completeTaskAPI,
  createTaskAPI,
  getTasksAPI,
} from '../../services/tasks';

const initialState = {
  tasksList: [],
};

export const getTasksData = createAsyncThunk(
  'tasks/getTasksData',
  async (_, thunkAPI) => {
    try {
      const response = await getTasksAPI();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const createNewTask = createAsyncThunk(
  'tasks/createNewTask',
  async (taskData, thunkAPI) => {
    try {
      const response = await createTaskAPI(taskData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const completeTask = createAsyncThunk(
  'tasks/completeTask',
  async (taskData, thunkAPI) => {
    console.log(taskData, 'task');
    try {
      const response = await completeTaskAPI(taskData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (taskData, thunkAPI) => {
    console.log(taskData, 'task');
    try {
      const response = await createTaskAPI(taskData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      // Logic to add a new task to the state
    },
    // Other task-related actions
  },
  extraReducers: (builder) => {
    builder.addCase(getTasksData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTasksData.fulfilled, (state, actions) => {
      state.tasksList = actions.payload;
      state.loading = false;
    });
    builder.addCase(getTasksData.rejected, (state, actions) => {
      state.loading = false;
      state.error = actions.payload;
    });
    builder.addCase(createNewTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewTask.fulfilled, (state, actions) => {
      state.tasksList = [...state.tasksList, actions.payload];
      state.loading = false;
    });
    builder.addCase(createNewTask.rejected, (state, actions) => {
      state.loading = false;
      state.error = actions.payload;
    });
    builder.addCase(completeTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(completeTask.fulfilled, (state, actions) => {
      state.tasksList = state.tasksList.map((task) => {
        if (task.taskNo === actions.payload.taskNo) {
          return { ...task, completed: true };
        }

        return task;
      });
      state.loading = false;
    });
    builder.addCase(completeTask.rejected, (state, actions) => {
      state.loading = false;
      state.error = actions.payload;
    });
    builder.addCase(editTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editTask.fulfilled, (state, actions) => {
      state.tasksList = state.tasksList.map((task) => {
        if (task.taskNo === actions.payload.taskNo) {
          return actions.payload;
        }

        return task;
      });
      state.loading = false;
    });
    builder.addCase(editTask.rejected, (state, actions) => {
      state.loading = false;
      state.error = actions.payload;
    });
  },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
