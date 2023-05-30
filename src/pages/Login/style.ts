import styled from 'styled-components'

export const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--var-background);

  form {
    max-width: 350px;
    max-height: 410px;
    text-align: center;
    color: #ffffff;
  }

  h2 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 40px;
  }

  .login_description {
    margin-bottom: 36px;
  }

  input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    margin-block: 12px;
    border: none;
  }

  button {
    opacity: 0.8;
    width: 100%;
    padding-block: 15px;
    border-radius: 8px;
    border: none;
    color: var(--var-simple-white);
    background-color: var(--var-button-green);
    margin-top: 12px;
  }

  button:hover {
    transition: 0.5s;
    opacity: 1;
  }

  .register_link {
    margin-block: 18px;
    cursor: pointer;
  }
`
