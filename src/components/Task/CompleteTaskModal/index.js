import React, { useState } from 'react';
import MuiModal from '../../MuiModal';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { completeTask, createNewTask } from '@/store/slices/tasksSlice';
import { ReactQuill } from '../../TextEditor/TextEditor';

export default function CompleteTaskModal({ isOpen, onClose, task }) {
  const dispatch = useDispatch();

  const [taskData, setTaskData] = useState(task);
  const [errors, setErrors] = useState({});

  const validateData = () => {
    const errors = {
      actualHours:
        !/^\d+(\.\d{1,2})?$/.test(taskData.actualHours) ||
        parseFloat(taskData.actualHours) % 1 > 0.59,
    };
    console.log(errors.actualHours, 'errors');

    setErrors(errors);
    return !errors.actualHours;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateData()) {
      console.log('Form submitted successfully!');
      dispatch(completeTask(taskData));
      onClose();
    } else {
      console.log('Form submission failed due to validation errors.');
    }
  };

  return (
    <MuiModal
      title={'Complete Task'}
      isOpen={isOpen}
      onClose={onClose}
      onClickPrimary={handleSubmit}
    >
      <div className="input-group">
        <label htmlFor="estimateTime" className="input-label">
          Task No
        </label>
        <TextField
          fullWidth
          name="taskNo"
          value={task.taskNo}
          disabled
          onChange={handleChange}
          placeholder="Enter Task No"
          style={{ marginBottom: '1rem', marginTop: '0.5rem' }}
          variant="outlined"
        />
      </div>
      <div className="input-group">
        <label htmlFor="estimateTime" className="input-label">
          Actual Time
        </label>
        <TextField
          fullWidth
          name="actualHours"
          onChange={handleChange}
          placeholder="Enter Actual Hours"
          style={{ marginBottom: '1rem', marginTop: '0.5rem' }}
          variant="outlined"
          error={errors.actualHours}
          helperText={
            errors.actualHours
              ? 'Invalid actual hours. Decimal part must be less than 0.60'
              : ''
          }
        />
      </div>
      <div className="input-group">
        <label htmlFor="actualotes" className="input-label">
          Estimate Final Notes
        </label>
        <ReactQuill
          theme="snow"
          name="actualNotes"
          placeholder="Enter Final Notes"
          value={taskData?.actualNotes}
          onChange={(newData) =>
            setTaskData({ ...taskData, actualNotes: newData })
          }
          style={{ height: '10rem' }}
        />
      </div>
    </MuiModal>
  );
}
