import React from 'react';
import styled from 'styled-components';
import LoginForm from './components/LoginForm';
function App(){
    const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  font-family: 'Open Sans', sans-serif;
`;

const App = () => {
  return (
    <AppContainer>
      <LoginForm />
    </AppContainer>
  );
};
}
export default App;