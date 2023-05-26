import { useState, useEffect, createContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { formatearDinero } from "@/helpers";

const QuioscoContext = createContext();

const QuioscoProvider = ({children})=>{
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const router = useRouter();
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const obtenerCategorias = async()=>{
        const {data} = await axios('api/categorias');
        setCategorias(data);
    }

    useEffect(() => {
        obtenerCategorias();
    }, [])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto)=>(producto.precio * producto.cantidad) + total, 0);
        setTotal(nuevoTotal);
    }, [pedido])

    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias])

    const handleClickCategoria = id =>{
        const categoria = categorias.filter(cat => cat.id === id);
        setCategoriaActual(categoria[0]);
        router.push('/')
    }

    const handleSetProducto = producto =>{
        setProducto(producto);
    }

    const handleChangeModal = () =>{
        setModal(!modal);
    }

    const handleAgregarPedido=({categoriaId, ...producto})=>{
        if(pedido.some(productoState => productoState.id === producto.id)){
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState);
            setPedido(pedidoActualizado);
            toast.success('Orden actualizada');
            setModal(false);
        } else {
            setPedido([...pedido, producto]);
            toast.success('Producto agregado a la orden');
            setModal(false)
        }
    }

    const handleEditarCantidades = id =>{
        const productoActualizar = pedido.filter(producto=>producto.id === id);
        setProducto(productoActualizar[0]);
        toast.success('Pedido actualizado')
        setModal(!modal);
    }

    const handleEliminarProducto=id=>{
        const pedidoActualizado = pedido.filter(producto=>producto.id !== id);
        toast.info('Producto eliminado')
        setPedido(pedidoActualizado);
    }

    const colocarOrden= async(e) =>{
        e.preventDefault();
        try {
            const {data}=await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})
            setCategoriaActual(categorias[0]);
            setPedido([]);
            setNombre('');
            setTotal(0);
            toast.success('Orden enviada!')
            setTimeout(() => {
                router.push('/')
            }, 300);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <QuioscoContext.Provider value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            producto,
            handleSetProducto,
            modal,
            handleChangeModal,
            handleAgregarPedido,
            pedido,
            handleEditarCantidades,
            handleEliminarProducto,
            nombre,
            setNombre,
            colocarOrden,
            total,
        }}>
            {children}
        </QuioscoContext.Provider>
    );
}

export {
    QuioscoProvider
}

export default QuioscoContext;