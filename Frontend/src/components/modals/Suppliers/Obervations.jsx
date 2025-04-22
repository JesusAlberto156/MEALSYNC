
import { useContext,useEffect,useState,useRef } from "react";
import { Tooltip } from "@mui/material";

import { MdCancel } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { ModalViewContext,ModalContext,ThemeModeContext } from "../../../contexts/ViewsProvider";
import { ItemDateContext } from "../../../contexts/ChartsProvider";
import { ObservationsContext,SuppliersContext } from "../../../contexts/SuppliersProvider";

import { Container_Modal,Container_Form_450,Container_Form_Header,Container_Form_Content,Container_Column_90_Center,Container_Row_90_Center,Container_Row_100_Left,Container_Column_Border_90_Center } from "../../styled/Containers";
import { Button_Icon_Blue_180,Button_Icon_Blue_40x100 } from "../../styled/Buttons";
import { Icon_White_22,Icon_Red_16,Icon_Green_16,Icon_Button_Black_22 } from "../../styled/Icons";
import { Text_Title_30,Text_Title_20,Text_A_16 } from "../../styled/Text";

export default function Observations_Suppliers(){

    const [themeMode] = useContext(ThemeModeContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isItemDate,setIsItemDate] = useContext(ItemDateContext);
    const [isSuppliers,setIsSuppliers] = useContext(SuppliersContext);
    const [isObservations,setIsObservations] = useContext(ObservationsContext);

    const [Suppliers,setSuppliers] = useState([]);

    const scrollRef = useRef(null);
    const scrollIntervalRef = useRef(null);

    const startScrolling = (direction) => {
    scrollIntervalRef.current = setInterval(() => {
        if (scrollRef.current) {
        scrollRef.current.scrollLeft += direction === 'right' ? 10 : -10;
        }
    }, 64); // ~60fps
    };

    const stopScrolling = () => {
    clearInterval(scrollIntervalRef.current);
    };

    useEffect(() => {
        if(isObservations.length !== 0 && isSuppliers.length !== 0){
            const dateMap = [];

            isObservations.forEach((observation) => {
                const fecha = new Date(observation.fecha);
                
                const supplier = isSuppliers.find((supplier) => supplier.idproveedor === observation.idproveedor);

                const year = fecha.getFullYear();
                const month = fecha.getMonth();
                const day = fecha.getDate();
    
                if (year === isItemDate.year && month === isItemDate.month && day === isItemDate.day) {
                    dateMap.push({
                        proveedor: supplier.nombre,
                        observacion: observation.observacion,
                        calificacion: observation.calificacion,
                    });
                }
            });

            setSuppliers(dateMap);
        }
    },[]);

    return(
        <>  
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_450 ThemeMode={themeMode}>
                            <Container_Form_Header>
                                <Container_Row_90_Center>
                                    <Text_Title_30 ThemeMode={themeMode}>Observaciones del {isItemDate.day}/{isItemDate.month+1}/{isItemDate.year}</Text_Title_30>
                                </Container_Row_90_Center>
                            </Container_Form_Header>
                            <Container_Row_90_Center>
                                <Tooltip title='Anterior' placement='top'>
                                    <Icon_Button_Black_22 ThemeMode={themeMode} onMouseDown={() => startScrolling('left')}
                                                                                onMouseUp={stopScrolling}
                                                                                onMouseLeave={stopScrolling}
                                                                                onTouchStart={() => startScrolling('left')}
                                                                                onTouchEnd={stopScrolling}>
                                        <IoIosArrowBack/>
                                    </Icon_Button_Black_22>
                                </Tooltip>  
                                <Container_Form_Content ref={scrollRef}>
                                    {Suppliers.map((supplier,index) => (
                                        <Container_Column_Border_90_Center ThemeMode={themeMode} key={index}>
                                            <Text_Title_20 ThemeMode={themeMode}>{supplier.proveedor} 
                                            </Text_Title_20>
                                            <Container_Row_90_Center>
                                            {supplier.calificacion === 5 ? (
                                                    <>
                                                        <Icon_Green_16 ThemeMode={themeMode}><IoStar/></Icon_Green_16>
                                                        <Icon_Green_16 ThemeMode={themeMode}><IoStar/></Icon_Green_16>
                                                        <Icon_Green_16 ThemeMode={themeMode}><IoStar/></Icon_Green_16>
                                                        <Icon_Green_16 ThemeMode={themeMode}><IoStar/></Icon_Green_16>
                                                        <Icon_Green_16 ThemeMode={themeMode}><IoStar/></Icon_Green_16>
                                                    </>
                                                ):(
                                                    supplier.calificacion === 4 ? (
                                                        <>
                                                            <IoStar/>
                                                            <IoStar/>
                                                            <IoStar/>
                                                            <IoStar/>
                                                        </>
                                                    ):(
                                                        supplier.calificacion === 3 ? (
                                                            <>
                                                                <IoStar/>
                                                                <IoStar/>
                                                                <IoStar/>
                                                            </>
                                                        ):(
                                                            supplier.calificacion === 2 ? (
                                                                <>
                                                                    <IoStar/>
                                                                    <IoStar/>
                                                                </>
                                                            ):(
                                                                supplier.calificacion === 1 ? (
                                                                <>
                                                                        <Icon_Red_16 ThemeMode={themeMode}><IoStar/></Icon_Red_16>
                                                                </> 
                                                                ):(
                                                                    <></>
                                                                )
                                                            )
                                                        )
                                                    )
                                                )}
                                            </Container_Row_90_Center>
                                            <Container_Row_100_Left>
                                                <Text_A_16 ThemeMode={themeMode}>{supplier.observacion}</Text_A_16>
                                            </Container_Row_100_Left>
                                        </Container_Column_Border_90_Center>
                                    ))}
                                </Container_Form_Content>
                                <Tooltip title='Siguiente' placement='top'>
                                    <Icon_Button_Black_22 ThemeMode={themeMode} onMouseDown={() => startScrolling('right')}
                                                                                onMouseUp={stopScrolling}
                                                                                onMouseLeave={stopScrolling}
                                                                                onTouchStart={() => startScrolling('right')}
                                                                                onTouchEnd={stopScrolling}>
                                        <IoIosArrowForward/>
                                    </Icon_Button_Black_22>
                                </Tooltip>
                            </Container_Row_90_Center>
                            <Container_Row_90_Center>
                                <Tooltip title='Cancelar' placement="top">
                                    <Button_Icon_Blue_180 ThemeMode={themeMode}>
                                        <Icon_White_22>
                                            <MdCancel/>
                                        </Icon_White_22>
                                    </Button_Icon_Blue_180>
                                </Tooltip>
                            </Container_Row_90_Center>
                        </Container_Form_450>
                    </Container_Modal>  
                </>
            ):(
                <></>
            )}
        </>
    );
}