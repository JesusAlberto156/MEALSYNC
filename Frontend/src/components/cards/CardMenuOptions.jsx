import styled from 'styled-components';
import { useContext } from 'react';
export const Card_Menu = styled.div`
  border: 2px solid #ddd;
  border-radius: 20px;
  padding: 20px;
  margin: 20px;
  width: 280px;
  height: auto;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;
import { ThemeModeContext } from '../../contexts/ViewsProvider';
import { Text_Title_30_Center } from '../styled/Text';
import { Icon_Image_90 } from '../styled/Icons';
import { Button_Icon_Blue_200 } from '../styled/Buttons';
import { Container_Row_90_Center } from '../styled/Containers';

export default function Card_Dish(){

  const [themeMode,setThemeMode] = useContext(ThemeModeContext);

    return(
        <>
          <Card_Menu>
            <Text_Title_30_Center ThemeMode={themeMode}>Huevos revueltos</Text_Title_30_Center>
            <Icon_Image_90 ThemeMode={themeMode} src='https://imag.bonviveur.com/fotografia-de-unos-huevos-revueltos.jpg'/>
            <Container_Row_90_Center>
              <Button_Icon_Blue_200 ThemeMode={themeMode}></Button_Icon_Blue_200>
            </Container_Row_90_Center>
          </Card_Menu>
        </>
    );
}