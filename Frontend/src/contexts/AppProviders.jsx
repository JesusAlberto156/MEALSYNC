//____________IMPORT/EXPORT____________
// Importación de funciones contexto
import { Socket } from './SocketProvider';
import { Theme_Mode,Login_View,Navbar_View,Sidebar_View,Sidebar,Modal_View,Modal } from './ViewsProvider';
import { Logged_User,Logged_Permissions,Logged_Status,Logged_Log,Logged_Logged,Logged_Type } from './SessionProvider';
import { Selected_Row,Search_Term,Verification_Block,Animation,Action_Block,View_Password,Keyboard,Keyboard_View,Touch } from './VariablesProvider';
import { Users,Permissions,Status,User_Add,User_Edit,Permissions_Add,Permissions_Edit,Permissions_Enable,Status_Add,Status_Enable,User_Types } from './UsersProvider';
import { Suppliers,Observations,Supplier_Add,Supplier_Edit } from './SuppliersProvider';
import { Text_Fields_User,Text_Fields_Supplier,Select,Radio_Permissions,Radio_Status,Checkbox } from './FormsProvider';
import { Item_Date } from './ChartsProvider';
import { Ref_Alert_Greeting,Ref_Keyboard,Ref_Users,Ref_Permissions,Ref_Status,Ref_Suppliers } from './RefsProvider';
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
                                                                                        <Keyboard>
                                                                                            <Keyboard_View>
                                                                                                <Touch>
                                                                                                    <Users>
                                                                                                        <Permissions>
                                                                                                            <Status>
                                                                                                                <User_Types>
                                                                                                                    <Suppliers>
                                                                                                                        <Observations>
                                                                                                                            <Text_Fields_User>
                                                                                                                                <Text_Fields_Supplier>
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
                                                                                                                                                                                    <Supplier_Add>
                                                                                                                                                                                        <Supplier_Edit>
                                                                                                                                                                                            <Ref_Alert_Greeting>
                                                                                                                                                                                                <Ref_Keyboard>
                                                                                                                                                                                                    <Ref_Users>
                                                                                                                                                                                                        <Ref_Permissions>
                                                                                                                                                                                                            <Ref_Status>
                                                                                                                                                                                                                <Ref_Suppliers>
                                                                                                                                                                                                                    {children}
                                                                                                                                                                                                                </Ref_Suppliers>
                                                                                                                                                                                                            </Ref_Status>
                                                                                                                                                                                                        </Ref_Permissions>
                                                                                                                                                                                                    </Ref_Users>
                                                                                                                                                                                                </Ref_Keyboard>
                                                                                                                                                                                            </Ref_Alert_Greeting>
                                                                                                                                                                                        </Supplier_Edit>
                                                                                                                                                                                    </Supplier_Add>
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
                                                                                                                                </Text_Fields_Supplier>
                                                                                                                            </Text_Fields_User>
                                                                                                                        </Observations>
                                                                                                                    </Suppliers>
                                                                                                                </User_Types>
                                                                                                            </Status>
                                                                                                        </Permissions>
                                                                                                    </Users>
                                                                                                </Touch>
                                                                                            </Keyboard_View>
                                                                                        </Keyboard>
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