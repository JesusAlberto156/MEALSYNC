// Componentes de React externos
import styled from 'styled-components';
import { toast } from 'sonner';
// Icono para la alerta de saludo
import { HiHandRaised } from "react-icons/hi2";
// Icono para la alerta de advertencia
import { AiFillWarning } from "react-icons/ai";
// Icono para la alerta de error
import { BiSolidMessageAltError } from "react-icons/bi";
// ESTILOS PERSONALIZADOS DE ALERTAS
//____________STYLES____________
export const Alert_Styles = styled.div`
    .Blue_Dark {
        font-size: 14px;
        font-family: "Prompt", sans-serif;
        font-weight: 300;
        font-style: normal;
        background-color: rgb(94, 137, 238);
        border-radius: 50px;
        border: 2px solid white;
        color: white;
    }

    .Blue_Light {
        font-size: 14px;
        font-family: "Prompt", sans-serif;
        font-weight: 300;
        font-style: normal;
        background-color: rgb(37, 70, 147);
        border-radius: 50px;
        border: 2px solid black;
        color: white;
    }    

    .Yellow_Dark {
        font-size: 14px;
        font-family: "Prompt", sans-serif;
        font-weight: 300;
        font-style: normal;
        background-color: rgb(151, 128, 27);
        border-radius: 50px;
        border: 2px solid white;
        color: white;
    } 

    .Yellow_Light {
        font-size: 14px;
        font-family: "Prompt", sans-serif;
        font-weight: 300;
        font-style: normal;
        background-color: rgb(240, 203, 41);
        border-radius: 50px;
        border: 2px solid black;
        color: white;
    }  

    .Red_Dark {
        font-size: 14px;
        font-family: "Prompt", sans-serif;
        font-weight: 300;
        font-style: normal;
        background-color: rgb(229, 44, 44);
        border-radius: 50px;
        border: 2px solid white;
        color: white;
    }

    .Red_Light {
        font-size: 14px;
        font-family: "Prompt", sans-serif;
        font-weight: 300;
        font-style: normal;
        background-color: rgb(125, 27, 27);
        border-radius: 50px;
        border: 2px solid black;
        color: white;
    }

    .Verification {
        font-size: 14px;
        font-family: "Prompt", sans-serif;
        font-weight: 300;
        font-style: normal;
        border-radius: 50px;
        border: 2px solid white;
        background-color: black;
        color: white;
    }
`;
//____________STYLES____________
//____________GREETING____________
export const Alert_Greeting = (titulo,mensaje) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Blue_Dark',
        icon: <HiHandRaised style={{color:'rgb(255, 253, 208)',fontSize:'20px'}}/>,
    }
    );
};
export const Alert_Greeting_Dark = (titulo,mensaje) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Blue_Dark',
        icon: <HiHandRaised style={{color:'rgb(247, 215, 155)',fontSize:'20px'}}/>,
    }
    );
};
export const Alert_Greeting_Light = (titulo,mensaje) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Blue_Light',
        icon: <HiHandRaised style={{color:'rgb(252, 212, 137)',fontSize:'20px'}}/>,
    }
    );
};
//____________GREETING____________
//____________WARNING____________
export const Alert_Warning = (titulo,mensaje) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Yellow',
        icon: <AiFillWarning style={{color:'rgb(0, 0, 0)',fontSize:'20px'}}/>,
    }
    );
};
export const Alert_Warning_Dark = (titulo,mensaje) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Yellow_Dark',
        icon: <AiFillWarning style={{color:'rgb(240, 203, 41)',fontSize:'20px'}}/>,
    }
    );
};
export const Alert_Warning_Light = (titulo,mensaje) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Yellow_Light',
        icon: <AiFillWarning style={{color:'rgb(151, 128, 27)',fontSize:'20px'}}/>,
    }
    );
};
//____________WARNING____________
//____________ERROR____________
export const Alert_Error_Dark = (titulo,mensaje) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Red_Dark',
        icon: <BiSolidMessageAltError style={{color:'rgb(125, 27, 27)',fontSize:'20px'}}/>
    });
}
export const Alert_Error_Light = (titulo,mensaje) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Red_Light',
        icon: <BiSolidMessageAltError style={{color:'rgb(229, 44, 44)',fontSize:'20px'}}/>
    });
}
export const Alert_Error = (titulo,mensaje) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Red',
    });
}
//____________ERROR____________
//____________VERIICATION____________
export const Alert_Verification = (promesa,Verificacion) => {
    toast.promise(promesa,{
        loading: Verificacion,
        success: (msj) => {
            return `${msj}`;
        },
        error: (msj) => {
            return `${msj}`;
        },
        duration:1000,
        className:'Verification',
    });
};
//____________VERIICATION____________