import { styled } from "styled-components";

export const HomeStyles = styled.div`
.header-container{
    background-color: #ffffff;
    padding: 20px;
    object-fit: contain;
    border-bottom: 1px solid lightgray;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 1;
}

  .app-logo {
    max-width: 150px;
    width: 100%;
    height: auto;

  }

  .user-postings{
    padding: 20px;
  }

`;