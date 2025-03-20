import { Socket } from './SocketProvider';

import { Users,User } from './UsersProvider';
import { Permissions,Permission } from './PermissionsProvider';
import { StatusAll,StatusUser } from './StatusProvider';
import { TypeUser } from './TypeUserProvider';



import { LoggedProvider } from './LoggedProvider';
import { ViewNavbarProvider } from './SwitchViewNavbarProvider';
import { ViewSidebarProvider } from './SwitchViewSidebarProvider';
import { SidebarVisibleProvider } from './SidebarVisibleProvider';
import { ActiveOptionProvider } from './ActiveOptionProvider';
import { ModalOutLoginProvider,ModalAlertMedicoProvider,ModalShoppingCartProvider } from './ModalsProvider';
import { NameLoginProvider } from './NameLoginProvider'
import { PasswordLoginProvider } from './PasswordLoginProvider';
import { OptionsProvider } from './VariablesProvider';
import { ToastProvider } from './ToastProvider';
import { SelectedRowProvider } from './SelectedRowProvider';
import { SearchTermProvider } from './SearchTermProvider';

import { EnableProvider } from './EnableProvider';

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