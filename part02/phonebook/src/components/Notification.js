import styled from 'styled-components';

const Notification = ({ message, isError }) => {
  if (!message) {
    return null;
  }

  return <Wrapper isError={isError}>{message}</Wrapper>;
};

const Wrapper = styled.div`
  color: ${(props) => (props.isError ? 'red' : 'green')};
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

export default Notification;
