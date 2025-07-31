//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
//__________ICONOS__________
// Iconos para un crud
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Icon_Green_120,Icon_White_120 } from '../styled/Icons';
import { Card_Menu_White_300_Button,Card_Menu_White,Card_Menu_Functions } from '../styled/Cards';
import { Container_Column_100_Center } from "../styled/Containers";
//____________IMPORT/EXPORT____________

// Componente para agregar cosas al menú
export default function Card_Add({
    route = '',
    onHandleModalView = () => {},
}){
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow] = useContext(SelectedRowContext); 
    // constantes con el valor de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            {isActionBlock || isSelectedRow !== null ? (
                <Card_Menu_White_300_Button disabled>
                    <Card_Menu_White isDisabled={isActionBlock || isSelectedRow !== null}>
                        <Card_Menu_Functions>
                            <Container_Column_100_Center style={{paddingTop: '100px'}}>
                                <Icon_White_120>
                                    <IoIosAddCircle/>
                                </Icon_White_120>
                            </Container_Column_100_Center>
                        </Card_Menu_Functions>
                    </Card_Menu_White>
                </Card_Menu_White_300_Button>
            ):(
                <Tooltip title='Agregar' placement="top">
                    <Card_Menu_White_300_Button 
                        onClick={() => {
                            onHandleModalView();
                            navigate(route,{ replace: true });
                        }}
                    >
                        <Card_Menu_White>
                            <Card_Menu_Functions>
                                <Container_Column_100_Center style={{paddingTop: '100px'}}>
                                    <Icon_Green_120>
                                        <IoIosAddCircle/>
                                    </Icon_Green_120>
                                </Container_Column_100_Center>
                            </Card_Menu_Functions>
                        </Card_Menu_White>
                    </Card_Menu_White_300_Button>
                </Tooltip>
            )}
        </>
    );
}