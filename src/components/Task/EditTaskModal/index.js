import React, { useState } from 'react';
import MuiModal from '../../MuiModal';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  completeTask,
  createNewTask,
  editTask,
} from '@/store/slices/tasksSlice';
import { ReactQuill } from '../../TextEditor/TextEditor';

export default function EditTaskModal({ isOpen, onClose, task }) {
  const dispatch = useDispatch();

  const [taskData, setTaskData] = useState(task);
  const [errors, setErrors] = useState({});

  const validateData = () => {
    const errors = {
      estimateHours:
        !/^\d+(\.\d{1,2})?$/.test(taskData.estimateHours) ||
        parseFloat(taskData.estimateHours) % 1 > 0.59,
    };
    console.log(errors, 'errors');

    setErrors(errors);

    return !errors.estimateHours;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateData()) {
      console.log('Form submitted successfully!');
      dispatch(editTask(taskData));
      onClose();
      setErrors({});
    } else {
      console.log('Form submission failed due to validation errors.');
    }
  };

  return (
    <MuiModal
      title={'Edit Task'}
      isOpen={isOpen}
      onClose={onClose}
      primaryDisabled={taskData.estimateNotes === ''}
      onClickPrimary={handleSubmit}
    >
      <div className="input-group">
        <label htmlFor="estimateTime" className="input-label">
          Task No
        </label>
        <TextField
          className="input-field"
          fullWidth
          name="taskNo"
          value={task.taskNo}
          disabled
          onChange={handleChange}
          placeholder="Enter Task No"
          variant="outlined"
        />
      </div>
      <div className="input-group">
        <label htmlFor="estimateHours" className="input-label">
          Estimate Time
        </label>
        <TextField
          className="input-field"
          fullWidth
          name="estimateHours"
          onChange={handleChange}
          placeholder="Enter Estimate Hours"
          variant="outlined"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
      </div>
      <div className="input-group">
        <label htmlFor="estimateNotes" className="input-label">
          Estimate Notes
        </label>

        <ReactQuill
          theme="snow"
          name="estimateNotes"
          placeholder="Enter Estimate Notes"
          value={taskData?.estimateNotes}
          onChange={(newData) =>
            setTaskData({ ...taskData, estimateNotes: newData })
          }
          style={{ height: '10rem' }}
        />
      </div>
    </MuiModal>
  );
}
