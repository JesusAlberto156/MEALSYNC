//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios

// Contextos

// Hooks personalizados
import { useChangeModalView } from "../../../hooks/Views";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { ImExit } from "react-icons/im";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400_Light,Container_Button_Border_Light,Container_Form_400_Dark,Container_Button_Border_Dark } from "../../styled/Containers";
import { Text_Title_Fade_30_Light,Text_P_20_Light,Text_Title_Fade_30_Dark,Text_P_20_Dark } from "../../styled/Text";
import { Button_Icon_Blue_50_Light,Button_Icon_Red_50_Light,Button_Icon_Blue_50_Dark,Button_Icon_Red_50_Dark } from "../../styled/Buttons";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Modal para realizar el pedido de platillos/bebidas
export default function ShoppingCart(){
    // Constantes con el valor de los contextos 
    
    // useEffect con el titulo del modal
    useEffect(() => {
        document.title = "MEALSYNC_Menú_Carro_De_Compras"
    },[]);
    // Constantes con la funcionalidad de los hooks
    const chanheModalView = useChangeModalView();
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                            <Container_Form_400_Light>
                                    <Text_Title_Fade_30_Light>CARRO DE PEDIDOS</Text_Title_Fade_30_Light>
                                    <Text_P_20_Light>Veriicando datos...</Text_P_20_Light>
                                    <Container_Button_Border_Light>
                                        <Tooltip title="Cancelar" placement="top">
                                            <Button_Icon_Blue_50_Light onClick={() => chanheModalView('')}><MdCancel/></Button_Icon_Blue_50_Light>
                                        </Tooltip>
                                        <Tooltip title="Cerrar sesión" placement="top">
                                            <Button_Icon_Red_50_Light><ImExit/></Button_Icon_Red_50_Light>
                                        </Tooltip>
                                    </Container_Button_Border_Light>
                            </Container_Form_400_Light>
            </Container_Modal>
        </>
    );
}