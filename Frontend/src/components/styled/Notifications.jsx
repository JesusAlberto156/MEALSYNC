import styled from 'styled-components';
import { toast } from 'sonner';
import { HiHandRaised } from "react-icons/hi2";
import { AiFillWarning } from "react-icons/ai";

export const Toast_Styles = styled.div`
    .Blue {
        background-color: rgb(58,93,174);
        border-radius: 20px;
        border: 2px solid white;
    }

    .Yellow {
        background-color: rgb(174, 153, 58);
        border-radius: 20px;
        border: 2px solid white;
    }

    .Red {
        background-color: rgb(174, 58, 58);
        border-radius: 20px;
        border: 2px solid white;
    }

    .Light {
        border-radius: 20px;
        border: 2px solid black;
    }
`;

export const Alert_Greeting = (titulo,mensaje) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Blue',
        icon: <HiHandRaised style={{color:'rgb(255, 253, 208)',fontSize:'20px'}}/>,
    }
    );
};

export const Alert_Warning = (titulo,mensaje) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Yellow',
        icon: <AiFillWarning style={{color:'rgb(0, 0, 0)',fontSize:'20px'}}/>,
    }
    );
};

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
        className:'Light',
    });
};

export const Alert_Error = (titulo,mensaje) => {
    toast.error(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Red',
    });
}