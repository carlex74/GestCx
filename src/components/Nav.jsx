import React from 'react'
import { NavView } from '../styled/nav';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { useAuth } from './context/AuthContext';

export default function Nav({view}) {
  const navigate=useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout();
    sessionStorage.removeItem('correo');
    navigate('/');
  };
  
  if(view==='inicial'){
    return (
      <NavView>
         <div className='nav-content flex-end'>
            {
              !user?
                <>
                    <button className='log' onClick={()=>navigate('/login')}>Iniciar Sesion</button>
                    <button className='reg' onClick={()=>navigate('/register')}>Registrarse</button>
                </>:
                <button className='log' onClick={()=>navigate('/home')}>Ingresar</button>
            }
         </div>
      </NavView>
    )
  }else{
    return(
      <NavView orientacion={true}>
        <div className="nav-content flex-beetween flex-column" >
        <h1>GC</h1>

          <CalendarViewMonthIcon onClick={()=>navigate('/home')}/>
      

  
          <LogoutIcon onClick={handleLogout}/>
          
        

        </div>
      </NavView>
    )
  }
}
