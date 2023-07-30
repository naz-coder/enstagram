import { styled } from "styled-components";

export const PostStyles = styled.div`
max-width: 500px;
background-color: #ffffff;
border: 1px solid lightgray;
margin-bottom: 45px;

.post-container{

}

.post-header{
    display: flex;
    align-items: center;
    column-gap: 1rem;
    padding: 1rem;
}
.post-image{
    width: 100%;
    object-fit: contain;
    border-bottom: 1px solid lightgray;
    border-top: 1px solid lightgray;
}

.post-text{
    padding: 1rem; 
}
`;
