import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { StyledWrapper } from './StyledWrapper';
import { getTasksData } from '@/store/slices/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import Task from '../Task';
import CreateTaskModal from '../CreateTaskModal';

export default function Dashboard() {
  const dispatch = useDispatch();
  const tasksList = useSelector((state) => state.tasks.tasksList);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    dispatch(getTasksData());
  }, [dispatch]);

  return (
    <StyledWrapper>
      <Button sx={{ width: '20rem' }} onClick={openModal} variant="outlined">
        Create Task
      </Button>
      <div className="tasks-list">
        {tasksList?.map((task) => (
          <Task key={task.taskNo} task={task} />
        ))}
      </div>
      <CreateTaskModal isOpen={isModalOpen} onClose={closeModal} />
    </StyledWrapper>
  );
}
