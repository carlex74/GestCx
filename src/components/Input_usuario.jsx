import React from 'react'
import { Close} from '../styled/info';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box } from '@mui/system';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ModeIcon from '@mui/icons-material/Mode';

export default function Input_usuario({show,setShow,values,error,addMovimientos,handleChangue}) {
  return (
    <Dialog open={show}>
        <Close onClick={() => setShow(!show)}><CloseIcon /></Close>
        <DialogTitle>Nuevo Movimiento</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '15px', overflow: 'hidden' }}>
            <TextField type="text" error={error?.desc} label="Descripcion" inputProps={{ maxLength: 12 }}   variant='standard' helperText={error.desc?'campo vacio':null} value={values.desc} name='desc' onChange={(e) => handleChangue(e)} />
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AttachMoneyIcon sx={{ color: 'action.active' }} />
                <TextField label="Cantidad" variant="standard"  error={error.cantidad} helperText={error.cantidad?error.cantidad:null} type="text" value={values.cantidad} name='cantidad' onChange={(e) => handleChangue(e)} />
            </Box>
            <FormControl error={error.tipo}>
                <InputLabel>Tipo</InputLabel>
                <Select label="Tipo" name='tipo'  onChange={(e) => handleChangue(e)} value={values.tipo}>
                    <MenuItem value='GASTO'>GASTO</MenuItem>
                    <MenuItem value='RECARGA'>RECARGA</MenuItem>
                </Select>
                {error.tipo?<FormHelperText>campo vacio</FormHelperText>:null}
            </FormControl>
            <FormControl sx={{ width: '100%' }}   error={error.categoria}>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select label="Categoria"   onChange={(e) => handleChangue(e)} value={values.categoria} name="categoria">
                    <MenuItem value={'compras'}><ShoppingCartOutlinedIcon /> Compras</MenuItem>
                    <MenuItem value={'productos'}><LocalMallOutlinedIcon /> Productos</MenuItem>
                    <MenuItem value={'destinado'}><AttachMoneyIcon />Destinado</MenuItem>
                </Select>
                {error.categoria?<FormHelperText>campo vacio</FormHelperText>:null}
            </FormControl>
            <Button variant='outlined' startIcon={<ModeIcon />} onClick={addMovimientos}>Anotar</Button>
        </DialogContent>
     </Dialog>
  )
}
