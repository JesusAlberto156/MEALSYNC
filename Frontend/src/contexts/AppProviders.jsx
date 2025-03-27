import { Socket } from './SocketProvider';
import { Users,User } from './UsersProvider';
import { Permissions,Permission } from './PermissionsProvider';
import { StatusAll,StatusUser,StatusAdd,StatusEnable,StatusDelete } from './StatusProvider';
import { TypeUser } from './TypeUserProvider';
import { Log,Logged,Name,Password } from './SessionProvider';
import { LoadingOptionLogin,Toast,Visible,SelectedRow,SearchTerm,Modal,OptionModal } from './VariablesProvider';
import { Navbar,Sidebar } from './ViewsProvider';

export const AppProviders = ({children}) => {
    return(
        <Socket>
            <User>
                <Permission>
                    <StatusUser>
                        <TypeUser>
                            <Modal>
                                <OptionModal>
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
                                                                                            <StatusAdd>
                                                                                                <StatusEnable>
                                                                                                    <StatusDelete>
                                                                                                        {children}
                                                                                                    </StatusDelete>
                                                                                                </StatusEnable>
                                                                                            </StatusAdd>
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
                                </OptionModal>
                            </Modal>
                        </TypeUser>
                    </StatusUser>
                </Permission>
            </User>
        </Socket>
    );
}