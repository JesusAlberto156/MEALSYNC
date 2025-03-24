import { Socket } from './SocketProvider';

import { Users,User } from './UsersProvider';
import { Permissions,Permission } from './PermissionsProvider';
import { StatusAll,StatusUser } from './StatusProvider';
import { TypeUser } from './TypeUserProvider';
import { Logged,Enable,Name,Password } from './SessionProvider';

import { Login,Toast,Visible,SelectedRow,SearchTerm } from './VariablesProvider';
import { Navbar,Sidebar } from './ViewsProvider';
import { ModalOutLogin,ModalAlertMedico,ModalShoppingCart,ModalUserEnable } from './ModalsProvider';

export const AppProviders = ({children}) => {
    return(
        <Socket>
            <Users>
                <User>
                    <Permissions>
                        <Permission>
                            <StatusAll>
                                <StatusUser>
                                    <TypeUser>
                                        <Logged>
                                            <Name>
                                                <Password>
                                                    <Enable>
                                                        <Login>
                                                            <Toast>
                                                                <Visible>
                                                                    <SelectedRow>
                                                                        <SearchTerm>
                                                                            <Navbar>
                                                                                <Sidebar>
                                                                                    <ModalOutLogin>
                                                                                        <ModalAlertMedico>
                                                                                            <ModalShoppingCart>
                                                                                                <ModalUserEnable>
                                                                                                    {children}
                                                                                                </ModalUserEnable>
                                                                                            </ModalShoppingCart>
                                                                                        </ModalAlertMedico>
                                                                                    </ModalOutLogin>
                                                                                </Sidebar>
                                                                            </Navbar>
                                                                        </SearchTerm>
                                                                    </SelectedRow>
                                                                </Visible>
                                                            </Toast>
                                                        </Login>
                                                    </Enable>
                                                </Password>
                                            </Name>
                                        </Logged>
                                    </TypeUser>
                                </StatusUser>
                            </StatusAll>
                        </Permission>
                    </Permissions>
                </User>
            </Users>
        </Socket>
    );
}