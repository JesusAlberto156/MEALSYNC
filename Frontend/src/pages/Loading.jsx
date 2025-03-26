import { IoSettings } from "react-icons/io5";

import { Background_Loading } from "../components/styled/Backgrounds";
import { Title_Fade_Loading } from "../components/styled/Text";
import { Settings_Rotate } from "../components/styled/Settings";
import { Container_Title_Loading } from "../components/styled/Containers";

const Loading = () => {
    return(
        <>
            <Background_Loading>
                <Container_Title_Loading>
                    <Title_Fade_Loading>Cargando...</Title_Fade_Loading>
                    <Settings_Rotate><IoSettings/></Settings_Rotate>
                </Container_Title_Loading>
            </Background_Loading>
        </>
    );
}

export default Loading;