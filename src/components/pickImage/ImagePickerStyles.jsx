import { styled } from "styled-components";

export const ImagePickerStyles = styled.div`
  .file-picker-container {
    display: flex;
    flex-direction: column;
    width: 60%;
    /* width: 15rem; */
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 30px;
    background-color: #ffffff;
    border-top: 1px solid #c5c5c5;
    padding: 1rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  }

  .stage-bar {
    width: 100%;
    padding: 0.9rem;
    accent-color: #027202;
    margin-bottom: 0.5rem;
  }

  .kaption-input {
    font-size: 1.2rem;
    color: #000000;
    padding-left: 0.7rem;
    height: 3rem;
    margin-bottom: 1.5rem;
    /* width: 97.8%; */
    height: 3rem;
    border: 1px solid #aeb1b3;
    border-radius: 0.3rem;
    font-family: 'Signika Negative', sans-serif;
  }

  .kaption-input:focus {
    outline: none;
  }

  .kaption-input::placeholder {
    color: #333333;
  }

  .choose-file{
    color: #333333;
  }

  .publish-btn {
    background-color: #333333;
    transition: all 0.5s ease-out;
    background-position: right bottom;
    color: #ffffff;
    border: 1px solid #333333;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    padding: 0.4rem 4rem;
    margin: 0.5rem 0;
    font-weight: 900;
    font-size: 1rem;
    width: 5rem;
    text-transform: capitalize;
    font-family: 'Signika Negative', sans-serif;
  }

  .publish-btn:hover {
    background-color: #000000;
    border: 1px solid #000000;
    background-position: left bottom;
    transition: all 0.5s ease-in;
    cursor: pointer;
  }
`;
