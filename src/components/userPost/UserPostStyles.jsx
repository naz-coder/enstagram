import { styled } from "styled-components";

export const PostStyles = styled.div`
  max-width: 500px;
  background-color: #ffffff;
  border: 1px solid lightgray;
  margin-bottom: 45px;

  .post-container {
  }

  .post-header {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    padding: 1rem;
  }
  .post-image {
    width: 100%;
    object-fit: contain;
    border-bottom: 1px solid lightgray;
    border-top: 1px solid lightgray;
  }

  .post-text {
    padding: 1rem;
  }

  .post-comment-container {
    display: flex;
    margin-top: 10px;
  }

  .post-comments{
    padding-left: 1rem;
  }

  .post-comments p{
    padding-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .post-input {
    flex: 2;
    border: none;
    padding: 10px;
    border-top: 1px solid lightgray;
  }

  .post-input:focus {
    outline: none;
  }



  .post-btn {
    flex: 1;
    border: none;
    border-top: 1px solid lightgray;
    background-color: transparent;
    color: #6082a3;
    cursor: pointer;
  }

  .post-btn:disabled {
    cursor: not-allowed;
  }
`;
