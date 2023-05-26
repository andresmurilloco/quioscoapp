import { formatearDinero } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";
import Layout from "@/layout/Layout"
import { useEffect, useCallback } from "react";

export default function Total(){
    const {pedido, nombre, setNombre, colocarOrden, total} = useQuiosco();

    const comprobarPedido = useCallback(()=>{
        return pedido.length === 0 || nombre === '' || nombre.length<4;
    }, [pedido, nombre])

    useEffect(() => {
        comprobarPedido();
    }, [pedido, comprobarPedido])

    return(
        <Layout pagina='Resumen'>
            <h1 className="text-4xl font-black">Total y confirmación</h1>
            <p className="text-2xl my-10">Confirma tu pedido acontinuación</p>
            <form onSubmit={colocarOrden}>
                <div>
                    <label className="block uppercase text-slate-800 font-bold text-xl" htmlFor="nombre">Nombre:</label>
                    <input id="nombre" type="text" className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md" value={nombre} onChange={(e)=>setNombre(e.target.value)}></input>
                </div>
                <div className="mt-10 text-2xl">
                    <p>Total a pagar {''}<span className="font-bold">{formatearDinero(total)}</span></p>
                </div>
                <div className="mt-5">
                    <input type="submit" value='Confirmar pedido' className={`${comprobarPedido()? 'bg-indigo-100 ' : 'bg-indigo-600 hover:bg-indigo-800 '}w-full lg:w-auto px-5 py-2 rounded-md uppercase font-bold text-white text-center`} disabled={comprobarPedido()}></input>
                </div>
            </form>
        </Layout>
    )
}