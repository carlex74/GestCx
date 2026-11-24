import React from 'react'
import { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const options={
    fill:true,
    responsive:true,
    scales:{
        y:{
            min:0
        }
    },
    plugins:{
        legend:{
            display:false
        },
        title:{
            display:true,
            text:'Gastos de los Ultimos 8 movimientos'
        }
    },
    parsing: {
        xAxisKey: 'x',
        yAxisKey: 'y'
    },
}


const  y=[{x:'20/19/30',y:200},{x:'20/19/30',y:100},{x:'20/19/30',y:100},{x:'20/19/30',y:150}]

export default function Grafico({labels}) {
   const data= useMemo(function(){
    return {
        type:'line',
        datasets:[
            {
                label: 'Gastos',
                data: labels.map(e=>e.y),
                tension:0.2,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor:"rgba(75, 192, 192,.3)",
                segment:{
                    backgroundColor:function(context){  
                        if(context.p0.x<context.p1.x){
                            return  "rgba(75, 192, 192,.3)"
                        }else{
                            return "rgb(150, 22, 0)";
                        }
                    }
                }
            }
        ],labels:labels.map(e=>e.x)
    };
   },[labels]) 

   return <Line data={data} options={options}/>
}
