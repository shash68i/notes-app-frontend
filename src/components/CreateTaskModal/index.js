import React, { useState } from 'react';
import MuiModal from '../MuiModal';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createNewTask } from '@/store/slices/tasksSlice';
import { ReactQuill } from '../TextEditor/TextEditor';

export default function CreateTaskModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const regex = /^L\d{5}$/;

  const [taskNo, setTaskNo] = useState('');
  const [estimateHours, setEstimateHours] = useState('');
  const [estimateNotes, setEstimateNotes] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'taskNo') {
      setTaskNo(value);
    } else if (name === 'estimateHours') {
      const parts = value.split('.');
      if (parts.length === 1 || (parts.length === 2 && parts[1] === '')) {
        setEstimateHours(value);
        return;
      } else if (parts.length === 2) {
        const integerPart = parts[0];
        const decimalPart = parts[1];
        let integerPartNumber = parseInt(integerPart, 10);
        let decimalPartNumber = parseInt(decimalPart, 10);

        if (decimalPart.length > 2) {
          return;
        } else {
          if (decimalPartNumber >= 60) {
            decimalPartNumber -= 60;
            integerPartNumber += 1;
            setEstimateHours(
              `${integerPartNumber}.${
                decimalPartNumber <= 9 ? '0' : ''
              }${decimalPartNumber}`,
            );
          } else {
            setEstimateHours(`${integerPartNumber}.${decimalPartNumber}`);
          }
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createNewTask({
        taskNo,
        estimateHours,
        estimateNotes,
      }),
    );
    onClose();
  };

  return (
    <MuiModal
      title={'Add Task'}
      isOpen={isOpen}
      onClose={onClose}
      onClickPrimary={handleSubmit}
      primaryDisabled={
        taskNo === '' ||
        estimateHours === '' ||
        estimateNotes === '' ||
        !regex.test(taskNo)
      }
    >
      <div className="input-group">
        <label htmlFor="taskNo" className="input-label">
          Task No
        </label>
        <TextField
          fullWidth
          name="taskNo"
          value={taskNo}
          inputProps={{ maxLength: 6 }}
          onChange={handleChange}
          placeholder="Enter Task No having 6 characters starting with the letter L"
          variant="outlined"
        />
      </div>
      <div className="input-group">
        <label htmlFor="estimateTime" className="input-label">
          Estimate Time
        </label>
        <TextField
          fullWidth
          name="estimateHours"
          value={estimateHours}
          onChange={handleChange}
          placeholder="Enter Estimated Time"
          variant="outlined"
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
          value={estimateNotes}
          onChange={(newData) => setEstimateNotes(newData)}
          style={{ height: '10rem' }}
        />
      </div>
    </MuiModal>
  );
}
