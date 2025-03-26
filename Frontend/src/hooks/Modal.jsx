import { useContext } from "react";
import { modalContext } from '../contexts/VariablesProvider'

export const useModal = () => {
    const [isModal, setIsModal] = useContext(modalContext);
    return () => setIsModal(true);
}