import styled from "styled-components";


export const Overlay=styled.div`
    background-image: linear-gradient(to bottom,rgba(0, 0, 0, 0.8) 0,
    rgba(0, 0, 0, 0.5) 60%,
    rgba(0, 0, 0, 0.8) 100%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
`