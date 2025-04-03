//____________IMPORT/EXPORT____________
// Importación de funciones contexto
import { Socket } from './SocketProvider';
import { Theme_Mode,Login_View,Navbar_View,Sidebar_View,Sidebar_Visible,Modal_View } from './ViewsProvider';
import { Name,Password,Select,Radio } from './FormsProvider';
import { Type_User,Selected_Row,Search_Term,Form_Comprobation,Action_Block } from './VariablesProvider';
import { Users,User } from './UsersProvider';
import { Permissions,Permission } from './PermissionsProvider';
import { Status_All,Status_User,Status_Add,Status_Enable } from './StatusProvider';
import { Log,Logged } from './SessionProvider';

import { Form,Search,StatusModal } from './RefsProvider';
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
                                                                                            <Search>
                                                                                                <Form>
                                                                                                    <StatusModal>
                                                                                                        <Users>
                                                                                                            <Permissions>
                                                                                                                <Status_All>
                                                                                                                    <Status_Add>
                                                                                                                        <Status_Enable>
                                                                                                                            {children}
                                                                                                                        </Status_Enable>
                                                                                                                    </Status_Add>
                                                                                                                </Status_All>
                                                                                                            </Permissions>
                                                                                                        </Users>
                                                                                                    </StatusModal>
                                                                                                </Form>
                                                                                            </Search>
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