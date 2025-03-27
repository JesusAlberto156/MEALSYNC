import { useContext } from "react";

import { modalContext } from '../contexts/VariablesProvider'
import { optionModalContext } from "../contexts/VariablesProvider";

export const useModal = () => {

    const [isModal, setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);

    const modal = (option) => {
        setIsModal(true);
        setIsOptionModal(option);
    }

    return modal;
}