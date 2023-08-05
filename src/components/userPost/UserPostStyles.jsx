import { styled } from "styled-components";

export const PostStyles = styled.div`
.card-outter{
  max-width: 500px;
  background-color: #ffffff;
  border: 1px solid lightgray;
  margin-bottom: 45px;
}

  .post-container {
  }

  .post-header {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    padding: 1rem;
  }

  .dot-icon, .date-value{
    color: #333333;  
    font-size: 0.9rem;
    margin-left: -0.5rem;
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

  .post-engagement-container{
    padding: 0 1rem 0.4rem 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .post-engagment-content{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }

  .like-icon{
    color: #000000;
    font-size: 1.5rem;
  }

  .comment-icon, .share-icon, .bookmark-icon{
    color: #000000;
    font-size: 1.3rem;
  }

  .like-icon:hover, .comment-icon:hover, .share-icon:hover, .bookmark-icon:hover{
    cursor: pointer;
    opacity: 0.9;
  }



  .post-comment-container {
    display: flex;
    margin-top: 10px;
    border-bottom: 1px solid lightgray;
    height: 3rem;
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

  .post-likes-count{
    padding: 0.2rem 1rem 0.9rem 1rem;
    font-size: 0.9rem;
    font-weight: 900;
    color: #333333;
  }

  .post-save{
    padding: 0.2rem 1rem 0.9rem 1rem;
    font-size: 0.9rem;
    font-weight: 900;
    color: #555555;
  }


  .engagement-result{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }



  .del-btn-container{
    display: block;
  }

  .del-btn{
    background-color: #b1200d;
    transition: all 0.5s ease-out;
    background-position: right bottom;
    color: #ffffff;
    border: 1px solid #b1200d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    padding: 0.6rem 1rem;
    margin: 0.5rem 1rem;
    font-weight: 900;
    font-size: 0.8rem;
    /* width: 5rem; */
    text-transform: capitalize;
  }

  .del-btn:hover {
    background-color: #5e0e03;
    border: 1px solid #5e0e03;
    background-position: left bottom;
    transition: all 0.5s ease-in;
    cursor: pointer;
  }

`;
