//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react"
// Contextos
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { SelectedOptionOrderContext,SelectedOptionOrderDirectionContext } from "../../contexts/SelectedesProvider";
// Hooks personalizados
import { TableActions } from "../../hooks/Tables";
//__________ICONOS__________
// Iconos utilizados en las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaSortNumericUp } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";
import { CgArrowsV } from "react-icons/cg"
//__________ICONOS__________
// Estilos personalizados
import { Table_Head_Th,Table_Container_Item_Center } from "../styled/Tables";
import { Icon_Button_White_16 } from "../styled/Icons";
//____________IMPORT/EXPORT____________

export const Table_Title_Normal = ({title = ''}) => {
    // Estructura del componente
    return(
        <>
            <Table_Head_Th>
                {title}
            </Table_Head_Th>
        </>
    );
}
export const Table_Title_Text = ({
    order = '',
    title = '',
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    // constantes con el valor de los hooks
    const {ToggleOrder,ToggleOrderDirection} = TableActions();
    // Estructura del componente
    return(
        <>
            <Table_Head_Th>
                <Table_Container_Item_Center>
                    <Icon_Button_White_16 
                        disabled={isActionBlock}
                        onClick={() => {
                            ToggleOrder(order)
                            ToggleOrderDirection()
                        }}
                    >
                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === order ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === order ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} {title}
                    </Icon_Button_White_16>
                </Table_Container_Item_Center>
            </Table_Head_Th>
        </>
    );
}
export const Table_Title_Number = ({
    order = '',
    title = '',
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    // constantes con el valor de los hooks
    const {ToggleOrder,ToggleOrderDirection} = TableActions();
    // Estructura del componente
    return(
        <>
            <Table_Head_Th>
                <Table_Container_Item_Center>
                    <Icon_Button_White_16 
                        disabled={isActionBlock}
                        onClick={() => {
                            ToggleOrder(order)
                            ToggleOrderDirection()
                        }}
                    >
                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === order ? <FaLongArrowAltUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === order ? <FaLongArrowAltDown/> : <CgArrowsV/>} {title}
                    </Icon_Button_White_16>
                </Table_Container_Item_Center>
            </Table_Head_Th>
        </>
    );
}
export const Table_Title_Numeric = ({
    order = '',
    title = '',
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    // constantes con el valor de los hooks
    const {ToggleOrder,ToggleOrderDirection} = TableActions();
    // Estructura del componente
    return(
        <>
            <Table_Head_Th>
                <Table_Container_Item_Center>
                    <Icon_Button_White_16 
                        disabled={isActionBlock}
                        onClick={() => {
                            ToggleOrder(order)
                            ToggleOrderDirection()
                        }}
                    >
                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === order ? <FaSortNumericUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === order ? <FaSortNumericUpAlt/> : <CgArrowsV/>} {title}
                    </Icon_Button_White_16>
                </Table_Container_Item_Center>
            </Table_Head_Th>
        </>
    );
}