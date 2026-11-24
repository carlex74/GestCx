import styled from "@emotion/styled";
import dashboardImg from "../components/img/dashboard.jpg";

export const FormContent=styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 1.5rem;
    background-image: url(${dashboardImg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    place-items: center;
    position: relative;

    &:before{
        content: '';
        position: absolute;
        inset: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(180deg,transparent,30%,rgba(7,80,189,.6));
    }
`

export const Form=styled.form`
    margin: 0 auto;
    width: min(90vw, 21rem);
    min-height: 22rem;
    border-radius: 0.75rem;
    background: #fff;
    padding: 1.75rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    z-index: 30;
    h1{
        text-align: center;
        font-size: 1.75rem;
    }
    a{
        margin: 0 auto;
        transition: all 0.3s ease;
        width: max-content;
        font-size: 0.9rem;
        cursor: pointer;
        &:hover{
            border-bottom: 1px solid #007aff;
        }
    }
    div{
        width: 100%;
    }

    svg{
        cursor: pointer;
    }
    .Form__button{
        text-align: center;
        padding: 0.625rem 1rem;
        color: #fff;
        border-radius: 0.625rem;
        font-size: 1.25rem;
        background-size: 400%;
        overflow: hidden;
        position: relative;
        background: rgba(128, 128, 128, 0.5);
        transition: all 0.5s;
        cursor:${props=>props.widhButton===1?'pointer':'initial'};
    
        &::before{
            content: '';
            position: absolute;
            top: 0%;
            left: 0%;
            height: 100%;
            width: 100%;
            transform: scaleX(${props=>props.widhButton});
            transform-origin: 0 100%;
            border-radius: inherit;
            background: blue;
            transition: all 1s;
            z-index: -1;
        }
        
        ${props=>props.widhButton===1?`
            &:hover{
                box-shadow: 0px 2px 5px #000;
            }
        `:''}
    }
`