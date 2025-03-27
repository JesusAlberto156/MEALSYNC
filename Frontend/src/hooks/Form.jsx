import { useContext } from "react";

import { usersContext } from "../contexts/UsersProvider";
import { statusAllContext } from '../contexts/StatusProvider';

export const useFilteredRecordsHasStatus = () => {

    const [isUsers] = useContext(usersContext);
    const [isStatusAll] = useContext(statusAllContext);

    const filteredRecordsHasStatus = isUsers.filter((data) => {
        return !isStatusAll.some(status => status.idusuario === data.idusuario);
    });

    return filteredRecordsHasStatus;
}

export const useHandleSelectChange = () => {

    const handleSelectChange = (selectedOption) => {
        console.log(selectedOption);
    }

    return handleSelectChange;
}