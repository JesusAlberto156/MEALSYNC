import { useContext } from "react";
import { modalOutLoginContext,modalAlertMedicoContext,modalShoppingCartContext,modalUserEnableContext } from "../contexts/ModalsProvider";

export const useModalOutLogin = () => {
    const [isModal, setIsModal] = useContext(modalOutLoginContext);
    return () => setIsModal(prev => !prev);
}
export const useModalAlertMedico = () => {
    const [isModal, setIsModal] = useContext(modalAlertMedicoContext);
    return () => setIsModal(prev => !prev);
}
export const useModalShoppingCart = () => {
    const [isModal, setIsModal] = useContext(modalShoppingCartContext);
    return () => setIsModal(prev => !prev);
}
export const useModalUserEnable = () => {
    const [isModal, setIsModal] = useContext(modalUserEnableContext);
    return () => setIsModal(prev => !prev);
}