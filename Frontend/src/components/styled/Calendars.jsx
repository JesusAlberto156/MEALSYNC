
import { forwardRef,useContext } from "react";
import { Input_Text_Black_100 } from "./Inputs";
import { Container_Row_95_Center } from "./Containers";

import { ThemeModeContext } from "../../contexts/ViewsProvider";

const Calendar_Input_Custom = forwardRef(({value,onClick},ref) => {
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

export default Calendar_Input_Custom;