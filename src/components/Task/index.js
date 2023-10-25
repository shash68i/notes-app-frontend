import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledWrapper } from './StyledWrapper';
import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CompleteTaskModal from './CompleteTaskModal';
import EditTaskModal from './EditTaskModal';
import { CheckCircle, Done } from '@mui/icons-material';

const Task = ({ task }) => {
  const [currentModal, setCurrentModal] = useState('');

  const openModal = (modalName) => setCurrentModal(modalName);
  const closeModal = () => setCurrentModal('');

  const { taskNo, notes, completed } = task;

  return (
    <StyledWrapper>
      <CompleteTaskModal
        isOpen={currentModal === 'Complete Task'}
        onClose={closeModal}
        task={task}
      />
      <EditTaskModal
        isOpen={currentModal === 'Edit Task'}
        onClose={closeModal}
        task={task}
      />
      <Card variant="outlined">
        <CardContent sx={{ width: '100%' }} className="task-wrapper">
          <Typography variant="h6" component="div" gutterBottom>
            Task No: {taskNo}
          </Typography>
          {notes.length > 0 && (
            <Table sx={{ width: '100%' }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '70%' }} align="left">
                    Estimate Notes
                  </TableCell>
                  <TableCell sx={{ width: '30%' }} align="center">
                    Estimate Hours
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.map((note, index) => (
                  <TableRow sx={{ width: '100%' }} key={index}>
                    <TableCell sx={{ width: '70%' }} align="left">
                      <div
                        dangerouslySetInnerHTML={{ __html: note.estimateNotes }}
                      />
                    </TableCell>
                    <TableCell sx={{ width: '30%' }} align="center">
                      {note.estimateHours}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className="btn-group">
            {!completed && (
              <Button
                disabled={completed}
                onClick={() => openModal('Edit Task')}
                variant="outlined"
              >
                Edit Task
              </Button>
            )}
            <Button
              disabled={completed}
              onClick={() => openModal('Complete Task')}
              variant="contained"
            >
              {completed ? (
                <div className="complete-checked">
                  Completed <Done fontSize="14px" />
                </div>
              ) : (
                'Complete Task'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </StyledWrapper>
  );
};

export default Task;
