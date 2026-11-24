import styled from "@emotion/styled";

export const InfoPanel=styled.div`
    width: 100%;
    min-height: 9.5rem;
    background: whitesmoke;
    border-radius: 1.5rem;
    display: flex;
    overflow: hidden;
    p{
        margin: 0;
    }
    .border{
        width: 1.25rem;
        flex-shrink: 0;
        background:#0094FF;
        border-radius: 1.5rem 0 0 1.5rem;
    }
    .infoPanelCont{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.25rem;
        .infoPanel__div{
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            h1{
                font-size: 2rem;
                line-height: 1.2;
            }
        }
        & div+div{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            button{
                padding: 0.5rem 1rem;
                border-radius: 1rem;
                transition: background 0.3s ease;
                &:hover{
                    background: rgba(199, 199, 199, 0.8);
                }
            }
        }
    }

    @media (max-width:500px){
        .infoPanelCont{
            grid-template-columns: 1fr;
        }
    }
`;

export const PanelContent=styled.div`
  width: 100%;
  display: flex;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
`

export const MovimientosContent=styled.div`
    width: 100%;
    height: 18.75rem;
    background: #004BBC;
    border-radius: 1.5rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .tituloContent{
        display: grid;
        place-items: center;
        color: #fff;
        width: 100%;
        padding: 0.75rem 1rem;
        h1{
            font-size: 1.25rem;
        }
    }
    .movimientosContent{
        flex: 1;
        width: 100%;
        background: whitesmoke;
        overflow-y: auto;
        &::-webkit-scrollbar{
            display: none;
        }
    }

    @media (max-width:340px){
        .tituloContent h1{
            font-size: 1rem;
        }
    }
`;

export const Todo=styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    align-items: center;
    gap: 0.625rem;
    min-height: 3.25rem;
    border-bottom: 1px solid #000;
    padding: 0.5rem 0.75rem;
    & div{
        display: flex;
        gap: 0.35rem;
        align-items: center;
    }
    h3{
        text-align: center;
        font-size: 0.9rem;
    }

    @media (max-width:340px){
        gap: 0.35rem;
        padding: 0.4rem 0.35rem;
    }
`;

export const Close=styled.button`
    height: auto;
    width: auto;
    position: absolute;
    right: 0.75rem;
    top: 0.75rem;
`

export const GraficoContent=styled.div`
    width: 60%;
    max-height: 100%;
    margin: 0.625rem auto;
    padding: 1rem;
    background: whitesmoke;
    z-index: 50;
    border-radius: 1.25rem;
    grid-column: 1/3;


    @media (max-width:1000px){
        &{
            grid-column:1;
            margin: 0 auto;
            width: 74%;
        }

        
    }

    @media (max-width:720px){
        &{
            width: 95%;
            padding: 0px;
        }
    }

    @media (max-width:340px){
        canvas{
           height: 100% !important;
           width: 100%;
        }
    }
`;