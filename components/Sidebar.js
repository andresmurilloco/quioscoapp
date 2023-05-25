import Image from "next/image"
import Categoria from "./Categoria";
import useQuiosco from "@/hooks/useQuiosco"

const Sidebar = () => {

  const {categorias} = useQuiosco();

  return (
    <>
      <div className="flex mb-12 justify-center">
        <Image width={100} height={100} src={"/assets/img/logo.svg"} alt="Imagen logotipo"></Image>
      </div>
      <nav>
        {categorias.map(categoria=>(
          <Categoria categoria={categoria} key={categoria.id}></Categoria>
        ))}
      </nav>
    </>
  )
}

export default Sidebar