//____________IMPORT/EXPORT____________
// Importación de funciones contexto
import { Socket } from './SocketProvider';
import { Theme_Mode,Login_View,Navbar_View,Sidebar_View,Sidebar_Visible,Modal_View } from './ViewsProvider';
import { Name,Password,Select,Radio,Radio_Users,Checkbox } from './FormsProvider';
import { Type_User,Selected_Row,Search_Term,Form_Verification,Action_Block,View_Password } from './VariablesProvider';
import { Users,User,User_Add,User_Edit,User_Delete } from './UsersProvider';
import { Permissions,Permission,Permissions_Add,Permissions_Edit,Permissions_Enable } from './PermissionsProvider';
import { Status_All,Status_User,Status_Add,Status_Enable } from './StatusProvider';
import { Log,Logged } from './SessionProvider';
import { Ref_Form_Users,Ref_Button_Users,Ref_Form_Permissions,Ref_Button_Permissions,Ref_Form_Status,Ref_Button_Status } from './RefsProvider';
//____________IMPORT/EXPORT____________

// Función general de contextos
export const AppProviders = ({children}) => {
    return(
        <Socket>
            <Theme_Mode>
                <Login_View>
                    <Navbar_View>
                        <Sidebar_View>
                            <Sidebar_Visible>
                                <Modal_View>
                                    <Name>
                                        <Password>
                                            <Select>
                                                <Radio>
                                                    <Radio_Users>
                                                        <Checkbox>
                                                            <Type_User>
                                                                <Selected_Row>
                                                                    <Search_Term>
                                                                        <Form_Verification>
                                                                            <Action_Block>
                                                                                <View_Password>
                                                                                    <User>
                                                                                        <Permission>
                                                                                            <Status_User>
                                                                                                <Log>
                                                                                                    <Logged>
                                                                                                        <Ref_Form_Users>
                                                                                                            <Ref_Button_Users>
                                                                                                                <Ref_Form_Permissions>
                                                                                                                    <Ref_Button_Permissions>
                                                                                                                        <Ref_Form_Status>
                                                                                                                            <Ref_Button_Status>
                                                                                                                                <Users>
                                                                                                                                    <Permissions>
                                                                                                                                        <Status_All>
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
                                                                                                                                        </Status_All>
                                                                                                                                    </Permissions>
                                                                                                                                </Users>
                                                                                                                            </Ref_Button_Status>
                                                                                                                        </Ref_Form_Status>
                                                                                                                    </Ref_Button_Permissions>
                                                                                                                </Ref_Form_Permissions>
                                                                                                            </Ref_Button_Users>
                                                                                                        </Ref_Form_Users>
                                                                                                    </Logged>
                                                                                                </Log>
                                                                                            </Status_User>
                                                                                        </Permission>
                                                                                    </User>
                                                                                </View_Password>
                                                                            </Action_Block>
                                                                        </Form_Verification>
                                                                    </Search_Term>
                                                                </Selected_Row>
                                                            </Type_User>
                                                        </Checkbox>
                                                    </Radio_Users>
                                                </Radio>
                                            </Select>
                                        </Password>
                                    </Name>
                                </Modal_View>
                            </Sidebar_Visible>
                        </Sidebar_View>
                    </Navbar_View>
                </Login_View>
            </Theme_Mode>
        </Socket>
    );
}