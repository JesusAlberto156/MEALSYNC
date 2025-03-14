import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Tooltip } from "@mui/material";
import { Background_Error } from "../components/styled/Backgrounds";
import { Toast_Styles,Alert_Error, Alert_Verification } from "../components/styled/Notifications";
import { Title_Fade_Error,Text_Error } from "../components/styled/Text";
import { Settings_Rotate } from "../components/styled/Settings";
import { Container_Title_Error } from "../components/styled/Containers";
import { Button_White_Error } from "../components/styled/Buttons";
import { Logo_Error } from '../components/styled/Imgs'
import { Icon_Warning_Error } from "../components/styled/Icons";
import { IoSettings } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

export default function Error(){

    const navigate = useNavigate();

    useEffect(() => {
        document.title='MEALSYNC_Error'
        Alert_Error('MEALSYNC','¡Error, página no encontrada!...','Red')
    })

    const Return = () => {
        const promise = new Promise(async (resolve,reject) => {
            try{
                setTimeout(() => {
                    resolve('¡Página encontrada!...')
                },1000)
                setTimeout(() => {
                    navigate('/',{replace: true});
                },2000)
            } catch (error) {
                reject('¡Ocurrio un error inseperado!...');
            }
        });

        Alert_Verification(promise,'Buscando página...','Light')
    }

    return(
        <>
            <Background_Error>
                <Icon_Warning_Error>
                    <IoIosWarning/>
                </Icon_Warning_Error>
                <Container_Title_Error>
                    <Title_Fade_Error>Ooops...</Title_Fade_Error>
                    <Settings_Rotate><IoSettings/></Settings_Rotate>
                </Container_Title_Error>
                <Text_Error>Página no encotrada...</Text_Error>
                <Tooltip title='Regresar' placement="top">
                    <Button_White_Error onClick={Return}><FaHome/></Button_White_Error>
                </Tooltip>
                <Logo_Error/>
                <Toast_Styles>
                    <Toaster
                    visibleToasts={3}
                    richColors
                    theme='light'
                    position='top-right'
                    />
                </Toast_Styles>
            </Background_Error>
        </>
    );
}