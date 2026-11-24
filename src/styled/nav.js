import styled from '@emotion/styled'


export const NavView=styled.nav`
    background: #004BBC;
    height:${props=>props.orientacion?'100%':'70px'};
    color: #fff;
    position: fixed;
    top: 0%;
    width: ${props=>props.orientacion?'60px':'100%'};
    z-index: 60;
    &::before{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        z-index: -1;
    }
    svg{
        height: 30px;
        width: 30px;
        cursor: pointer;
    }
    button{
        font-size: 0.95rem;
    }

    button,ul,svg{
        z-index: 10;
    }
    .nav-content{
    max-width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: ${props=>props.orientacion?'1.5rem 0':'0 1.875rem'};
    }
    .flex-end{
        justify-content: flex-end;
    }

    .flex-beetween{
      justify-content: space-between;
    }

    .flex-column{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .reg{
        height: auto;
        padding: 0.25rem 0;
        border-bottom: 1px solid #fff;
    }
    .log{
        min-width: 6.5rem;
        height: auto;
        line-height: 1.4;
        background: #2D47CF;
        text-align: center;
        border-radius: 1.25rem;
        padding: 0.5rem 1.25rem;
        transition: background 0.3s ease;

        &:hover{
          background:#1A2E9E;
        }
    }

    @media (max-width:1000px){
      
      &{
        width: ${props=>props.orientacion?'100%':'100%'};
        height:${props=>props.orientacion?'60px':'70px'};
        bottom:${props=>props.orientacion?'0':'unset'};
        top:${props=>props.orientacion?'unset':'0'};
      }

      .flex-column{
        flex-direction: row;
      }

      .nav-content{
        padding: ${props=>props.orientacion?'0px 25px':'0px 30px'};
      }
    
    }
`;

export const LoadingContent=styled.div`
    height: 100%;
    width: 100%;
    display:grid;
    place-items: center;
    background: #fff;
    color: #007aff;
    h1{
        font-size: 3rem;
        position: relative;
        z-index: 40;
    }

.spinner {
  position: absolute;
  width: 128px;
  height: 128px;
  top: calc(55% - 64px);
  left: calc(50% - 64px);
  transform: perspective(206px) rotateX(45deg);
}

.outer {
  box-sizing: border-box;
  animation: spin 3s linear infinite;
  height: 100%;
}

.inner {
  position: absolute;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: spin 1.8s ease-in-out infinite;
  
  &.tl {
    top: 0;
    left: 0;
    border-top: 2px solid #007aff;
    border-left: 4px solid #007aff;
  }
  &.tr {
    top: 0;
    right: 0;
    border-top: 2px solid #e04960;
    border-right: 4px solid #e04960;
  }
  &.br {
    bottom: 0;
    right: 0;
    border-bottom: 2px solid #007aff;
    border-right: 4px solid #007aff;
  }
  &.bl {
    bottom: 0;
    left: 0;
    border-bottom: 2px solid #e04960;
    border-left: 4px solid #e04960;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  
}
`
