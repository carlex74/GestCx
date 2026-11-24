import styled from "@emotion/styled";
import fondoInicio from "../components/img/fondoInicio.png";

export const ButtonAdd=styled.button`
    min-height: 8.5rem;
    width: 15.5rem;
    padding: 1rem;
    background: #fff;
    border-radius: 1rem;
    display: grid;
    place-items: center;
    transition: background 0.3s ease;
    &:hover{
        background: rgba(199, 199, 199);
    }
`;

export const MontoInfo=styled.div`
    min-height: 8.5rem;
    width: 15.5rem;
    background: #0094FF;
    border-radius: 1rem;
    display: flex;
    overflow: hidden;
    cursor: pointer;
    .categoria{
        width: 2.5rem;
        flex-shrink: 0;
        display: grid;
        place-items: center;
        color: #fff;
    }
    .infoMonto{
        padding: 0.875rem 1rem;
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.35rem;
        background: #fff;
        transition: background 0.3s ease;
        h2{
            font-size: 1.2rem;
            line-height: 1.25;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        h3{
            font-size: 0.875rem;
            line-height: 1.3;
            color: #555;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        h1{
            font-size: 1.65rem;
            line-height: 1.2;
            margin-top: 0.25rem;
        }

        &:hover{
            background: rgba(199, 199, 199);
        }
    }
`;

export const SectionInicio=styled.section`
    min-height: 100vh;
    padding: 5.5rem 1.5rem 2rem;
    color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    position: relative;
    background-image: url(${fondoInicio});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    
    &:before{
        content: '';
        position: absolute;
        inset: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(180deg,transparent,40%,rgba(7,80,189,.9));
    }

    h1{
        font-size: 3.75rem;
        font-weight: 500;
        line-height: 1.1;
        margin-bottom: 0.25rem;
    }
    .infoMain__subtittle{
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
    }
    
    .SectionInicio__infoMain{
        max-width: 25rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        z-index: 50;
    }
    .SectionInicio__underline{
        width: 100%;
        height: 0.3rem;
        background: #fff;
        border-radius: 0.3rem;
    }

    .SectionInicio__imgContent{
        z-index: 70;
        max-width: 43.75rem;
        width: 100%;
        display: grid;
        place-items: center;
        
        img{
            border-radius: 0.5rem;
        }
    }
`;

export const MontosContent=styled.div`
    width: 100%;
    padding: 1.5rem;
    display: flex;
    gap: 1.25rem;
    flex-wrap: wrap;
    align-items: stretch;

    @media (max-width: 600px) {
        justify-content: center;
        padding: 1rem;
    }
`

export const ButtonAbsolute=styled.button`
    position: fixed;
    padding: 0.625rem;
    display: flex;
    height: 3rem;
    width: 3rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: 50%;
    bottom: 1.5rem;
    right: 1.5rem;
    background: #fff;
    transition: all 0.3s ease;
    span{
        display: none;
        font-weight: bolder;
        white-space: nowrap;
    }
    &:hover{
        padding: 0.625rem 1.25rem;
        span{
            display: block;
        }
        width: 9.5rem;
        border-radius: 6.25rem;
    } 
`