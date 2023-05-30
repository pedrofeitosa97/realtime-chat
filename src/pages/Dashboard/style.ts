import styled from 'styled-components'
export const StyledContainerDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--var-background);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  form {
    border-radius: 8px;
    max-height: 300px;
    width: 80%;
  }

  ul {
    height: 100%;
    background-color: var(--var-simple-white);
    padding-inline: 16px;
    border-radius: 12px;
    overflow-y: auto;
  }

  h1 {
    color: var(--var-simple-white);
    margin-bottom: 12px;
  }

  .username {
    color: green;
    font-weight: 700;
  }

  .paragraph {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .message-owner {
    padding: 12px;
    border-radius: 12px;
    color: var(--var-simple-white);
    background-color: var(--var-background);
    margin-block: 8px;
  }

  .message-notowner {
    padding: 12px;
    border-radius: 12px;
    color: var(--var-simple-white);
    background-color: var(--var-background-light);
    margin-block: 8px;
  }

  .profile-photo {
    border-radius: 50%;
    width: 30px;
    height: 30px;
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

  input {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    border: none;
    margin-top: 12px;
  }

  .profile {
    font-size: 12px;
    font-weight: 700;
    gap: 10px;
    display: flex;
    align-items: center;
  }

  .logout-button {
    margin-bottom: 12px;
  }

  @media (min-width: 1024px) {
    form {
      max-height: 500px;
      width: 40%;
    }
  }
`
