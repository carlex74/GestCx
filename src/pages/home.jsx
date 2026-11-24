import React from 'react';
import Nav from '../components/Nav';
import { SectionInicio } from '../styled/user';
import inicioImg from '../components/img/imgInicio.jpg'

const HomePage = () => {
  
  return(
    <>
      <Nav view={'inicial'}/>
      <main>
        <SectionInicio>
            <div className='SectionInicio__infoMain'>
                <h1>GestCX</h1>
                <p className='infoMain__subtittle'>Gestor de Gastos</p>
                <div className='SectionInicio__underline'></div>
                <p>GestCx es una plataforma donde podras administrar tus gastos deforma rapida y facil, lea mas para saber todas las ventajas que ofrecemos como plataforma</p>
            </div>
            <div className='SectionInicio__imgContent'>
                <img  src={inicioImg}/>
            </div>
        </SectionInicio>
      </main>
    </>
  )
}
 
;
export default HomePage;