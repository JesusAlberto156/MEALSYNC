import { Socket } from './SocketProvider';
import { Users,User } from './UsersProvider';
import { Permissions,Permission } from './PermissionsProvider';
import { StatusAll,StatusUser } from './StatusProvider';
import { TypeUser } from './TypeUserProvider';
import { Log,Logged,Enable,Name,Password } from './SessionProvider';
import { LoadingOptionLogin,Toast,Visible,SelectedRow,SearchTerm,Modal } from './VariablesProvider';
import { Navbar,Sidebar } from './ViewsProvider';

export const AppProviders = ({children}) => {
    return(
        <Socket>
            <User>
                <Permission>
                    <StatusUser>
                        <TypeUser>
                            <Modal>
                                <Navbar>
                                    <Sidebar>
                                        <LoadingOptionLogin>
                                            <Toast>
                                                <Visible>
                                                    <SelectedRow>
                                                        <SearchTerm>
                                                            <Name>
                                                                <Password>
                                                                    <Log>
                                                                        <Logged> 
                                                                            <Users>
                                                                                <Permissions>
                                                                                    <StatusAll>
                                                                                        <Enable>
                                                                                            {children}
                                                                                        </Enable>
                                                                                    </StatusAll>
                                                                                </Permissions>
                                                                            </Users>
                                                                        </Logged>
                                                                    </Log>
                                                                </Password>
                                                            </Name>
                                                        </SearchTerm>
                                                    </SelectedRow>
                                                </Visible>
                                            </Toast>
                                        </LoadingOptionLogin>
                                    </Sidebar>
                                </Navbar>
                            </Modal>
                        </TypeUser>
                    </StatusUser>
                </Permission>
            </User>
        </Socket>
    );
}