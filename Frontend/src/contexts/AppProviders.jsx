//____________IMPORT/EXPORT____________
// Importación de funciones contexto
import { Socket } from './SocketProvider';
import { Theme_Mode,Login_View,Navbar_View,Sidebar_View,Sidebar_Visible,Modal_View } from './ViewsProvider';
import { Name,Password,Select,Radio,Checkbox } from './FormsProvider';
import { Type_User,Selected_Row,Search_Term,Form_Comprobation,Action_Block } from './VariablesProvider';
import { Users,User } from './UsersProvider';
import { Permissions,Permission,Permissions_Add,Permissions_Edit } from './PermissionsProvider';
import { Status_All,Status_User,Status_Add,Status_Enable } from './StatusProvider';
import { Log,Logged } from './SessionProvider';
import { Ref_Form_Permissions,Ref_Button_Permissions,Ref_Form_Status,Ref_Button_Status } from './RefsProvider';
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
                                                    <Checkbox>
                                                        <Type_User>
                                                            <Selected_Row>
                                                                <Search_Term>
                                                                    <Form_Comprobation>
                                                                        <Action_Block>
                                                                            <User>
                                                                                <Permission>
                                                                                    <Status_User>
                                                                                        <Log>
                                                                                            <Logged>
                                                                                                <Ref_Form_Permissions>
                                                                                                    <Ref_Button_Permissions>
                                                                                                        <Ref_Form_Status>
                                                                                                            <Ref_Button_Status>
                                                                                                                <Users>
                                                                                                                    <Permissions>
                                                                                                                        <Status_All>
                                                                                                                            <Permissions_Add>
                                                                                                                                <Permissions_Edit>
                                                                                                                                    <Status_Add>
                                                                                                                                        <Status_Enable>
                                                                                                                                            {children}
                                                                                                                                        </Status_Enable>
                                                                                                                                    </Status_Add>
                                                                                                                                </Permissions_Edit>
                                                                                                                            </Permissions_Add>
                                                                                                                        </Status_All>
                                                                                                                    </Permissions>
                                                                                                                </Users>
                                                                                                            </Ref_Button_Status>
                                                                                                        </Ref_Form_Status>
                                                                                                    </Ref_Button_Permissions>
                                                                                                </Ref_Form_Permissions>
                                                                                            </Logged>
                                                                                        </Log>
                                                                                    </Status_User>
                                                                                </Permission>
                                                                            </User>
                                                                        </Action_Block>
                                                                    </Form_Comprobation>
                                                                </Search_Term>
                                                            </Selected_Row>
                                                        </Type_User>
                                                    </Checkbox>
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