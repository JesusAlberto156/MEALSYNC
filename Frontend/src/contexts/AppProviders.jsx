//____________IMPORT/EXPORT____________
// Importación de funciones contexto
import { Socket } from './SocketProvider';
import { Users,User } from './UsersProvider';
import { Permissions,Permission } from './PermissionsProvider';
import { StatusAll,StatusUser,StatusAdd,StatusEnable } from './StatusProvider';
import { TypeUser } from './TypeUserProvider';
import { Log,Logged,Name,Password } from './SessionProvider';
import { Mode,LoadingOptionLogin,Visible,SelectedRow,SearchTerm,Modal,OptionModal,Select,Radio,Comprobation,Block,Enable } from './VariablesProvider';
import { Navbar,Sidebar } from './ViewsProvider';
import { Form,Search,StatusModal } from './RefsProvider';
//____________IMPORT/EXPORT____________

// Función general de contextos
export const AppProviders = ({children}) => {
    return(
        <Socket>
            <Mode>
                <User>
                    <Permission>
                        <StatusUser>
                            <TypeUser>
                                <Modal>
                                    <OptionModal>
                                        <Form>
                                            <Search>
                                                <StatusModal>
                                                    <Select>
                                                        <Radio>
                                                            <Comprobation>
                                                                <Block>
                                                                    <Enable>
                                                                        <Navbar>
                                                                            <Sidebar>
                                                                                <LoadingOptionLogin>
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
                                                                                                                                    {children}
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
                                                                                </LoadingOptionLogin>
                                                                            </Sidebar>
                                                                        </Navbar>
                                                                    </Enable>
                                                                </Block>
                                                            </Comprobation>
                                                        </Radio>
                                                    </Select>
                                                </StatusModal>
                                            </Search>
                                        </Form>
                                    </OptionModal>
                                </Modal>
                            </TypeUser>
                        </StatusUser>
                    </Permission>
                </User>
            </Mode>
        </Socket>
    );
}