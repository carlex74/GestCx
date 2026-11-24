import React from 'react'
import { MontoInfo } from '../styled/user'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useNavigate } from 'react-router-dom';

export default function Monto({info}) {
  const {titulo,desc,categoria,cantidad,id}=info
  const navigate=useNavigate();
 
  const mitadCantidad=(cantidad)=>{
    let cadena=''
    for(let i=0;i<6;i++){
      cadena+=cantidad[i]
    }

    return cadena
  }
  return (
    <MontoInfo className='shadow' onClick={()=>navigate(`/home/monto${id}`)}>
      <div className='categoria'>
        {categoria==='compras'?<ShoppingCartOutlinedIcon/>:categoria==='productos'?<LocalMallOutlinedIcon/>:<AttachMoneyIcon/>}
      </div>
      <div className='infoMonto'>
        <h2>{titulo}</h2>
        <h3>{desc}</h3>
        <h1>{cantidad.toString().length>6?'$'+mitadCantidad(cantidad.toString()) + '...':'$'+cantidad}</h1>
      </div>
    </MontoInfo>
  )
}
