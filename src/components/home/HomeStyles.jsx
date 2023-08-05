import { styled } from "styled-components";

export const HomeStyles = styled.div`
.page-layout{
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  column-gap: 13rem;
}

.center-layout{
  /* display: flex; */
  /* padding: 0 15rem; */
}
.header-container{
    background-color: #ffffff;
    padding: 20px;
    /* object-fit: contain; */
    border-bottom: 1px solid lightgray;
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
    position: fixed;
    /* top: 0; */
    z-index: 1;
    height: 100vh;
}

  .app-logo {
    max-width: 150px;
    width: 100%;
    height: auto;

  }

  .sidebar-content{
    margin-top: 2rem;
  }

  .home-container, .search-container-main{
    display: flex;
    flex-direction: row;
    column-gap: 0.4rem;
    font-size: 1.5rem;
    /* font-weight: 900; */
  }

  .home-container p{
    font-size: 1.3rem;

  }

  .search-icon{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-input{
    font-size: 1.1rem;
    color: #333333;
    padding-left: 0.7rem;
    height: 3rem;
    margin: 1rem 0;
    width: 10rem;
    height: 2.5rem;
    border: 1px solid #aeb1b3;
    font-family: 'Signika Negative', sans-serif;
    border-radius: 0.3rem;
  }

  .search-input:focus {
    outline: none;
  }

  .search-input::placeholder {
    color: #555555;
  }



  .app-subtitle{
    font-weight: 900;
    font-size: 1.5rem;
    padding-top: 2rem;
    text-align: center;
    padding-left: 1rem;
padding-right: 1rem;

  }

  .postings-container{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user-postings{
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5%;
    grid-row-gap: 1%;
  }

  .log-in-btn{
    background-color: #333333;
    transition: all 0.5s ease-out;
    background-position: right bottom;
    color: #ffffff;
    border: 1px solid #333333;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    padding: 0.4rem 0rem;
    margin: 0.5rem 0rem;
    font-weight: 900;
    font-size: 1rem;
    width: 9rem;
    text-transform: capitalize;
    display: block;
    text-align: center;
    font-family: 'Signika Negative', sans-serif;
  }

  .log-in-btn:hover {
    background-color: #000000;
    border: 1px solid #000000;
    background-position: left bottom;
    transition: all 0.5s ease-in;
    cursor: pointer;
  }

  .sign-up-btn{
    background-color: #ED9076;
    transition: all 0.5s ease-out;
    background-position: right bottom;
    color: #000000;
    border: 1px solid #ED9076;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    padding: 0.4rem 1rem;
    margin: 0.5rem 0rem;
    font-weight: 900;
    font-size: 1rem;
    width: 9rem;
    text-transform: capitalize;
    font-family: 'Signika Negative', sans-serif;
  }

  .sign-up-btn:hover {
    background-color: #aa553c;
    border: 1px solid #aa553c;
    color: #ffffff;
    background-position: left bottom;
    transition: all 0.5s ease-in;
    cursor: pointer;
  }

  .error-msg{
    color: #d83b27;
    text-align: center;
    padding-top: 1rem;
    font-weight: 500;
  }

@media only screen and (max-width: 1024px){
  .user-postings{
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (max-width: 768px){
  .header-container{
    display: flex;
    flex-direction: column;
}


  .user-postings{
    grid-template-columns: 1fr;
    grid-gap: 0.5%;
  }

  .search-input{
    width: 80vw;
  }

  .log-in-btn, .sign-up-btn{
    margin: 0.5rem 0rem;
  }
}

`;

// import { styled } from "styled-components";

// export const HomeStyles = styled.div`
// .header-container{
//     background-color: #ffffff;
//     padding: 20px;
//     object-fit: contain;
//     border-bottom: 1px solid lightgray;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     position: sticky;
//     top: 0;
//     z-index: 1;
// }

//   .app-logo {
//     max-width: 150px;
//     width: 100%;
//     height: auto;

//   }

//   .search-input{
//     font-size: 1.2rem;
//     color: #333333;
//     padding-left: 0.7rem;
//     height: 3rem;
//     margin-bottom: 1.5rem;
//     width: 30vw;
//     height: 3rem;
//     border: 1px solid #aeb1b3;
//     font-family: 'Signika Negative', sans-serif;
//     border-radius: 0.3rem;
//   }

//   .search-input:focus {
//     outline: none;
//   }

//   .search-input::placeholder {
//     color: #555555;
//   }



//   .app-subtitle{
//     font-weight: 900;
//     font-size: 1.5rem;
//     padding-top: 2rem;
//     text-align: center;
//     padding-left: 1rem;
// padding-right: 1rem;

//   }

//   .postings-container{
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   .user-postings{
//     padding: 20px;
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
//     grid-gap: 5%;
//     grid-row-gap: 1%;
//   }

//   .log-in-btn{
//     background-color: #333333;
//     transition: all 0.5s ease-out;
//     background-position: right bottom;
//     color: #ffffff;
//     border: 1px solid #333333;
//     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
//     text-align: center;
//     padding: 0.4rem 4rem;
//     margin: 0.5rem 1rem;
//     font-weight: 900;
//     font-size: 1rem;
//     width: 5rem;
//     text-transform: capitalize;
//   }

//   .log-in-btn:hover {
//     background-color: #000000;
//     border: 1px solid #000000;
//     background-position: left bottom;
//     transition: all 0.5s ease-in;
//     cursor: pointer;
//   }

//   .sign-up-btn{
//     background-color: #ED9076;
//     transition: all 0.5s ease-out;
//     background-position: right bottom;
//     color: #000000;
//     border: 1px solid #ED9076;
//     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
//     text-align: center;
//     padding: 0.4rem 1rem;
//     margin: 0.5rem 1rem;
//     font-weight: 900;
//     font-size: 1rem;
//     width: 13rem;
//     text-transform: capitalize;
//   }

//   .sign-up-btn:hover {
//     background-color: #aa553c;
//     border: 1px solid #aa553c;
//     color: #ffffff;
//     background-position: left bottom;
//     transition: all 0.5s ease-in;
//     cursor: pointer;
//   }

//   .error-msg{
//     color: #d83b27;
//     text-align: center;
//     padding-top: 1rem;
//     font-weight: 500;
//   }

// @media only screen and (max-width: 1024px){
//   .user-postings{
//     grid-template-columns: 1fr 1fr;
//   }
// }

// @media only screen and (max-width: 768px){
//   .header-container{
//     display: flex;
//     flex-direction: column;
// }


//   .user-postings{
//     grid-template-columns: 1fr;
//     grid-gap: 0.5%;
//   }

//   .search-input{
//     width: 80vw;
//   }


// }

// `;