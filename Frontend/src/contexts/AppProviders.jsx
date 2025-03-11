import { TypeUserProvider } from './TypeUserProvider';
import { LoggedProvider } from './LoggedProvider';
import { ViewNavbarProvider } from './SwitchViewNavbarProvider';
import { ViewSidebarProvider } from './SwitchViewSidebarProvider';
import { SidebarVisibleProvider } from './SidebarVisibleProvider';
import { ActiveOptionProvider } from './ActiveOptionProvider';
import { ModalOutLoginProvider,ModalAlertMedicoProvider,ModalShoppingCartProvider } from './ModalsProvider';
import { LoadingProvider } from './LoadingProvider';
import { NameLoginProvider } from './NameLoginProvider'
import { PasswordLoginProvider } from './PasswordLoginProvider';
import { OptionsProvider } from './OptionsProvider';
import { PermissionsProvider } from './PermissionsProvider';
import { UsersProvider } from './UsersProvider';
import { UserProvider } from './UserProvider';
import { PermissionProvider } from './PermissionProvider';
import { SocketProvider } from './SocketProvider';

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
                                            <LoadingProvider>
                                                <NameLoginProvider>
                                                    <PasswordLoginProvider>
                                                        <OptionsProvider>
                                                            <UsersProvider>
                                                                <PermissionsProvider>
                                                                    <UserProvider>
                                                                        <PermissionProvider>
                                                                            <SocketProvider>
                                                                                {children}
                                                                            </SocketProvider>
                                                                        </PermissionProvider>
                                                                    </UserProvider>
                                                                </PermissionsProvider>
                                                            </UsersProvider>
                                                        </OptionsProvider>
                                                    </PasswordLoginProvider>
                                                </NameLoginProvider>
                                            </LoadingProvider>
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