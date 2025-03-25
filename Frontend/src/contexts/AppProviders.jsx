import { Socket } from './SocketProvider';

import { Users,User } from './UsersProvider';
import { Permissions,Permission } from './PermissionsProvider';
import { StatusAll,StatusUser } from './StatusProvider';
import { TypeUser } from './TypeUserProvider';
import { Logged,EnableUser,Name,Password } from './SessionProvider';

import { Login,Toast,Visible,SelectedRow,SearchTerm } from './VariablesProvider';
import { Navbar,Sidebar } from './ViewsProvider';
import { ModalOutLogin,ModalAlertMedico,ModalShoppingCart,ModalUserEnable } from './ModalsProvider';

export const AppProviders = ({children}) => {
    return(
        <Socket>
            <User>
                <Permission>
                    <StatusUser>
                        <TypeUser>
                            <ModalOutLogin>
                                <ModalAlertMedico>
                                    <ModalShoppingCart>
                                        <ModalUserEnable>
                                            <Navbar>
                                                <Sidebar>
                                                    <Login>
                                                        <Toast>
                                                            <Visible>
                                                                <SelectedRow>
                                                                    <SearchTerm>
                                                                        <Name>
                                                                            <Password>
                                                                                <Logged> 
                                                                                    <Users>
                                                                                        <Permissions>
                                                                                            <StatusAll>
                                                                                                <EnableUser>
                                                                                                    {children}
                                                                                                </EnableUser>
                                                                                            </StatusAll>
                                                                                        </Permissions>
                                                                                    </Users>
                                                                                </Logged>
                                                                            </Password>
                                                                        </Name>
                                                                    </SearchTerm>
                                                                </SelectedRow>
                                                            </Visible>
                                                        </Toast>
                                                    </Login>
                                                </Sidebar>
                                            </Navbar>
                                        </ModalUserEnable>
                                    </ModalShoppingCart>
                                </ModalAlertMedico>
                            </ModalOutLogin>
                        </TypeUser>
                    </StatusUser>
                </Permission>
            </User>
        </Socket>
    );
}