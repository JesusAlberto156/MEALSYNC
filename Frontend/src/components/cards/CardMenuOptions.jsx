import styled from 'styled-components';

export const Card_Menu = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  margin: 20px;
  width: 280px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;