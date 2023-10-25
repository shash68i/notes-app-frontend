import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 60%;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  .tasks-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }
`;
