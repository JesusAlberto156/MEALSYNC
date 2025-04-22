//____________IMPORT/EXPORT____________
// Importación de funciones contexto
import { Socket } from './SocketProvider';
import { Theme_Mode,Login_View,Navbar_View,Sidebar_View,Sidebar,Modal_View,Modal } from './ViewsProvider';
import { Logged_User,Logged_Permissions,Logged_Status,Logged_Log,Logged_Logged,Logged_Type } from './SessionProvider';
import { Selected_Row,Search_Term,Verification_Block,Animation,Action_Block,View_Password } from './VariablesProvider';
import { Users,Permissions,Status,User_Add,User_Edit,Permissions_Add,Permissions_Edit,Permissions_Enable,Status_Add,Status_Enable } from './UsersProvider';
import { Suppliers,Observations } from './SuppliersProvider';
import { Text_Fields,Select,Radio,Checkbox } from './FormsProvider';
import { Item_Date } from './ChartsProvider';
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
                                        <Logged_User>
                                            <Logged_Permissions>
                                                <Logged_Status>
                                                    <Logged_Log>
                                                        <Logged_Logged>
                                                            <Logged_Type>
                                                                <Selected_Row>
                                                                    <Search_Term>
                                                                        <Verification_Block>
                                                                            <Animation>
                                                                                <Action_Block>
                                                                                    <View_Password>
                                                                                        <Users>
                                                                                            <Permissions>
                                                                                                <Status>
                                                                                                    <Suppliers>
                                                                                                        <Observations>
                                                                                                            <Text_Fields>
                                                                                                                <Select>
                                                                                                                    <Radio>
                                                                                                                        <Checkbox>
                                                                                                                            <Item_Date>
                                                                                                                                <User_Add>
                                                                                                                                    <User_Edit>
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
                                                                                                                                    </User_Edit>
                                                                                                                                </User_Add>
                                                                                                                            </Item_Date>
                                                                                                                        </Checkbox>
                                                                                                                    </Radio>
                                                                                                                </Select>
                                                                                                            </Text_Fields>
                                                                                                        </Observations>
                                                                                                    </Suppliers>
                                                                                                </Status>
                                                                                            </Permissions>
                                                                                        </Users>
                                                                                    </View_Password>
                                                                                </Action_Block>
                                                                            </Animation>
                                                                        </Verification_Block>
                                                                    </Search_Term>
                                                                </Selected_Row>
                                                            </Logged_Type>
                                                        </Logged_Logged>
                                                    </Logged_Log>
                                                </Logged_Status>
                                            </Logged_Permissions>
                                        </Logged_User>
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