import React, { useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { ButtonAbsolute, ButtonAdd,MontosContent } from '../styled/user';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Close } from '../styled/info';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ModeIcon from '@mui/icons-material/Mode';
import CloseIcon from '@mui/icons-material/Close';
import Monto from '../components/Monto';
import { useAuth } from '../components/context/AuthContext';
import { db } from '../components/firebase/firebase';
import { collection, addDoc,doc, getDocs} from 'firebase/firestore';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { useValidate } from '../components/customHooks/useValidate';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { max_lenght } from './utilities/max_numero';
export default function UserHome() {
  
  const time = dayjs.extend(utc).utc().local();
  const fecha = `${time.$D}/${time.$M + 1}/${time.$y}`;

  const [open,setOpen]=useState(false)
  const [valuesMonto,setValuesMonto]=useState({
    titulo:'',
    desc:'',
    cantidad:'',
    categoria:'',
    movimientos:[],
    dataLabels:[
      {x:fecha,y:0}
    ]
  });
  const [arMontos,setArMontos]=useState([]);
  const [update,setUpdate]=useState(false);
  const [loadingData,setLoadingData]=useState(true);

  const {validateMonto,errorMonto,setErrorMonto}=useValidate()
  const navigate=useNavigate()
  const {user,loading,logout}=useAuth()
  const userEmail=user?.email || sessionStorage.getItem('correo');

  const docRef= userEmail ? doc(db,'usuarios',userEmail) : null;
  const subCollection= docRef ? collection(docRef,'montos') : null;

 const getMontos=async()=>{
   if (!subCollection) {
     setLoadingData(false);
     return;
   }
   try {
    const datos= await getDocs(subCollection)
    setArMontos(
      datos.docs.map(doc=>({...doc.data(),id:doc.id}))
    )
   } catch (error) {
    console.error(error);
   } finally {
    setLoadingData(false);
   }
 }

  const handleChangue=(e)=>{
    const name=e.target.name;
    const value=e.target.value;

    if (max_lenght(name,value)){
      setValuesMonto({...valuesMonto,[name]:value})
    }
   
  };

  const addMonto=async()=>{
    
    if(!validateMonto(valuesMonto)){
      await addDoc(subCollection,valuesMonto)
      setValuesMonto({
        titulo:'',
        desc:'',
        cantidad:'',
        categoria:'',
        movimientos:[],
        dataLabels:[
          {x:fecha,y:0}
        ]
      })
      setErrorMonto({})
      setUpdate(!update)
      setOpen(!open)
    }
  }

  useEffect(()=>{getMontos()},[update])
  if(loading || loadingData){
    return(
      <Loading/>
    )
  }else{
    return (
      <>
         {/* <Nav/> */}
         <Dialog open={open} sx={{overflow:'hidden'}}>
           <Close onClick={()=>setOpen(!open)}><CloseIcon/></Close>
           <DialogTitle>Nuevo Monto</DialogTitle>
           <DialogContent sx={{display:'flex',flexDirection:'column',gap:'15px',overflow:'hidden'}}>
            <TextField type="text" label="Titulo" variant='standard' error={errorMonto.titulo} helperText={errorMonto.titulo} name='titulo' value={valuesMonto.titulo} onChange={(e)=>handleChangue(e)}/>
            <TextField type="text" label="Descripcion" variant='standard' error={errorMonto.desc} helperText={errorMonto.desc} name='desc' value={valuesMonto.desc} onChange={(e)=>handleChangue(e)}/>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
               <AttachMoneyIcon sx={{ color: 'action.active'}} />
               <TextField  label="Cantidad" variant="standard" error={errorMonto.cantidad} helperText={errorMonto.cantidad} type="text"  min="0"  name='cantidad' value={valuesMonto.cantidad} onChange={(e)=>handleChangue(e)} />
             </Box>
            <FormControl sx={{width:'100%'}} error={errorMonto.categoria}>
               <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                 <Select label="Categoria" onChange={(e)=>handleChangue(e)} value={valuesMonto.categoria} name="categoria">
                   <MenuItem  value={'compras'}><ShoppingCartOutlinedIcon/> Compras</MenuItem>
                   <MenuItem  value={'productos'}><LocalMallOutlinedIcon/> Productos</MenuItem>
                   <MenuItem  value={'destinado'}><AttachMoneyIcon/>Destinado</MenuItem>
                 </Select>
                 {errorMonto.categoria?<FormHelperText>campo vacio</FormHelperText>:null}
             </FormControl>
             <Button variant='outlined' onClick={addMonto} startIcon={<ModeIcon/>}>Anotar</Button>
           </DialogContent>
         </Dialog>

         <MontosContent>
             <ButtonAdd className='shadow' onClick={()=>setOpen(!open)}><AddIcon  fontSize="large" /></ButtonAdd>
             {
               arMontos.map((e)=>(
                   <Monto key={e.id} info={e}/>
               ))
             }

             <ButtonAbsolute className='shadow' onClick={async function(){
              await logout()
              sessionStorage.removeItem('correo')
              navigate('/')
             }}>
                <LogoutIcon/>
                <span>Log Out</span>
             </ButtonAbsolute>
         </MontosContent>
      </>
 )
  }
}
