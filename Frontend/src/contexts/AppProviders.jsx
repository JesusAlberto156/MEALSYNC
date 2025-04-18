//____________IMPORT/EXPORT____________
// Importación de funciones contexto
import { Socket } from './SocketProvider';

import { Suppliers,Observations } from './SuppliersProvider';
import { Theme_Mode,Login_View,Navbar_View,Sidebar_View,Sidebar,Modal_View,Modal } from './ViewsProvider';
import { Text_Fields,Name,Password,Select,Radio,Radio_Users,Checkbox } from './FormsProvider';
import { Type_User,Selected_Row,Search_Term,Verification_Block,Animation,Action_Block,View_Password } from './VariablesProvider';
import { Users,User,User_Add,User_Edit,User_Delete } from './UsersProvider';
import { Permissions,Permission,Permissions_Add,Permissions_Edit,Permissions_Enable } from './PermissionsProvider';
import { Status_All,Status_User,Status_Add,Status_Enable } from './StatusProvider';
import { Log,Logged } from './SessionProvider';
import { Item_Date } from './ChartsProvider';
import { Ref_Keyboard,Ref_Form_Users,Ref_Button_Users,Ref_Form_Permissions,Ref_Button_Permissions,Ref_Form_Status,Ref_Button_Status } from './RefsProvider';
//____________IMPORT/EXPORT____________

// Función general de contextos
export const AppProviders = ({children}) => {
    return(
        <Socket>
            <Theme_Mode>
                <Login_View>
                    <Navbar_View>
                        <Sidebar_View>
                            <Sidebar>
                                <Modal_View>
                                    <Modal>
                                        <Text_Fields>
                                            <Name>
                                                <Password>
                                                    <Select>
                                                        <Radio>
                                                            <Radio_Users>
                                                                <Checkbox>
                                                                    <Item_Date>
                                                                        <Type_User>
                                                                            <Selected_Row>
                                                                                <Search_Term>
                                                                                    <Verification_Block>
                                                                                        <Animation>
                                                                                            <Action_Block>
                                                                                                <View_Password>
                                                                                                    <User>
                                                                                                        <Permission>
                                                                                                            <Status_User>
                                                                                                                <Log>
                                                                                                                    <Logged>
                                                                                                                        <Ref_Keyboard>
                                                                                                                            <Ref_Form_Users>
                                                                                                                                <Ref_Button_Users>
                                                                                                                                    <Ref_Form_Permissions>
                                                                                                                                        <Ref_Button_Permissions>
                                                                                                                                            <Ref_Form_Status>
                                                                                                                                                <Ref_Button_Status>
                                                                                                                                                    <Users>
                                                                                                                                                        <Permissions>
                                                                                                                                                            <Status_All>
                                                                                                                                                                <Suppliers>
                                                                                                                                                                    <Observations>
                                                                                                                                                                        <User_Add>
                                                                                                                                                                            <User_Edit>
                                                                                                                                                                                <User_Delete>
                                                                                                                                                                                    <Permissions_Add>
                                                                                                                                                                                        <Permissions_Edit>
                                                                                                                                                                                            <Permissions_Enable>
                                                                                                                                                                                                <Status_Add>
                                                                                                                                                                                                    <Status_Enable>
                                                                                                                                                                                                        {children}
                                                                                                                                                                                                    </Status_Enable>
                                                                                                                                                                                                </Status_Add>
                                                                                                                                                                                            </Permissions_Enable>
                                                                                                                                                                                        </Permissions_Edit>
                                                                                                                                                                                    </Permissions_Add>
                                                                                                                                                                                </User_Delete>
                                                                                                                                                                            </User_Edit>
                                                                                                                                                                        </User_Add>
                                                                                                                                                                    </Observations>
                                                                                                                                                                </Suppliers>
                                                                                                                                                            </Status_All>
                                                                                                                                                        </Permissions>
                                                                                                                                                    </Users>
                                                                                                                                                </Ref_Button_Status>
                                                                                                                                            </Ref_Form_Status>
                                                                                                                                        </Ref_Button_Permissions>
                                                                                                                                    </Ref_Form_Permissions>
                                                                                                                                </Ref_Button_Users>
                                                                                                                            </Ref_Form_Users>
                                                                                                                        </Ref_Keyboard>
                                                                                                                    </Logged>
                                                                                                                </Log>
                                                                                                            </Status_User>
                                                                                                        </Permission>
                                                                                                    </User>
                                                                                                </View_Password>
                                                                                            </Action_Block>
                                                                                        </Animation>
                                                                                    </Verification_Block>
                                                                                </Search_Term>
                                                                            </Selected_Row>
                                                                        </Type_User>
                                                                    </Item_Date>
                                                                </Checkbox>
                                                            </Radio_Users>
                                                        </Radio>
                                                    </Select>
                                                </Password>
                                            </Name>
                                        </Text_Fields>
                                    </Modal>
                                </Modal_View>
                            </Sidebar>
                        </Sidebar_View>
                    </Navbar_View>
                </Login_View>
            </Theme_Mode>
        </Socket>
    );
}