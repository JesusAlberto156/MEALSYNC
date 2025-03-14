import { useContext } from "react";
import { modalOutLoginContext,modalAlertMedicoContext,modalShoppingCartContext } from "../contexts/ModalsProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";

export const useModalOutLogin = () => {
    const [isModal, setIsModal] = useContext(modalOutLoginContext);
    const [typeUser] = useContext(typeUserContext);

    if(typeUser === 'Cocinero' || typeUser === 'Nutriologo' || typeUser === 'Medico')document.title = "MEALSYNC_Menú_Cerrar_Sesión"
    if(typeUser === 'Administrador' || typeUser === 'Chef' || typeUser === 'Almacen')document.title = "MEALSYNC_Administración_Cerrar_Sesión"
    return () => setIsModal(prev => !prev);
}
export const useModalAlertMedico = () => {
    const [isModal, setIsModal] = useContext(modalAlertMedicoContext);
    document.title = "MEALSYNC_Inicio_Comprobación"
    return () => setIsModal(prev => !prev);
}
export const useModalShoppingCart = () => {
    const [isModal, setIsModal] = useContext(modalShoppingCartContext);
    return () => setIsModal(prev => !prev);
}