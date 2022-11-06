import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, isError } = useSelector((state) => {
    return state.notification;
  });

  if (!message) {
    return null;
  }

  return (
    <Wrapper id="notification-wrapper" isError={isError}>
      {message}
    </Wrapper>
  );
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
