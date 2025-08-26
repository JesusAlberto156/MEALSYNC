//____________IMPORT/EXPORT____________
// Componentes de React
import { useContext } from "react";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import { forwardRef } from "react";
// Contextos
import { ActionBlockContext } from "../../contexts/VariablesProvider";
// Estilos personalizados
import { Input_Text_100_Black } from "./Inputs";
import { Container_Column_NG_100_Center, Container_Row_100_Center } from "./Containers";
import { Text_Span_16_Center_White } from "./Text";
//____________IMPORT/EXPORT____________

//____________INPUT____________
//---------- Negro
const Calendar_Input_Custom_Black = forwardRef(({value,onClick},ref) => {

    return(
        <>
            <Container_Row_100_Center>
                <Input_Text_100_Black
                    placeholder="Seleccione una fecha..."
                    type="text"
                    value={value}
                    onClick={onClick}
                    ref={ref}
                    readOnly
                />
            </Container_Row_100_Center>
        </>
    );
});
//---------- Negro
//____________INPUT____________

//---------- Calendario
export const Calendar_Input_100_Black = ({
    date = null,
    isDateType = '',
    onChangeDate = () => {},
    type = false,
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    // Estructura del componente
    return(
        <>
            <DatePicker
                selected={date instanceof Date ? date : null}
                onChange={(date) => {
                    if(isDateType === 'Personalizada' || type){
                        onChangeDate(date);
                    }
                }}
                dateFormat={'dd/MM/yyyy'}
                locale={es}
                placeholderText="Seleccione una fecha"
                timeIntervals={15}
                isClearable={true}
                popperPlacement="bottom-center"
                customInput={<Calendar_Input_Custom_Black/>}
                maxDate={new Date()}
                disabled={isActionBlock}
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                }) => (
                    <div style={{
                        background:'rgb(58,93,174)',
                        border: '4px solid white',
                        borderRadius: '10px',
                    }}>
                        <Container_Column_NG_100_Center>
                            <Text_Span_16_Center_White style={{ marginTop: '10px',marginBottom: '10px'}}>Selecciona Año y Mes</Text_Span_16_Center_White>
                            <Container_Row_100_Center style={{ marginBottom: '10px'}}>
                                <select
                                    value={date.getFullYear()}
                                    onChange={({ target: { value } }) => changeYear(value)}
                                    style={{
                                        fontFamily: 'Century Gothic',
                                        fontSize: '16px',
                                        borderRadius: '15px',
                                        padding:'5px',
                                        background: 'white',
                                        border: '1px solid black',
                                    }}
                                >
                                    {Array.from({ length: 100 }, (_, i) => {
                                    const year = new Date().getFullYear() - 50 + i;
                                    return <option key={year} value={year}>{year}</option>;
                                    })}
                                </select>
                                <select
                                    value={date.getMonth()}
                                    onChange={({ target: { value } }) => changeMonth(value)}
                                    style={{
                                        fontFamily: 'Century Gothic',
                                        fontSize: '16px',
                                        borderRadius: '15px',
                                        padding:'5px',
                                        background: 'white',
                                        border: '1px solid black',
                                    }}
                                >
                                    {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i} value={i}>
                                        {new Date(0, i).toLocaleString("es", { month: "long" }).toUpperCase()}
                                    </option>
                                    ))}
                                </select>
                            </Container_Row_100_Center>
                        </Container_Column_NG_100_Center>
                    </div>
                )}
            />
        </>
    );
}
//---------- Calendario