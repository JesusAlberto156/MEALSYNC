//____________IMPORT/EXPORT____________
// Importación de funciones contexto
import { Socket,Logs,Log_Add } from './SocketProvider';
import { Index_Views } from './ViewsProvider';
import { Index_Sessions } from './SessionProvider';
import { Index_Selectedes } from './SelectedesProvider';
import { Index_Searchs } from './SearchsProvider';
import { Index_Variables } from './VariablesProvider';
import { Index_Users } from './UsersProvider';
import { Index_Suppliers } from './SuppliersProvider';
import { Index_Warehouse } from './WarehouseProvider';
import { Index_Menus } from './MenusProvider';
import { Index_Dishes } from './DishesProvider';
import { Index_Text_Fields } from './FormsProvider';
import { Index_Charts } from './ChartsProvider';
import { Index_Refs } from './RefsProvider';
//____________IMPORT/EXPORT____________

// Función general de contextos
export const AppProviders = ({children}) => {
    return(
        <Socket>
            <Logs>
                <Log_Add>
                    <Index_Views>
                        <Index_Sessions>
                            <Index_Selectedes>
                                <Index_Searchs>
                                    <Index_Variables>
                                        <Index_Users>
                                            <Index_Suppliers>
                                                <Index_Warehouse>
                                                    <Index_Menus>
                                                        <Index_Dishes>
                                                            <Index_Text_Fields>
                                                                <Index_Charts>
                                                                    <Index_Refs>
                                                                        {children}
                                                                    </Index_Refs>
                                                                </Index_Charts>
                                                            </Index_Text_Fields>
                                                        </Index_Dishes>
                                                    </Index_Menus>
                                                </Index_Warehouse>
                                            </Index_Suppliers>
                                        </Index_Users>
                                    </Index_Variables>
                                </Index_Searchs>
                            </Index_Selectedes>
                        </Index_Sessions>
                    </Index_Views>
                </Log_Add>
            </Logs>
        </Socket>
    );
}