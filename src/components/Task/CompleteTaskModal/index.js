import React, { useState } from 'react';
import MuiModal from '../../MuiModal';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { completeTask, createNewTask } from '@/store/slices/tasksSlice';
import { ReactQuill } from '../../TextEditor/TextEditor';

export default function CompleteTaskModal({ isOpen, onClose, task }) {
  const dispatch = useDispatch();

  const [actualHours, setActualHours] = useState('');
  const [actualNotes, setActualNotes] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'actualHours') {
      const parts = value.split('.');
      if (parts.length === 1 || (parts.length === 2 && parts[1] === '')) {
        setActualHours(value);
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
            setActualHours(
              `${integerPartNumber}.${
                decimalPartNumber <= 9 ? '0' : ''
              }${decimalPartNumber}`,
            );
          } else {
            setActualHours(`${integerPartNumber}.${decimalPartNumber}`);
          }
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      completeTask({
        taskNo: task.taskNo,
        actualHours,
        actualNotes,
      }),
    );
    onClose();
    setActualHours('');
    setActualNotes('');
  };

  return (
    <MuiModal
      title={'Complete Task'}
      isOpen={isOpen}
      onClose={onClose}
      onClickPrimary={handleSubmit}
      primaryDisabled={actualHours === '' || actualNotes === ''}
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
          value={actualHours}
          onChange={handleChange}
          placeholder="Enter Actual Hours"
          style={{ marginBottom: '1rem', marginTop: '0.5rem' }}
          variant="outlined"
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
          value={actualNotes}
          onChange={(newData) => setActualNotes(newData)}
          style={{ height: '10rem' }}
        />
      </div>
    </MuiModal>
  );
}
