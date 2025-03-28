import { useContext } from "react";

import { usersContext } from "../contexts/UsersProvider";
import { statusAllContext } from '../contexts/StatusProvider';
import { selectContext,radioContext } from "../contexts/VariablesProvider";

export const useFilteredRecordsHasStatus = () => {

    const [isUsers] = useContext(usersContext);
    const [isStatusAll] = useContext(statusAllContext);

    const filteredRecordsHasStatus = isUsers.filter((data) => {
        return !isStatusAll.some(status => status.idusuario === data.idusuario);
    });

    return filteredRecordsHasStatus;
}

export const useHandleSelectChange = () => {

    const [isSelect,setIsSelect] = useContext(selectContext);

    const handleSelectChange = (selectOption) => {
        setIsSelect(selectOption);
    }

    return handleSelectChange;
}

export const useHandleRadioChange = () => {

    const [isRadio,setIsRadio] = useContext(radioContext);
    
    const handleRadioChange = (radioOption) => {
        setIsRadio(radioOption.target.value);
    }

    return handleRadioChange;
}