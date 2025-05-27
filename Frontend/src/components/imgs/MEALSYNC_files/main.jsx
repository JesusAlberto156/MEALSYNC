import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1d9aad79"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=1d9aad79"; const createRoot = __vite__cjsImport1_reactDom_client["createRoot"];
import { createHashRouter, RouterProvider } from "/node_modules/.vite/deps/react-router-dom.js?v=1d9aad79";
import { PrivateRouteAdministration } from "/src/routers/Administration.jsx";
import { PrivateRouteKitchen } from "/src/routers/Kitchen.jsx";
import { AppProviders } from "/src/contexts/AppProviders.jsx";
import "/src/components/styled/Alerts.css";
import "/src/components/styled/animations/Rolls.css";
import "/src/components/styled/animations/Shadows.css";
import "/src/components/styled/animations/Pulsates.css";
import "/src/components/styled/animations/Slides.css";
import "/src/components/styled/animations/Puffs.css";
import "/src/components/styled/animations/Bounces.css";
import "/src/components/styled/animations/Rotates.css";
import "/node_modules/animate.css/animate.css";
import "/node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import Index_Main from "/src/pages/Indexs/Main.jsx";
import Error from "/src/pages/general/Error.jsx";
import Loading from "/src/pages/general/Loading.jsx";
import Login from "/src/pages/general/Login.jsx";
import Out_Login from "/src/components/modals/general/OutLogin.jsx";
import Index_Administration from "/src/pages/Indexs/Administration.jsx";
import Administration_Home from "/src/pages/administration/Home.jsx";
import Administration_Index from "/src/pages/administration/Index.jsx";
import Table_Users from "/src/components/tables/users/Users.jsx";
import User_Add from "/src/components/modals/users/users/Add.jsx";
import User_Permissions_Add from "/src/components/modals/users/users/PermissionsAdd.jsx";
import User_Edit from "/src/components/modals/users/users/Edit.jsx";
import User_View from "/src/components/modals/users/users/View.jsx";
import Table_Permissions from "/src/components/tables/users/Permissions.jsx";
import Permissions_Add from "/src/components/modals/users/permissions/Add.jsx";
import Permissions_Edit from "/src/components/modals/users/permissions/Edit.jsx";
import Permissions_Enable from "/src/components/modals/users/permissions/Enable.jsx";
import Table_Status from "/src/components/tables/users/Status.jsx";
import Status_Add from "/src/components/modals/users/status/Add.jsx";
import Status_Enable from "/src/components/modals/users/status/Enable.jsx";
import Chart_Suppliers from "/src/components/charts/suppliers/Suppliers.jsx";
import Suppliers_Add from "/src/components/modals/Suppliers/suppliers/Add.jsx";
import Suppliers_Edit from "/src/components/modals/Suppliers/suppliers/Edit.jsx";
import Suppliers_Details from "/src/components/modals/Suppliers/suppliers/Details.jsx";
import Chart_Observations from "/src/components/charts/suppliers/Observations.jsx";
import Table_Warehouse from "/src/components/tables/warehouse/Warehouse.jsx";
import Table_Supplies from "/src/components/tables/warehouse/Supplies.jsx?t=1748367158822";
import Supply_Add from "/src/components/modals/warehouse/supplies/Add.jsx?t=1748370109776";
import Supply_Edit from "/src/components/modals/warehouse/supplies/Edit.jsx";
import Table_Supply_Types from "/src/components/tables/warehouse/SupplyTypes.jsx?t=1748366425129";
import Supply_Type_Add from "/src/components/modals/warehouse/supplyTypes/Add.jsx?t=1748367940985";
import Supply_Type_Edit from "/src/components/modals/warehouse/supplyTypes/Edit.jsx?t=1748367952802";
import Unit_Add from "/src/components/modals/warehouse/units.jsx/Add.jsx";
import Unit_Edit from "/src/components/modals/warehouse/units.jsx/Edit.jsx";
import Menus from "/src/pages/administration/Menus.jsx";
import Record from "/src/pages/administration/Record.jsx";
import Index_Kitchen from "/src/pages/Indexs/Kitchen.jsx";
import Home_Kitchen from "/src/pages/kitchen/Home.jsx";
const router = createHashRouter(
  [
    {
      path: "/",
      element: /* @__PURE__ */ jsxDEV(Loading, {}, void 0, false, {
        fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
        lineNumber: 67,
        columnNumber: 12
      }, this)
    },
    {
      path: "/Login",
      element: /* @__PURE__ */ jsxDEV(Login, {}, void 0, false, {
        fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
        lineNumber: 71,
        columnNumber: 12
      }, this)
    },
    {
      path: "/",
      element: /* @__PURE__ */ jsxDEV(Index_Main, {}, void 0, false, {
        fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
        lineNumber: 75,
        columnNumber: 12
      }, this),
      children: [
        {
          path: "/",
          element: /* @__PURE__ */ jsxDEV(PrivateRouteAdministration, {}, void 0, false, {
            fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
            lineNumber: 79,
            columnNumber: 14
          }, this),
          children: [
            {
              path: "Administration/Users/Add",
              element: /* @__PURE__ */ jsxDEV(User_Add, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 83,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Users/Add/Permissions",
              element: /* @__PURE__ */ jsxDEV(User_Permissions_Add, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 87,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Users/Edit",
              element: /* @__PURE__ */ jsxDEV(User_Edit, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 91,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Users/View",
              element: /* @__PURE__ */ jsxDEV(User_View, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 95,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Permissions/Add",
              element: /* @__PURE__ */ jsxDEV(Permissions_Add, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 99,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Permissions/Edit",
              element: /* @__PURE__ */ jsxDEV(Permissions_Edit, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 103,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Permissions/Enable",
              element: /* @__PURE__ */ jsxDEV(Permissions_Enable, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 107,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Status/Add",
              element: /* @__PURE__ */ jsxDEV(Status_Add, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 111,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Status/Enable",
              element: /* @__PURE__ */ jsxDEV(Status_Enable, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 115,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Suppliers/Add",
              element: /* @__PURE__ */ jsxDEV(Suppliers_Add, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 119,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Suppliers/Edit",
              element: /* @__PURE__ */ jsxDEV(Suppliers_Edit, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 123,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Suppliers/Details",
              element: /* @__PURE__ */ jsxDEV(Suppliers_Details, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 127,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Supplies/Add",
              element: /* @__PURE__ */ jsxDEV(Supply_Add, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 132,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Supplies/Edit",
              element: /* @__PURE__ */ jsxDEV(Supply_Edit, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 136,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Supply-Type/Add",
              element: /* @__PURE__ */ jsxDEV(Supply_Type_Add, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 140,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Supply-Type/Edit",
              element: /* @__PURE__ */ jsxDEV(Supply_Type_Edit, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 144,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Unit/Add",
              element: /* @__PURE__ */ jsxDEV(Unit_Add, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 148,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration/Unit/Edit",
              element: /* @__PURE__ */ jsxDEV(Unit_Edit, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 152,
                columnNumber: 16
              }, this)
            },
            {
              path: "Administration",
              element: /* @__PURE__ */ jsxDEV(Index_Administration, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 156,
                columnNumber: 16
              }, this),
              children: [
                {
                  path: "Home",
                  element: /* @__PURE__ */ jsxDEV(Administration_Home, {}, void 0, false, {
                    fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                    lineNumber: 160,
                    columnNumber: 18
                  }, this)
                },
                {
                  path: "Index",
                  element: /* @__PURE__ */ jsxDEV(Administration_Index, {}, void 0, false, {
                    fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                    lineNumber: 164,
                    columnNumber: 18
                  }, this),
                  children: [
                    {
                      path: "Users",
                      element: /* @__PURE__ */ jsxDEV(Table_Users, {}, void 0, false, {
                        fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                        lineNumber: 168,
                        columnNumber: 20
                      }, this)
                    },
                    {
                      path: "Permissions",
                      element: /* @__PURE__ */ jsxDEV(Table_Permissions, {}, void 0, false, {
                        fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                        lineNumber: 172,
                        columnNumber: 20
                      }, this)
                    },
                    {
                      path: "Status",
                      element: /* @__PURE__ */ jsxDEV(Table_Status, {}, void 0, false, {
                        fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                        lineNumber: 176,
                        columnNumber: 20
                      }, this)
                    },
                    {
                      path: "Suppliers",
                      element: /* @__PURE__ */ jsxDEV(Chart_Suppliers, {}, void 0, false, {
                        fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                        lineNumber: 180,
                        columnNumber: 20
                      }, this)
                    },
                    {
                      path: "Observations",
                      element: /* @__PURE__ */ jsxDEV(Chart_Observations, {}, void 0, false, {
                        fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                        lineNumber: 184,
                        columnNumber: 20
                      }, this)
                    },
                    {
                      path: "Warehouse",
                      element: /* @__PURE__ */ jsxDEV(Table_Warehouse, {}, void 0, false, {
                        fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                        lineNumber: 188,
                        columnNumber: 20
                      }, this)
                    },
                    {
                      path: "Supplies",
                      element: /* @__PURE__ */ jsxDEV(Table_Supplies, {}, void 0, false, {
                        fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                        lineNumber: 192,
                        columnNumber: 20
                      }, this)
                    },
                    {
                      path: "Supply-Types",
                      element: /* @__PURE__ */ jsxDEV(Table_Supply_Types, {}, void 0, false, {
                        fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                        lineNumber: 196,
                        columnNumber: 20
                      }, this)
                    }
                  ]
                },
                {
                  path: "Menus",
                  element: /* @__PURE__ */ jsxDEV(Menus, {}, void 0, false, {
                    fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                    lineNumber: 202,
                    columnNumber: 18
                  }, this)
                },
                {
                  path: "Record",
                  element: /* @__PURE__ */ jsxDEV(Record, {}, void 0, false, {
                    fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                    lineNumber: 206,
                    columnNumber: 18
                  }, this)
                }
              ]
            },
            {
              path: "Administration/Out_Login",
              element: /* @__PURE__ */ jsxDEV(Out_Login, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 212,
                columnNumber: 16
              }, this)
            }
          ]
        },
        {
          path: "/",
          element: /* @__PURE__ */ jsxDEV(PrivateRouteKitchen, {}, void 0, false, {
            fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
            lineNumber: 218,
            columnNumber: 14
          }, this),
          children: [
            {
              path: "Kitchen",
              element: /* @__PURE__ */ jsxDEV(Index_Kitchen, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 222,
                columnNumber: 16
              }, this),
              children: [
                {
                  path: "Home",
                  element: /* @__PURE__ */ jsxDEV(Home_Kitchen, {}, void 0, false, {
                    fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                    lineNumber: 226,
                    columnNumber: 18
                  }, this)
                }
              ]
            },
            {
              path: "Kitchen/Out_Login",
              element: /* @__PURE__ */ jsxDEV(Out_Login, {}, void 0, false, {
                fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
                lineNumber: 232,
                columnNumber: 16
              }, this)
            }
          ]
        }
      ]
    },
    {
      path: "*",
      element: /* @__PURE__ */ jsxDEV(Error, {}, void 0, false, {
        fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
        lineNumber: 240,
        columnNumber: 12
      }, this)
    }
  ]
);
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(AppProviders, { children: /* @__PURE__ */ jsxDEV(RouterProvider, { router }, void 0, false, {
    fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
    lineNumber: 246,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "C:/MEALSYNC/Frontend/src/main.jsx",
    lineNumber: 245,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,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QUFNO0FBQUEsY0FDTkMsU0FBUyx1QkFBQyxtQkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFjO0FBQUEsY0FDdkJDLFVBQVU7QUFBQSxnQkFDUjtBQUFBLGtCQUNFRixNQUFNO0FBQUEsa0JBQ05DLFNBQVMsdUJBQUMsa0JBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBYTtBQUFBLGdCQUN4QjtBQUFBLGNBQUM7QUFBQSxZQUVMO0FBQUEsWUFDQTtBQUFBLGNBQ0VELE1BQU07QUFBQSxjQUNOQyxTQUFTLHVCQUFDLGVBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBVTtBQUFBLFlBQ3JCO0FBQUEsVUFBQztBQUFBLFFBRUw7QUFBQSxNQUFDO0FBQUEsSUFFTDtBQUFBLElBQ0E7QUFBQSxNQUNFRCxNQUFLO0FBQUEsTUFDTEMsU0FBUSx1QkFBQyxXQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBTTtBQUFBLElBQ2hCO0FBQUEsRUFBQztBQUNGO0FBRUQ5QyxXQUFXZ0QsU0FBU0MsZUFBZSxNQUFNLENBQUMsRUFBRUM7QUFBQUEsRUFDMUMsdUJBQUMsZ0JBQ0MsaUNBQUMsa0JBQWUsVUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUErQixLQURqQztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBRUE7QUFDRiIsIm5hbWVzIjpbImNyZWF0ZVJvb3QiLCJjcmVhdGVIYXNoUm91dGVyIiwiUm91dGVyUHJvdmlkZXIiLCJQcml2YXRlUm91dGVBZG1pbmlzdHJhdGlvbiIsIlByaXZhdGVSb3V0ZUtpdGNoZW4iLCJBcHBQcm92aWRlcnMiLCJJbmRleF9NYWluIiwiRXJyb3IiLCJMb2FkaW5nIiwiTG9naW4iLCJPdXRfTG9naW4iLCJJbmRleF9BZG1pbmlzdHJhdGlvbiIsIkFkbWluaXN0cmF0aW9uX0hvbWUiLCJBZG1pbmlzdHJhdGlvbl9JbmRleCIsIlRhYmxlX1VzZXJzIiwiVXNlcl9BZGQiLCJVc2VyX1Blcm1pc3Npb25zX0FkZCIsIlVzZXJfRWRpdCIsIlVzZXJfVmlldyIsIlRhYmxlX1Blcm1pc3Npb25zIiwiUGVybWlzc2lvbnNfQWRkIiwiUGVybWlzc2lvbnNfRWRpdCIsIlBlcm1pc3Npb25zX0VuYWJsZSIsIlRhYmxlX1N0YXR1cyIsIlN0YXR1c19BZGQiLCJTdGF0dXNfRW5hYmxlIiwiQ2hhcnRfU3VwcGxpZXJzIiwiU3VwcGxpZXJzX0FkZCIsIlN1cHBsaWVyc19FZGl0IiwiU3VwcGxpZXJzX0RldGFpbHMiLCJDaGFydF9PYnNlcnZhdGlvbnMiLCJUYWJsZV9XYXJlaG91c2UiLCJUYWJsZV9TdXBwbGllcyIsIlN1cHBseV9BZGQiLCJTdXBwbHlfRWRpdCIsIlRhYmxlX1N1cHBseV9UeXBlcyIsIlN1cHBseV9UeXBlX0FkZCIsIlN1cHBseV9UeXBlX0VkaXQiLCJVbml0X0FkZCIsIlVuaXRfRWRpdCIsIk1lbnVzIiwiUmVjb3JkIiwiSW5kZXhfS2l0Y2hlbiIsIkhvbWVfS2l0Y2hlbiIsInJvdXRlciIsInBhdGgiLCJlbGVtZW50IiwiY2hpbGRyZW4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIm1haW4uanN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vX19fX19fX19fX19fSU1QT1JUL0VYUE9SVF9fX19fX19fX19fX1xyXG4vLyBIb29rcyBkZSBSZWFjdFxyXG5pbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSAncmVhY3QtZG9tL2NsaWVudCc7XHJcbmltcG9ydCB7IGNyZWF0ZUhhc2hSb3V0ZXIsIFJvdXRlclByb3ZpZGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuLy8gUnV0YXNcclxuaW1wb3J0IHsgUHJpdmF0ZVJvdXRlQWRtaW5pc3RyYXRpb24gfSBmcm9tICcuL3JvdXRlcnMvQWRtaW5pc3RyYXRpb24nO1xyXG5pbXBvcnQgeyBQcml2YXRlUm91dGVLaXRjaGVuIH0gZnJvbSAnLi9yb3V0ZXJzL0tpdGNoZW4nO1xyXG4vLyBDb250ZXh0b3NcclxuaW1wb3J0IHsgQXBwUHJvdmlkZXJzIH0gZnJvbSAnLi9jb250ZXh0cy9BcHBQcm92aWRlcnMnO1xyXG4vLyBFc3RpbG9zIHBlcnNvbmFsaXphZG9zXHJcbmltcG9ydCAnLi4vc3JjL2NvbXBvbmVudHMvc3R5bGVkL0FsZXJ0cy5jc3MnO1xyXG5pbXBvcnQgJy4uL3NyYy9jb21wb25lbnRzL3N0eWxlZC9hbmltYXRpb25zL1JvbGxzLmNzcyc7XHJcbmltcG9ydCAnLi4vc3JjL2NvbXBvbmVudHMvc3R5bGVkL2FuaW1hdGlvbnMvU2hhZG93cy5jc3MnO1xyXG5pbXBvcnQgJy4uL3NyYy9jb21wb25lbnRzL3N0eWxlZC9hbmltYXRpb25zL1B1bHNhdGVzLmNzcyc7XHJcbmltcG9ydCAnLi4vc3JjL2NvbXBvbmVudHMvc3R5bGVkL2FuaW1hdGlvbnMvU2xpZGVzLmNzcyc7XHJcbmltcG9ydCAnLi4vc3JjL2NvbXBvbmVudHMvc3R5bGVkL2FuaW1hdGlvbnMvUHVmZnMuY3NzJztcclxuaW1wb3J0ICcuLi9zcmMvY29tcG9uZW50cy9zdHlsZWQvYW5pbWF0aW9ucy9Cb3VuY2VzLmNzcyc7XHJcbmltcG9ydCAnLi4vc3JjL2NvbXBvbmVudHMvc3R5bGVkL2FuaW1hdGlvbnMvUm90YXRlcy5jc3MnO1xyXG5pbXBvcnQgJ2FuaW1hdGUuY3NzJztcclxuaW1wb3J0ICdyZWFjdC1iaWctY2FsZW5kYXIvbGliL2Nzcy9yZWFjdC1iaWctY2FsZW5kYXIuY3NzJztcclxuLy8gQ29tcG9uZW50ZXMgcGVyc29uYWxpemFkb3NcclxuaW1wb3J0IEluZGV4X01haW4gZnJvbSAnLi9wYWdlcy9JbmRleHMvTWFpbic7XHJcbmltcG9ydCBFcnJvciBmcm9tICcuL3BhZ2VzL2dlbmVyYWwvRXJyb3InO1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tICcuL3BhZ2VzL2dlbmVyYWwvTG9hZGluZyc7XHJcbmltcG9ydCBMb2dpbiBmcm9tICcuL3BhZ2VzL2dlbmVyYWwvTG9naW4nO1xyXG5pbXBvcnQgT3V0X0xvZ2luIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbHMvZ2VuZXJhbC9PdXRMb2dpbic7XHJcbmltcG9ydCBJbmRleF9BZG1pbmlzdHJhdGlvbiBmcm9tICcuL3BhZ2VzL0luZGV4cy9BZG1pbmlzdHJhdGlvbic7XHJcbmltcG9ydCBBZG1pbmlzdHJhdGlvbl9Ib21lIGZyb20gJy4vcGFnZXMvYWRtaW5pc3RyYXRpb24vSG9tZSc7XHJcbmltcG9ydCBBZG1pbmlzdHJhdGlvbl9JbmRleCBmcm9tICcuL3BhZ2VzL2FkbWluaXN0cmF0aW9uL0luZGV4JztcclxuaW1wb3J0IFRhYmxlX1VzZXJzIGZyb20gJy4vY29tcG9uZW50cy90YWJsZXMvdXNlcnMvVXNlcnMnO1xyXG5pbXBvcnQgVXNlcl9BZGQgZnJvbSAnLi9jb21wb25lbnRzL21vZGFscy91c2Vycy91c2Vycy9BZGQnO1xyXG5pbXBvcnQgVXNlcl9QZXJtaXNzaW9uc19BZGQgZnJvbSAnLi9jb21wb25lbnRzL21vZGFscy91c2Vycy91c2Vycy9QZXJtaXNzaW9uc0FkZCc7XHJcbmltcG9ydCBVc2VyX0VkaXQgZnJvbSAnLi9jb21wb25lbnRzL21vZGFscy91c2Vycy91c2Vycy9FZGl0JztcclxuaW1wb3J0IFVzZXJfVmlldyBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWxzL3VzZXJzL3VzZXJzL1ZpZXcnO1xyXG5pbXBvcnQgVGFibGVfUGVybWlzc2lvbnMgZnJvbSAnLi9jb21wb25lbnRzL3RhYmxlcy91c2Vycy9QZXJtaXNzaW9ucyc7XHJcbmltcG9ydCBQZXJtaXNzaW9uc19BZGQgZnJvbSAnLi9jb21wb25lbnRzL21vZGFscy91c2Vycy9wZXJtaXNzaW9ucy9BZGQnO1xyXG5pbXBvcnQgUGVybWlzc2lvbnNfRWRpdCBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWxzL3VzZXJzL3Blcm1pc3Npb25zL0VkaXQnO1xyXG5pbXBvcnQgUGVybWlzc2lvbnNfRW5hYmxlIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbHMvdXNlcnMvcGVybWlzc2lvbnMvRW5hYmxlJztcclxuaW1wb3J0IFRhYmxlX1N0YXR1cyBmcm9tICcuL2NvbXBvbmVudHMvdGFibGVzL3VzZXJzL1N0YXR1cyc7XHJcbmltcG9ydCBTdGF0dXNfQWRkIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbHMvdXNlcnMvc3RhdHVzL0FkZCc7XHJcbmltcG9ydCBTdGF0dXNfRW5hYmxlIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbHMvdXNlcnMvc3RhdHVzL0VuYWJsZSc7XHJcbmltcG9ydCBDaGFydF9TdXBwbGllcnMgZnJvbSAnLi9jb21wb25lbnRzL2NoYXJ0cy9zdXBwbGllcnMvU3VwcGxpZXJzJztcclxuaW1wb3J0IFN1cHBsaWVyc19BZGQgZnJvbSAnLi9jb21wb25lbnRzL21vZGFscy9TdXBwbGllcnMvc3VwcGxpZXJzL0FkZCc7XHJcbmltcG9ydCBTdXBwbGllcnNfRWRpdCBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWxzL1N1cHBsaWVycy9zdXBwbGllcnMvRWRpdCc7XHJcbmltcG9ydCBTdXBwbGllcnNfRGV0YWlscyBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWxzL1N1cHBsaWVycy9zdXBwbGllcnMvRGV0YWlscyc7XHJcbmltcG9ydCBDaGFydF9PYnNlcnZhdGlvbnMgZnJvbSAnLi9jb21wb25lbnRzL2NoYXJ0cy9zdXBwbGllcnMvT2JzZXJ2YXRpb25zJztcclxuXHJcbmltcG9ydCBUYWJsZV9XYXJlaG91c2UgZnJvbSAnLi9jb21wb25lbnRzL3RhYmxlcy93YXJlaG91c2UvV2FyZWhvdXNlJztcclxuaW1wb3J0IFRhYmxlX1N1cHBsaWVzIGZyb20gJy4vY29tcG9uZW50cy90YWJsZXMvd2FyZWhvdXNlL1N1cHBsaWVzJztcclxuaW1wb3J0IFN1cHBseV9BZGQgZnJvbSAnLi9jb21wb25lbnRzL21vZGFscy93YXJlaG91c2Uvc3VwcGxpZXMvQWRkJztcclxuaW1wb3J0IFN1cHBseV9FZGl0IGZyb20gJy4vY29tcG9uZW50cy9tb2RhbHMvd2FyZWhvdXNlL3N1cHBsaWVzL0VkaXQnO1xyXG5pbXBvcnQgVGFibGVfU3VwcGx5X1R5cGVzIGZyb20gJy4vY29tcG9uZW50cy90YWJsZXMvd2FyZWhvdXNlL1N1cHBseVR5cGVzJztcclxuaW1wb3J0IFN1cHBseV9UeXBlX0FkZCBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWxzL3dhcmVob3VzZS9zdXBwbHlUeXBlcy9BZGQnO1xyXG5pbXBvcnQgU3VwcGx5X1R5cGVfRWRpdCBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWxzL3dhcmVob3VzZS9zdXBwbHlUeXBlcy9FZGl0JztcclxuaW1wb3J0IFVuaXRfQWRkIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbHMvd2FyZWhvdXNlL3VuaXRzLmpzeC9BZGQnO1xyXG5pbXBvcnQgVW5pdF9FZGl0IGZyb20gJy4vY29tcG9uZW50cy9tb2RhbHMvd2FyZWhvdXNlL3VuaXRzLmpzeC9FZGl0JztcclxuXHJcbmltcG9ydCBNZW51cyBmcm9tICcuL3BhZ2VzL2FkbWluaXN0cmF0aW9uL01lbnVzJztcclxuaW1wb3J0IFJlY29yZCBmcm9tICcuL3BhZ2VzL2FkbWluaXN0cmF0aW9uL1JlY29yZCc7XHJcbmltcG9ydCBJbmRleF9LaXRjaGVuIGZyb20gJy4vcGFnZXMvSW5kZXhzL0tpdGNoZW4nO1xyXG5pbXBvcnQgSG9tZV9LaXRjaGVuIGZyb20gJy4vcGFnZXMva2l0Y2hlbi9Ib21lJztcclxuLy9fX19fX19fX19fX19JTVBPUlQvRVhQT1JUX19fX19fX19fX19fXHJcblxyXG5jb25zdCByb3V0ZXIgPSBjcmVhdGVIYXNoUm91dGVyKFtcclxuICB7XHJcbiAgICBwYXRoOicvJyxcclxuICAgIGVsZW1lbnQ6PExvYWRpbmcvPlxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9Mb2dpbicsXHJcbiAgICBlbGVtZW50OiA8TG9naW4vPlxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDonLycsXHJcbiAgICBlbGVtZW50OiA8SW5kZXhfTWFpbi8+LFxyXG4gICAgY2hpbGRyZW46IFtcclxuICAgICAge1xyXG4gICAgICAgIHBhdGg6ICcvJyxcclxuICAgICAgICBlbGVtZW50OiA8UHJpdmF0ZVJvdXRlQWRtaW5pc3RyYXRpb24vPixcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnQWRtaW5pc3RyYXRpb24vVXNlcnMvQWRkJyxcclxuICAgICAgICAgICAgZWxlbWVudDogPFVzZXJfQWRkLz4sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnQWRtaW5pc3RyYXRpb24vVXNlcnMvQWRkL1Blcm1pc3Npb25zJyxcclxuICAgICAgICAgICAgZWxlbWVudDogPFVzZXJfUGVybWlzc2lvbnNfQWRkLz4sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnQWRtaW5pc3RyYXRpb24vVXNlcnMvRWRpdCcsXHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IDxVc2VyX0VkaXQvPixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhdGg6ICdBZG1pbmlzdHJhdGlvbi9Vc2Vycy9WaWV3JyxcclxuICAgICAgICAgICAgZWxlbWVudDogPFVzZXJfVmlldy8+LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcGF0aDogJ0FkbWluaXN0cmF0aW9uL1Blcm1pc3Npb25zL0FkZCcsXHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IDxQZXJtaXNzaW9uc19BZGQvPixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhdGg6ICdBZG1pbmlzdHJhdGlvbi9QZXJtaXNzaW9ucy9FZGl0JyxcclxuICAgICAgICAgICAgZWxlbWVudDogPFBlcm1pc3Npb25zX0VkaXQvPixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhdGg6ICdBZG1pbmlzdHJhdGlvbi9QZXJtaXNzaW9ucy9FbmFibGUnLFxyXG4gICAgICAgICAgICBlbGVtZW50OiA8UGVybWlzc2lvbnNfRW5hYmxlLz4sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnQWRtaW5pc3RyYXRpb24vU3RhdHVzL0FkZCcsXHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IDxTdGF0dXNfQWRkLz4sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnQWRtaW5pc3RyYXRpb24vU3RhdHVzL0VuYWJsZScsXHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IDxTdGF0dXNfRW5hYmxlLz4sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnQWRtaW5pc3RyYXRpb24vU3VwcGxpZXJzL0FkZCcsXHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IDxTdXBwbGllcnNfQWRkLz4sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnQWRtaW5pc3RyYXRpb24vU3VwcGxpZXJzL0VkaXQnLFxyXG4gICAgICAgICAgICBlbGVtZW50OiA8U3VwcGxpZXJzX0VkaXQvPixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhdGg6ICdBZG1pbmlzdHJhdGlvbi9TdXBwbGllcnMvRGV0YWlscycsXHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IDxTdXBwbGllcnNfRGV0YWlscy8+LFxyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhdGg6ICdBZG1pbmlzdHJhdGlvbi9TdXBwbGllcy9BZGQnLFxyXG4gICAgICAgICAgICBlbGVtZW50OiA8U3VwcGx5X0FkZC8+LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcGF0aDogJ0FkbWluaXN0cmF0aW9uL1N1cHBsaWVzL0VkaXQnLFxyXG4gICAgICAgICAgICBlbGVtZW50OiA8U3VwcGx5X0VkaXQvPixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhdGg6ICdBZG1pbmlzdHJhdGlvbi9TdXBwbHktVHlwZS9BZGQnLFxyXG4gICAgICAgICAgICBlbGVtZW50OiA8U3VwcGx5X1R5cGVfQWRkLz4sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnQWRtaW5pc3RyYXRpb24vU3VwcGx5LVR5cGUvRWRpdCcsXHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IDxTdXBwbHlfVHlwZV9FZGl0Lz4sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnQWRtaW5pc3RyYXRpb24vVW5pdC9BZGQnLFxyXG4gICAgICAgICAgICBlbGVtZW50OiA8VW5pdF9BZGQvPixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhdGg6ICdBZG1pbmlzdHJhdGlvbi9Vbml0L0VkaXQnLFxyXG4gICAgICAgICAgICBlbGVtZW50OiA8VW5pdF9FZGl0Lz4sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnQWRtaW5pc3RyYXRpb24nLFxyXG4gICAgICAgICAgICBlbGVtZW50OiA8SW5kZXhfQWRtaW5pc3RyYXRpb24vPixcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiAnSG9tZScsXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiA8QWRtaW5pc3RyYXRpb25fSG9tZS8+XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiAnSW5kZXgnLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogPEFkbWluaXN0cmF0aW9uX0luZGV4Lz4sXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJ1VzZXJzJyxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiA8VGFibGVfVXNlcnMvPixcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICdQZXJtaXNzaW9ucycsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogPFRhYmxlX1Blcm1pc3Npb25zLz4sXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnU3RhdHVzJyxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiA8VGFibGVfU3RhdHVzLz4sXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnU3VwcGxpZXJzJyxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiA8Q2hhcnRfU3VwcGxpZXJzLz5cclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICdPYnNlcnZhdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IDxDaGFydF9PYnNlcnZhdGlvbnMvPlxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJ1dhcmVob3VzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogPFRhYmxlX1dhcmVob3VzZS8+XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnU3VwcGxpZXMnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IDxUYWJsZV9TdXBwbGllcy8+XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnU3VwcGx5LVR5cGVzJyxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiA8VGFibGVfU3VwcGx5X1R5cGVzLz5cclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6ICdNZW51cycsXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiA8TWVudXMvPlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogJ1JlY29yZCcsXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiA8UmVjb3JkLz4sXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnQWRtaW5pc3RyYXRpb24vT3V0X0xvZ2luJyxcclxuICAgICAgICAgICAgZWxlbWVudDogPE91dF9Mb2dpbi8+XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHBhdGg6ICcvJyxcclxuICAgICAgICBlbGVtZW50OiA8UHJpdmF0ZVJvdXRlS2l0Y2hlbi8+LFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhdGg6ICdLaXRjaGVuJyxcclxuICAgICAgICAgICAgZWxlbWVudDogPEluZGV4X0tpdGNoZW4vPixcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiAnSG9tZScsXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiA8SG9tZV9LaXRjaGVuLz5cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnS2l0Y2hlbi9PdXRfTG9naW4nLFxyXG4gICAgICAgICAgICBlbGVtZW50OiA8T3V0X0xvZ2luLz5cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgXVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDonKicsXHJcbiAgICBlbGVtZW50OjxFcnJvci8+XHJcbiAgfVxyXG5dKTtcclxuXHJcbmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSkucmVuZGVyKFxyXG4gIDxBcHBQcm92aWRlcnM+XHJcbiAgICA8Um91dGVyUHJvdmlkZXIgcm91dGVyPXtyb3V0ZXJ9Lz5cclxuICA8L0FwcFByb3ZpZGVycz4gXHJcbikiXSwiZmlsZSI6IkM6L01FQUxTWU5DL0Zyb250ZW5kL3NyYy9tYWluLmpzeCJ9