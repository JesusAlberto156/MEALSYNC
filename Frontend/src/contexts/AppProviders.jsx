//____________IMPORT/EXPORT____________
// Importación de funciones contexto
import { Socket } from './SocketProvider';
import { Theme_Mode,Login_View,Navbar_View,Sidebar_View,Sidebar,Modal_View,Modal } from './ViewsProvider';
import { Logged_User,Logged_Permissions,Logged_Status,Logged_Log,Logged_Logged,Logged_Type } from './SessionProvider';
import { Selected_Row,Search_Term,Verification_Block,Animation,Action_Block,View_Password } from './VariablesProvider';
import { Users,Permissions,Status,User_Add,User_Edit,Permissions_Add,Permissions_Edit,Permissions_Enable,Status_Add,Status_Enable,User_Types } from './UsersProvider';
import { Suppliers,Observations } from './SuppliersProvider';
import { Text_Fields,Select,Radio_Permissions,Radio_Status,Checkbox } from './FormsProvider';
import { Item_Date } from './ChartsProvider';
import { Ref_Alert_Greeting } from './RefsProvider';
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
                                                                                                    <User_Types>
                                                                                                        <Suppliers>
                                                                                                            <Observations>
                                                                                                                <Text_Fields>
                                                                                                                    <Select>
                                                                                                                        <Radio_Permissions>
                                                                                                                            <Radio_Status>
                                                                                                                                <Checkbox>
                                                                                                                                    <Item_Date>
                                                                                                                                        <User_Add>
                                                                                                                                            <User_Edit>
                                                                                                                                                <Permissions_Add>
                                                                                                                                                    <Permissions_Edit>
                                                                                                                                                        <Permissions_Enable>
                                                                                                                                                            <Status_Add>
                                                                                                                                                                <Status_Enable>
                                                                                                                                                                    <Ref_Alert_Greeting>
                                                                                                                                                                        {children}
                                                                                                                                                                    </Ref_Alert_Greeting>
                                                                                                                                                                </Status_Enable>
                                                                                                                                                            </Status_Add>
                                                                                                                                                        </Permissions_Enable>
                                                                                                                                                    </Permissions_Edit>
                                                                                                                                                </Permissions_Add>
                                                                                                                                            </User_Edit>
                                                                                                                                        </User_Add>
                                                                                                                                    </Item_Date>
                                                                                                                                </Checkbox>
                                                                                                                            </Radio_Status>
                                                                                                                        </Radio_Permissions>
                                                                                                                    </Select>
                                                                                                                </Text_Fields>
                                                                                                            </Observations>
                                                                                                        </Suppliers>
                                                                                                    </User_Types>
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