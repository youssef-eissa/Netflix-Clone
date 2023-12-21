import styled from "styled-components";


export const LandingPageWrapper = styled.div`
    background-color: black;
    height:500px;
    font-family: 'Poppins', sans-serif;
    color:white;

& h1{
    font-weight: 900;
    font-size:50px;
}
& p{
    font-weight: 400;
    font-size:24px;
}

@media (max-width: 768px) {
    & h1{
        font-weight: 900;
        font-size:25px;
    }
    & p{
        font-weight: 400;
        font-size:18px;
    }
}
`