import styled from 'styled-components';

export const StyledWrapper = styled.div`
  .task-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    gap: 1rem;
  }

  .btn-group {
    display: flex;
    gap: 1rem;
  }

  .complete-checked {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;
