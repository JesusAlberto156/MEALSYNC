//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSupplyOrdersService,getSupplyOrderObservationsService,getDeletedSupplyOrdersService,getWarehouseCategoriesService,getWarehouseSupplyTypesService } from "../services/warehouse.js";
import { insertSupplyOrderService,insertSupplyOrderObservationService,insertDeletedSupplyOrderService } from "../services/warehouse.js";

import { getLogsService } from "../services/logs.js";
import { insertLogSupplyOrderService,insertLogSupplyOrderObservationService,insertLogDeletedSupplyOrderService } from "../services/warehouse.js";
// Servidor socket
import { io } from "../../index.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Warehouse_GET = (socket) => {
    
};
//______________GET______________
//______________INSERT______________
export const Warehouse_INSERT = (socket) => {
    
}
//______________INSERT______________
//______________UPDATE______________
export const Warehouse_UPDATE = (socket) => {
    
}
//______________UPDATE______________
//______________DELETE______________
export const Warehouse_DELETE = (socket) =>  {
    
}
//______________DELETE______________