import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Todo } from '../styled/info';
export default function Movimiento({desc,categoria,tipo,cantidad,fecha}) {
  return (
    <Todo>
        <div>
        {categoria==='compras'?<ShoppingCartOutlinedIcon/>:categoria==='productos'?<LocalMallOutlinedIcon/>:<AttachMoneyIcon/>}
        <h3>{desc}</h3>
        </div>
        <h3>{tipo}</h3>
        <h3>${cantidad}</h3>
        <h3>{fecha}</h3>
    </Todo>
  )
}
