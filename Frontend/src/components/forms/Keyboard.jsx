import { useContext } from "react";

import { refFormContext } from "../../contexts/RefsProvider";

import { usehandleKeyChangeKeyboard } from "../../hooks/Form";
import { Container_Form_80 } from "../styled/Containers";
import { Button_Icon_Blue_45 } from "../styled/Buttons";

export default function Keyboard() { 

    const {Input,Keyboard,Key} = useContext(refFormContext);


    const handleKeyChangeKeyboard = usehandleKeyChangeKeyboard();

    return(
        <>
            <Container_Form_80 ref={Keyboard}>
              <Button_Icon_Blue_45 ref={Key} onClick={(e) => {
                    e.stopPropagation();
                    handleKeyChangeKeyboard('q');
              }}>
                q
              </Button_Icon_Blue_45>
              <Button_Icon_Blue_45 ref={Key} onClick={(e) => {
                    e.stopPropagation();
                    handleKeyChangeKeyboard('a');
              }}>
                a
              </Button_Icon_Blue_45>
            </Container_Form_80>
        </>
    );
}