export const max_lenght=(name,number)=>{

    if(name==="cantidad"){
        if (number.length<=8 && /^\d*$/.test(number)){
            console.log(number)
            return true
        }else{
            return false
        }
    }else{
        return true
    }
}