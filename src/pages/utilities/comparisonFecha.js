export const comparisonFecha=(fecha,ultimaFecha)=>{
    if(!ultimaFecha){
        return false
    }else if(fecha===ultimaFecha){
        return true
    }else{
        return false
    }
}