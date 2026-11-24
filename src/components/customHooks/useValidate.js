import React, { useState } from "react";

export const useValidate=()=>{
    const [error,setError]=useState({})
    const [errorMonto,setErrorMonto]=useState({})
    const validateMonto=(values)=>{
        const{titulo,desc,cantidad,categoria}=values

        if(titulo===''){
            setErrorMonto({titulo:'campo vacio'})
            return true
        }else if(desc===''){
            setErrorMonto({desc:'campo vacio'})
            return true
        }else if(cantidad===''){
            setErrorMonto({cantidad:'campo vacio'})
            return true
        }else if(categoria===''){
            setErrorMonto({categoria:true})
            return true
        }
    }
    
    const validateGasto=(values,maxValue)=>{
        const{desc,cantidad,categoria,tipo}=values

        if(desc===''){
            setError({desc:true})
            return true
        }else if(cantidad===''){
            setError({cantidad:'campo vacio'})
            return true
        }else if(Number(cantidad)>Number(maxValue) && tipo==='GASTO'){
            setError({cantidad:'la cantidad no puede superar el monto'})
            return true
        }else if(tipo===''){
            setError({tipo:true})
            return true
        }else if(categoria===''){
            setError({categoria:true})
            return true
        }
    }
    return{
        validateGasto,
        validateMonto,
        error,
        setError,
        errorMonto,
        setErrorMonto
    }
}