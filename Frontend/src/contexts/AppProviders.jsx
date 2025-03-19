import { TypeUserProvider } from './TypeUserProvider';
import { LoggedProvider } from './LoggedProvider';
import { ViewNavbarProvider } from './SwitchViewNavbarProvider';
import { ViewSidebarProvider } from './SwitchViewSidebarProvider';
import { SidebarVisibleProvider } from './SidebarVisibleProvider';
import { ActiveOptionProvider } from './ActiveOptionProvider';
import { ModalOutLoginProvider,ModalAlertMedicoProvider,ModalShoppingCartProvider } from './ModalsProvider';
import { NameLoginProvider } from './NameLoginProvider'
import { PasswordLoginProvider } from './PasswordLoginProvider';
import { OptionsProvider } from './OptionsProvider';
import { PermissionsProvider } from './PermissionsProvider';
import { UsersProvider } from './UsersProvider';
import { UserProvider } from './UserProvider';
import { PermissionProvider } from './PermissionProvider';
import { SocketProvider } from './SocketProvider';
import { ToastProvider } from './ToastProvider';
import { SelectedRowProvider } from './SelectedRowProvider';
import { SearchTermProvider } from './SearchTermProvider';
import { StatusUserProvider } from './StatusUserProvider';
import { StatusUsersProvider } from './StatusUsersProvider';
import { EnableProvider } from './EnableProvider';

export const AppProviders = ({children}) => {
    return(
        <TypeUserProvider>
            <LoggedProvider>
                <SidebarVisibleProvider>
                    <ViewNavbarProvider>
                        <ViewSidebarProvider>
                            <ActiveOptionProvider>
                                <ModalOutLoginProvider>
                                    <ModalAlertMedicoProvider>
                                        <ModalShoppingCartProvider>
                                            <NameLoginProvider>
                                                <PasswordLoginProvider>
                                                    <OptionsProvider>
                                                        <UsersProvider>
                                                            <PermissionsProvider>
                                                                <UserProvider>
                                                                    <PermissionProvider>
                                                                        <ToastProvider>
                                                                            <SelectedRowProvider>
                                                                                <SearchTermProvider>
                                                                                    <StatusUserProvider>
                                                                                        <StatusUsersProvider>
                                                                                            <EnableProvider>
                                                                                                <SocketProvider>
                                                                                                    {children}
                                                                                                </SocketProvider>
                                                                                            </EnableProvider>
                                                                                        </StatusUsersProvider>
                                                                                    </StatusUserProvider>
                                                                                </SearchTermProvider>
                                                                            </SelectedRowProvider>
                                                                        </ToastProvider>
                                                                    </PermissionProvider>
                                                                </UserProvider>
                                                            </PermissionsProvider>
                                                        </UsersProvider>
                                                    </OptionsProvider>
                                                </PasswordLoginProvider>
                                            </NameLoginProvider>
                                        </ModalShoppingCartProvider>
                                    </ModalAlertMedicoProvider>
                                </ModalOutLoginProvider>
                            </ActiveOptionProvider>
                        </ViewSidebarProvider>
                    </ViewNavbarProvider>
                </SidebarVisibleProvider>
            </LoggedProvider>
        </TypeUserProvider>
    );
}