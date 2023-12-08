import styled from "styled-components";

export const StyledInput = styled.input`
    
    color: white;
    border: none;
    border-radius: 5px;
    transition: all 0.3s ease;
    color: black;
    padding: 10px;
    &:focus{
        outline: none;
    }
    &:hover{
        opacity: 0.8;
    }
`;