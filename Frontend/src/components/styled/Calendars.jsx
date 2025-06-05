//____________IMPORT/EXPORT____________
// Componentes de React
import { forwardRef,useContext } from "react";
// Contextos
import { ThemeModeContext } from "../../contexts/ViewsProvider";
// Estilos personalizados
import { Input_Text_Black_100 } from "./Inputs";
import { Container_Row_95_Center } from "./Containers";
//____________IMPORT/EXPORT____________

//____________INPUT____________
//---------- Negro
export const Calendar_Input_Custom_Black = forwardRef(({value,onClick},ref) => {
    const [themeMode] = useContext(ThemeModeContext);

    return(
        <>
            <Container_Row_95_Center>
                <Input_Text_Black_100 ThemeMode={themeMode}
                    placeholder="Seleccione una fecha..."
                    type="text"
                    value={value}
                    onClick={onClick}
                    ref={ref}
                    readOnly
                />
            </Container_Row_95_Center>
        </>
    );
});
//---------- Negro
//____________INPUT____________