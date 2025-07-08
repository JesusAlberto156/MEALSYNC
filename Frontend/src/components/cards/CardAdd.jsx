import styled from 'styled-components';
import { useContext } from 'react';
export const Card_Menu = styled.div`
  border: 2px solid #ddd;
  border-radius: 20px;
  padding: 20px;
  margin: 20px;
  width: 280px;
  height: 285px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;
import { ThemeModeContext } from '../../contexts/ViewsProvider';
import { Text_Title_32_Black } from '../styled/Text';
import { Icon_Image_90 } from '../styled/Icons';
import { Button_Text_Blue_200 } from '../styled/Buttons';
import { Container_Row_100_Center } from '../styled/Containers';
import { IoIosAddCircle } from "react-icons/io";
import { Icon_Green_100 } from '../styled/Icons';
export default function Card_Add(){

  const [themeMode,setThemeMode] = useContext(ThemeModeContext);

    return(
        <>
          <Card_Menu>
            <Icon_Green_100 ThemeMode={themeMode}>
                <IoIosAddCircle/>
            </Icon_Green_100>
          </Card_Menu>
        </>
    );
}