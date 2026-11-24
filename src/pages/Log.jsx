import React, {useMemo, useState } from 'react'
import { useAuth } from '../components/context/AuthContext.jsx';
import {useNavigate } from 'react-router-dom';
import { Form, FormContent } from '../styled/forms.js';
import { collection, addDoc,setDoc,doc} from 'firebase/firestore';
import { db } from '../components/firebase/firebase';
import { Box, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
export default function Log({log}) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorEmail,setErrorEmail]=useState({});
  const [errorPassword,setErrorPassword]=useState({})
  const [showPassword,setShowPassword]=useState(false)
  const widhButton=useMemo(()=>{
    if( errorEmail.valid && errorPassword.valid){
      return 1
     }else if(errorEmail.valid || errorPassword.valid){
        return 0.5
     }else{
      return 0
     }
  },[errorEmail.valid,errorPassword.valid])

  const navigate=useNavigate();
  const reg=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  const { login,signup} = useAuth();

  const validEmail=(name,value)=>{
    if(name==='email' && !reg.test(value)){
      setErrorEmail({error:true,message:'correo invalido',valid:false})
    }else if(name==='email' && reg.test(value)){
      setErrorEmail({valid:true})
    }
  }

  const validPassword=(name,value)=>{
    if(name==='password' && value.length<6){
      setErrorPassword({error:true,message:'debe tener 6 caracteres o mas',valid:false})
    }else if(name==='password' && value.length>=6){
      setErrorPassword({valid:true})
    }
    
  }

  const handleChangue=(e)=>{
    const value=e.target.value;
    const name=e.target.name;
    setUser({...user,[name]:value})

    validPassword(name,value)
    validEmail(name,value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(errorEmail.valid && errorPassword.valid){
      try {
        await login(user.email, user.password).then(e=>{
          sessionStorage.setItem('correo',user.email)
        })
        navigate('/home')
      } catch (error) {
        console.log(error.code)
        if(error.toString().includes('auth/user-not-found')){
          setErrorEmail({error:true,message:'correo no existe',valid:false})
        }else{
          setErrorPassword({error:true,message:'contraseña incorrecta',valid:false})
        }
        /* alert(error.toString().includes('auth/user-not-found')?'usuario no existe':'contraseña incorrecta') */
      }
    }
  };

  const handleRegister=async(e)=>{
    e.preventDefault();
    if(errorEmail.valid && errorPassword.valid){
      try {
       await signup(user.email,user.password).then(e=>{
         setDoc(doc(db,'usuarios/',user.email),{
           email:user.email,
         })
       })
   
       sessionStorage.setItem('correo',user.email)
       navigate('/home')
      } catch (error) {
        if(error.code.toString().includes('auth/email-already-in-use')){
          setErrorEmail({error:true,message:'el correo ya esta en uso',valid:false})
        }
      }

    }

  }

  const resetChangueView=(path)=>{
      if (errorEmail.error){
        setErrorEmail({error:false,valid:true})
      }
      navigate(path)
  }

  if(log){
    return (
      <FormContent>
        <Form onSubmit={handleSubmit} widhButton={widhButton}>
        <h1>Iniciar Sesion</h1>
        <TextField variant='standard' error={errorEmail.error} helperText={errorEmail.message} type="text" label='Correo' name='email'  value={user.email}  onChange={(e)=>handleChangue(e)}/>
        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
          {showPassword? 
            <>
              <TextField variant='standard' error={errorPassword.error} helperText={errorPassword.message} type="text" label='Contraseña' name='password' value={user.password}  onChange={(e)=>handleChangue(e)} />
              <VisibilityOffIcon onClick={()=>setShowPassword(false)}/>
            </>
          :
            <>
               <TextField variant='standard' error={errorPassword.error} helperText={errorPassword.message} type="password" label='Contraseña' name='password' value={user.password}  onChange={(e)=>handleChangue(e)} />
               <VisibilityIcon onClick={()=>setShowPassword(true)} />
            </>
          }         
        </Box>
        <button className='Form__button'>Ingresar</button>
        <a onClick={()=>resetChangueView("/register")}> ¿No tienes cuenta? Registrate </a>
        <a onClick={()=>resetChangueView("/")}> Inicio</a>
      </Form>
      </FormContent>
  )
  }else{
    return (
      <FormContent>
      <Form action="" onSubmit={handleRegister}  widhButton={widhButton}>
        <h1>Registrate</h1>
        <TextField variant='standard' error={errorEmail.error} helperText={errorEmail.message} type="text" label='Correo' name='email' value={user.email}  onChange={(e)=>handleChangue(e)}/>
        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
          {showPassword? 
            <>
              <TextField variant='standard' error={errorPassword.error} helperText={errorPassword.message} type="text" label='Contraseña' name='password' value={user.password}  onChange={(e)=>handleChangue(e)} />
              <VisibilityOffIcon onClick={()=>setShowPassword(false)}/>
            </>
          :
            <>
               <TextField variant='standard' error={errorPassword.error} helperText={errorPassword.message} type="password" label='Contraseña' name='password' value={user.password}  onChange={(e)=>handleChangue(e)} />
               <VisibilityIcon onClick={()=>setShowPassword(true)} />
            </>
          }         
        </Box>
        <button className='Form__button'>Registrarse</button>
        <a onClick={()=>resetChangueView("/login")}>¿Ya tienes cuenta? Inicia Sesion</a>
        <a onClick={()=>resetChangueView("/")}>Inicio</a>
      </Form>
      </FormContent>
    )
  }
}
