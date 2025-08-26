//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { MenuTypesContext,DeletedMenuTypesContext,MenuTypeUbicationsContext } from "../../contexts/MenusProvider";
import { SurgeriesContext,OrderDoctorContext,OrderDoctorAddContext,OrderKitchenAddContext } from "../../contexts/OrdersProvider";
import { TextFieldsOrderDoctorContext,TextFieldsOrderKitchenContext,TextFieldsSearchOrdersContext } from "../../contexts/FormsProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { DishesContext } from "../../contexts/DishesProvider";
import { SideDishesContext } from "../../contexts/SideDishesProvider";
import { DrinksContext } from "../../contexts/DrinksProvider";
import { ModalContext,ModalViewContext,SidebarViewContext } from "../../contexts/ViewsProvider";
import { KeyContext } from "../../contexts/KeyProvider";
//  Hooks personalizados
import { HandleNavbarView,HandleSidebarView } from "../Views";
// Estilos personalizados
import { Alert_Sonner_Promise } from "../../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para filtrar los menus agregados en cocina ✔️
export const FilteredRecordsMenuTypesKitchen = () => {
    // Constantes con el valor de los contextos 
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isDeletedMenuTypes] = useContext(DeletedMenuTypesContext); 
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext);
    // Función del hook
    const filteredRecordsMenuTypes = isMenuTypes.filter((data) => {
        const isDeleted = isDeletedMenuTypes.some(type => type.idtipo === data.idtipo);
        if (isDeleted) return false;
        
        return isMenuTypeUbications.some(type => type.idtipo === data.idtipo && type.idubicacion === 1) ? true : false;
    });
    // Retorno de la función del hook
    return filteredRecordsMenuTypes;
}
// Hook para filtrar los menus agregados en el nutriologia ✔️
export const FilteredRecordsMenuTypesNutritionist = () => {
    // Constantes con el valor de los contextos 
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isDeletedMenuTypes] = useContext(DeletedMenuTypesContext); 
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext);
    // Función del hook
    const filteredRecordsMenuTypes = isMenuTypes.filter((data) => {
        const isDeleted = isDeletedMenuTypes.some(type => type.idtipo === data.idtipo);
        if (isDeleted) return false;
        
        return isMenuTypeUbications.some(type => type.idtipo === data.idtipo && type.idubicacion === 2) ? true : false;
    });
    // Retorno de la función del hook
    return filteredRecordsMenuTypes;
}
// Hook para filtrar los menus agregados en el area medica ✔️
export const FilteredRecordsMenuTypesDoctor = () => {
    // Constantes con el valor de los contextos 
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isDeletedMenuTypes] = useContext(DeletedMenuTypesContext); 
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext);
    // Función del hook
    const filteredRecordsMenuTypes = isMenuTypes.filter((data) => {
        const isDeleted = isDeletedMenuTypes.some(type => type.idtipo === data.idtipo);
        if (isDeleted) return false;
        
        return isMenuTypeUbications.some(type => type.idtipo === data.idtipo && type.idubicacion === 3) ? true : false;
    });
    // Retorno de la función del hook
    return filteredRecordsMenuTypes;
}
// Hook para filtrar los cirujanos agregados en las cirugias ✔️
export const FilteredRecordsSurgeryDoctor = () => {
    // Constantes con el valor de los contextos 
    const [isSurgeries] = useContext(SurgeriesContext);
    
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    // Función del hook
    const uniqueSurgery = isSurgeries.filter(surgery => {
            const fechaCirugia = surgery.Fecha.split('T')[0];
            return fechaCirugia === todayStr || fechaCirugia === yesterdayStr
        }).filter((surgery, index, self) =>
        index === self.findIndex((t) => (
            t.Cirujano === surgery.Cirujano
        ))
    );
    // Retorno de la función del hook
    return uniqueSurgery;
}
// Hook para filtrar las cirujias que son del cirujano escogido ✔️
export const FilteredRecordsSurgeryDoctorDoctor = () => {
    // Constantes con el valor de los contextos 
    const [isSurgeries] = useContext(SurgeriesContext);
    const [isTextFieldsOrderDoctor] = useContext(TextFieldsOrderDoctorContext);  
    const [isOrderDoctor] = useContext(OrderDoctorContext);
    // Fecha actual
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    // Función del hook
    const filteredRecordsSurgeryDoctor = isSurgeries.filter((data) => {
        if(isOrderDoctor.some(s => s.idcirugia === data.IDE)) return false;
        
        const surgeryDateString = data.Fecha.split('T')[0]; 
        
        // Función para convertir "HH:mm" a minutos desde medianoche
        const timeToMinutes = (timeStr) => {
            const [h, m] = timeStr.split(':').map(Number);
            return h * 60 + m;
        };

        // Duración en minutos (ajusta si tu duración está en otra unidad)
        const duracion = data.Duracion; // Por ejemplo 90 minutos

        const horaInicioMinutos = timeToMinutes(data.HoraInicio);
        const horaFinMinutos = horaInicioMinutos + duracion;

        if (surgeryDateString === todayString && data.Cirujano === isTextFieldsOrderDoctor.medico) {
            return true;
        }
        
        if (surgeryDateString === yesterdayString && data.Cirujano === isTextFieldsOrderDoctor.medico) {
            if (horaFinMinutos > 1440) {
                return true;
            }
        }

        return false;
    });
    // Retorno de la función del hook
    return filteredRecordsSurgeryDoctor;
}
// Hook para verificar datos de la cirugia del doctor ✔️
export const HandleDoctorVerification = () => {
    // Constantes con el valor de los contextos 
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsOrderDoctor] = useContext(TextFieldsOrderDoctorContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsSearchOrders,setIsTextFieldsSearchOrders] = useContext(TextFieldsSearchOrdersContext);
    const [isKey] = useContext(KeyContext);
    // Constante con el hook
    const handleNavbarView = HandleNavbarView();
    const handleSidebarView = HandleSidebarView();
    const filteredRecordsMenuTypesDoctor = FilteredRecordsMenuTypesDoctor();
    const navigate = useNavigate();
    // Función del hook
    const handleDoctorVerification = () => {
        if(currentMView === 'Alerta-Médico'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsOrderDoctor.solicitante === '' || isTextFieldsOrderDoctor.cirugia === '' || isTextFieldsOrderDoctor.idcirugia === 0 || isTextFieldsOrderDoctor.sala === '' || isTextFieldsOrderDoctor.medico === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información!')
                        };

                        const regexNames = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

                        if(!regexNames.test(isTextFieldsOrderDoctor.solicitante.trim())){
                            setIsActionBlock(false);
                            return reject('¡El solicitante no es válido, solo permite letras y espacios!');
                        }

                        if(filteredRecordsMenuTypesDoctor.length === 0){
                            setIsActionBlock(false);
                            return reject('¡No cuenta con menús asignados, comunicarse con el CHEF!');
                        }

                        if(isTextFieldsOrderDoctor.clavesecreta !== ''){
                            if(isTextFieldsOrderDoctor.clavesecreta !== isKey[0].clave){
                                setIsActionBlock(false);
                                return reject('¡La clave de autorización no es válida!');
                            }
                        }

                        resolve('¡Información verificada!');
                        
                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');

                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsTextFieldsSearchOrders(prev => ({
                                ...prev,
                                idtipo: filteredRecordsMenuTypesDoctor[0]?.idtipo,
                            }))
                            setIsActionBlock(false);
                            handleSidebarView('Pedidos');
                            handleNavbarView(filteredRecordsMenuTypesDoctor[0]?.nombre);
                            sessionStorage.setItem('Ruta','/Kitchen/Index/Orders/Doctor');
                            navigate('/Kitchen/Index/Orders/Doctor',{ replace: true });
                        },1000)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    } 
    // Retorno de la función del hook
    return handleDoctorVerification;
}
// Hook para agregar o eliminar platillos con los medicos  ✔️
export const HandleTextDishesDoctor = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsOrderDoctor,setIsTextFieldsOrderDoctor] = useContext(TextFieldsOrderDoctorContext); 
    const [isDishes] = useContext(DishesContext);
    // Funcion para agregar un platillo
    const DishAdd = (idplatillo) => {
        const newDish = {
            idpedidoindividual: 0,
            comentario: '',
            estado: 'En espera',
            idplatillo: idplatillo,
            nombreplatillo: isDishes.find(d => d.idplatillo === idplatillo)?.nombre, 
            idguarnicion: 0,
            nombreguarnicion: '',
            idbebida: 0,
            nombrebebida: '',
            idpedido: 0,
        }
        setIsTextFieldsOrderDoctor({
            ...isTextFieldsOrderDoctor,
            pedidos: [...isTextFieldsOrderDoctor.pedidos, newDish],
        })
    }
    // Funcion para eliminar un platillo
    const DishDelete = (idplatillo) => {
        setIsTextFieldsOrderDoctor(prev => ({
            ...prev,
            pedidos: prev.pedidos.filter(dish => dish.idplatillo !== idplatillo)
        }));
    };
    // Retorno de la función del hook
    return { DishAdd,DishDelete }
}
// Hook para agregar o eliminar platillos con los cocineros  ✔️
export const HandleTextDishesKitchen = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsOrderKitchen,setIsTextFieldsOrderKitchen] = useContext(TextFieldsOrderKitchenContext); 
    // Funcion para agregar un platillo
    const DishAddCook = (idplatillo) => {
        const newDish = {
            idpedidoindividual: 0,
            cantidad: '1',
            estado: 'En curso',
            idplatillo: idplatillo,
            idguarnicion: 0,
            idbebida: 0,
            idpedido: 0,
        }
        setIsTextFieldsOrderKitchen({
            ...isTextFieldsOrderKitchen,
            pedidos: [...isTextFieldsOrderKitchen.pedidos, newDish],
        })
    }
    // Funcion para agregar una bebida
    const DrinkAddCook = (idbebida) => {
        const newDish = {
            idpedidoindividual: 0,
            cantidad: '1',
            estado: 'En curso',
            idplatillo: 0,
            idguarnicion: 0,
            idbebida: idbebida,
            idpedido: 0,
        }
        setIsTextFieldsOrderKitchen({
            ...isTextFieldsOrderKitchen,
            pedidos: [...isTextFieldsOrderKitchen.pedidos, newDish],
        })
    }
    // Funcion para agregar una guarnicion
    const SideDishAddCook = (idguarnicion) => {
        const newDish = {
            idpedidoindividual: 0,
            cantidad: '1',
            estado: 'En curso',
            idplatillo: 0,
            idguarnicion: idguarnicion,
            idbebida: 0,
            idpedido: 0,
        }
        setIsTextFieldsOrderKitchen({
            ...isTextFieldsOrderKitchen,
            pedidos: [...isTextFieldsOrderKitchen.pedidos, newDish],
        })
    }
    // Funcion para eliminar un platillo
    const DishDeleteCook = (idplatillo) => {
        setIsTextFieldsOrderKitchen(prev => ({
            ...prev,
            pedidos: prev.pedidos.filter(dish => dish.idplatillo !== idplatillo)
        }));
    };
    // Funcion para eliminar una bebida
    const DrinkDeleteCook = (idbebida) => {
        setIsTextFieldsOrderKitchen(prev => ({
            ...prev,
            pedidos: prev.pedidos.filter(dish => dish.idbebida !== idbebida)
        }));
    };
    // Funcion para eliminar una guarnicion
    const SideDishDeleteCook = (idguarnicion) => {
        setIsTextFieldsOrderKitchen(prev => ({
            ...prev,
            pedidos: prev.pedidos.filter(dish => dish.idguarnicion !== idguarnicion)
        }));
    };
    // Retorno de la función del hook
    return { DishAddCook,DrinkAddCook,SideDishAddCook,DishDeleteCook,DrinkDeleteCook,SideDishDeleteCook }
}
// Hook para agregar un pedido de cocina desde el modal ✔️
export const HandleOrderKitchenAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsOrderKitchen] = useContext(TextFieldsOrderKitchenContext); 
    const [isOrderKitchenAdd,setIsOrderKitchenAdd] = useContext(OrderKitchenAddContext);
    // Función del hook
    const handleOrderKitchenAdd = () => {
        if(currentSView === 'Pedidos' && currentMView === 'Pedido-Cocina-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsOrderKitchen.tipoubicacion === '' || isTextFieldsOrderKitchen.ubicacion === '' || isTextFieldsOrderKitchen.encargado === '' || isTextFieldsOrderKitchen.pedidos.length === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del pedido!')
                        };

                        const regexUbication = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/

                        if(!regexUbication.test(isTextFieldsOrderKitchen.ubicacion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La ubicación no es válida, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(Number(isTextFieldsOrderKitchen.precio) <= 0){
                            setIsActionBlock(false);
                            return reject('¡El precio total no es válido, debe de ser mayor a 0!');
                        }

                        const indexError = isTextFieldsOrderKitchen.pedidos.findIndex((ing, index, arr) => {
                            const cantidadVacia = String(ing.cantidad).trim() === '';

                            return cantidadVacia;
                        });

                        if (indexError !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el platillo ${indexError + 1}! Verifica que cuente con una cantidad valida.`);
                        }

                        const indexErrorNumber = isTextFieldsOrderKitchen.pedidos.findIndex((ing, index, arr) => {

                            const cantidadNumero = parseFloat(ing.cantidad);
                            const cantidadInvalida = cantidadNumero <= 0 || cantidadNumero > 999999.9999;

                            return cantidadInvalida;
                        });

                        if (indexErrorNumber !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el platillo ${indexErrorNumber + 1}! Verifica que la cantidad sea mayor a 0 y no exceda el límite permitido.`);
                        }

                        const indexErrorUnidad = isTextFieldsOrderKitchen.pedidos.findIndex((ing) => {
                            const cantidadNumero = parseFloat(ing.cantidad);

                            if (!Number.isInteger(cantidadNumero) || cantidadNumero <= 0) {
                                return true;
                            }

                            return false;
                        });

                        if (indexErrorUnidad !== -1) {
                            setIsActionBlock(false);
                            return reject(
                                `¡Error en el platillo ${indexErrorUnidad + 1}! La cantidad no es válida.`
                            );
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsOrderKitchenAdd(true);
                        },1000)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    } 
    // Retorno de la función del hook
    return handleOrderKitchenAdd;
}
// Hook para agregar un pedido de medico desde el modal ✔️
export const HandleOrderDoctorAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsOrderDoctor] = useContext(TextFieldsOrderDoctorContext); 
    const [isOrderDoctorAdd,setIsOrderDoctorAdd] = useContext(OrderDoctorAddContext);
    // Función del hook
    const handleOrderDoctorAdd = () => {
        if(currentSView === 'Pedidos' && currentMView === 'Pedido-Medico-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsOrderDoctor.sala === '' || isTextFieldsOrderDoctor.cirugia === '' || isTextFieldsOrderDoctor.medico === '' || isTextFieldsOrderDoctor.solicitante === '' || isTextFieldsOrderDoctor.pedidos.length === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del pedido!')
                        };

                        if(Number(isTextFieldsOrderDoctor.precio) <= 0){
                            setIsActionBlock(false);
                            return reject('¡El precio total no es válido, debe de ser mayor a 0!');
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsOrderDoctorAdd(true);
                        },1000)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    } 
    // Retorno de la función del hook
    return handleOrderDoctorAdd;
}