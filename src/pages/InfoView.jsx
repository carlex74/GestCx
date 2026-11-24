import React from 'react'
import Nav from '../components/Nav'
import { Close, GraficoContent, InfoPanel, MovimientosContent, PanelContent } from '../styled/info';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box } from '@mui/system';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ModeIcon from '@mui/icons-material/Mode';
import Movimiento from '../components/Movimiento';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import Grafico from '../components/Grafico';
import { useParams } from 'react-router-dom';
import { db } from '../components/firebase/firebase';
import { getDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useValidate } from '../components/customHooks/useValidate';
import { useAuth } from '../components/context/AuthContext';
import Loading from '../components/Loading';
import { max_lenght } from './utilities/max_numero';
import Input_usuario from '../components/Input_usuario';
import { comparisonFecha } from './utilities/comparisonFecha';
export default function InfoView() {
    const time = dayjs.extend(utc).utc().local();
    const fecha = `${time.$D}/${time.$M + 1}/${time.$y}`;

    const [show, setShow] = useState(false);
    const [values, setvalues] = useState({
        desc: '',
        cantidad: '',
        categoria: '',
        tipo: '',
        fecha: fecha
    })
    const [movimientos, setMovimientos] = useState([])
    const [labels, setLabels] = useState([{
        x: fecha,
        y: 0
    }]);
    const [montoInfo, setMontoInfo] = useState({});
    const [update, setUpdate] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const { id } = useParams();
    const { validateGasto, error, setError } = useValidate();
    const {user, loading}=useAuth()

    const userEmail = user?.email || sessionStorage.getItem('correo');

    const docRef = userEmail ? doc(db, 'usuarios', userEmail) : null;
    const subCollection = docRef ? collection(docRef, 'montos') : null;
    const subDoc = subCollection ? doc(subCollection, id) : null;

    const updateData = () => {
        setUpdate(!update)
    }

    const obtenerMonto = async () => {
        if (!subDoc) {
            setLoadingData(false);
            return;
        }
        try {
            const getDataMonto = await getDoc(subDoc);
            const infoMonto = getDataMonto.data();
            if (!infoMonto) return;

            const arLabels = infoMonto.dataLabels || [];

            setMontoInfo({ ...infoMonto });

            setMovimientos(infoMonto.movimientos || []);
            setLabels(arLabels.map(e => (
                { x: e.x, y: e.y }
            )))
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingData(false);
        }
    }

    const handleChangue = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if(max_lenght(name,value)){
            setvalues({ ...values, [name]: value })
            setError({[name]:false})
        }
    }

    const addMovimientos = async () => {

        let dataLabels=[];

        if (!validateGasto(values,montoInfo.cantidad)) {
            const operacion = values.tipo === 'GASTO' ? Number(montoInfo.cantidad) - Number(values.cantidad) : Number(montoInfo.cantidad) + Number(values.cantidad);
            const currentLabels = montoInfo.dataLabels || [];
            if (comparisonFecha(fecha,movimientos[0]?.fecha)){
                dataLabels = currentLabels.map((item, idx) =>
                    idx === currentLabels.length - 1
                        ? { ...item, y: Number(item.y) + Number(values.cantidad) }
                        : item
                );
            }else if(currentLabels.length>8){
                dataLabels = [...currentLabels.slice(1), { x: values.fecha, y: values.cantidad }];
            }else{
                 dataLabels = [...currentLabels, { x: values.fecha, y: values.cantidad }];
            }
            const data = { movimientos: [values,...movimientos], cantidad: operacion, dataLabels };
            await updateDoc(subDoc, data).then(e => {
                setvalues({
                    desc: '',
                    cantidad: '',
                    categoria: '',
                    tipo: '',
                    fecha: fecha
                })
                setError({})
                setShow(!show)
                updateData()
            });
        }
    }

    useEffect(() => { obtenerMonto() }, [update])
    
    if(loading || loadingData){
        return <Loading/>
    }else{
        return (
            <>
            <Input_usuario show={show} setShow={setShow} values={values} error={error} addMovimientos={addMovimientos} handleChangue={handleChangue} />
    
                <div className='info'>
                <Nav />
                   <div className="content_info">
                        <PanelContent>
                            
                            <InfoPanel className='shadow'>
                                <div className='border'></div>
                                <div className='infoPanelCont'>
                                    <div className='infoPanel__div'>
                                        <h1>{montoInfo.titulo}</h1>
                                        <p>{montoInfo.desc}</p>
                                        <h1>${montoInfo.cantidad}</h1>
                                        <p>Limite de Gasto: Sin limite</p>
                                    </div>
                                    <div>
                                        <button onClick={() => setShow(!show)} className='shadow'>Nuevo Movimiento</button>
                                    </div>
                                </div>
                            </InfoPanel>

                        </PanelContent>

                        <div className='contentMov'>
                            <MovimientosContent className='shadow'>
                                <div className='tituloContent'>
                                    <h1>Ultimos Movimientos</h1>
                                </div>
                                <div className='movimientosContent'>
                                    {
                                        movimientos.map((e, i) => (
                                            <Movimiento desc={e.desc} categoria={e.categoria} tipo={e.tipo} cantidad={e.cantidad} fecha={e.fecha} key={i} />
                                        ))
                                    }
                                </div>
                            </MovimientosContent>
                        </div>

                        <GraficoContent className='shadow'>
                            <Grafico labels={labels} />
                        </GraficoContent>
                   </div>
                </div>
            </>
        )
    }
}
