//____________IMPORT/EXPORT____________
// Componentes de React
import { forwardRef,useContext } from "react";
// Contextos
import { ThemeModeContext } from "../../contexts/ViewsProvider";
// Estilos personalizados
import { Input_Text_100_Black } from "./Inputs";
import { Container_Row_100_Center } from "./Containers";
//____________IMPORT/EXPORT____________

//____________INPUT____________
//---------- Negro
export const Calendar_Input_Custom_Black = forwardRef(({value,onClick},ref) => {
    const [themeMode] = useContext(ThemeModeContext);

    return(
        <>
            <Container_Row_100_Center>
                <Input_Text_100_Black ThemeMode={themeMode}
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