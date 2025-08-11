USE ComandaMedicaTepic

/*--------OPERACIÓN DE TABLAS--------*/
ALTER TABLE (Tabla)
ADD (Nombre de columna) (Tipo de dato) 
ALTER TABLE (Tabla)
ALTER COLUMN (Nombre de columna) (Tipo de dato) 
ALTER TABLE (Tabla)
DROP COLUMN (Nombre de columna)
ALTER TABLE almacenTipoInsumo
ADD CONSTRAINT DF_almacenTipoInsumo_Fecha DEFAULT GETDATE() FOR fecha;
EXEC sp_rename 'NombreTabla.NombreColumnaAntigua', 'NombreColumnaNueva', 'COLUMN';
/*--------LOGS--------*/
/*______GET______*/
SELECT * FROM logComandaMedicaTepic;
/*______DELETE______*/
DELETE FROM logComandaMedicaTepic;
DBCC CHECKIDENT (logComandaMedicaTepic, RESEED, 0);
/*--------USUARIOS--------*/
/*______GET______*/
SELECT * FROM usuarios;
SELECT * FROM permisos;
SELECT * FROM estatus;
SELECT * FROM tipoUsuario;
SELECT * FROM usuariosEliminados;
/*______INSERT______*/
INSERT INTO usuarios (nombre,nombrecorto,usuario,contrasena,idtipo) 
VALUES ('JESUS ALBERTO PARTIDA MICHEL','JESUS PARTIDA','U.Partida04','Legendario156',1);
INSERT INTO permisos (administrador,chef,almacenista,cocinero,nutriologo,medico,superadministrador,idusuario) 
VALUES (1,0,0,0,0,0,1,1);
INSERT INTO estatus(habilitado,activo,idusuario) 
VALUES (1,0,1);
INSERT INTO tipoUsuario (tipo) VALUES ('TI');
INSERT INTO tipoUsuario (tipo) VALUES ('Cocina');
INSERT INTO tipoUsuario (tipo) VALUES ('Enfermeria');
/*______DELETE______*/
DELETE FROM usuarios; 
DBCC CHECKIDENT (usuarios, RESEED, 0);
DELETE FROM permisos;
DBCC CHECKIDENT (permisos, RESEED, 0);
DELETE FROM estatus;
DBCC CHECKIDENT (estatus, RESEED, 0);
DELETE FROM tipoUsuario;
DBCC CHECKIDENT (tipoUsuario, RESEED, 0);
DELETE FROM usuariosEliminados;
DBCC CHECKIDENT (usuariosEliminados, RESEED, 0);
/*--------PROVEEDORES--------*/
/*______GET______*/
SELECT * FROM proveedores;
SELECT * FROM observacionesProveedor;
SELECT * FROM proveedoresEliminados;
/*______DELETE______*/
DELETE FROM proveedores;
DBCC CHECKIDENT (proveedores, RESEED, 0);
DELETE FROM observacionesProveedor;
DBCC CHECKIDENT (observacionesProveedor, RESEED, 0);
DELETE FROM proveedoresEliminados;
DBCC CHECKIDENT (proveedoresEliminados, RESEED, 0);
/*--------INSUMOS--------*/
/*______GET______*/
SELECT * FROM categoriasInsumo;
SELECT * FROM categoriasInsumoEliminadas;
SELECT * FROM tipoInsumo;
SELECT * FROM cantidadTipoInsumo;
SELECT * FROM tipoInsumoEliminado;
SELECT * FROM insumos;
SELECT * FROM insumosEliminados;
/*______DELETE______*/
DELETE FROM categoriasInsumo;
DBCC CHECKIDENT (categoriasInsumo, RESEED, 0);
DELETE FROM categoriasInsumoEliminadas;
DBCC CHECKIDENT (categoriasInsumoEliminadas, RESEED, 0);
DELETE FROM tipoInsumo;
DBCC CHECKIDENT (tipoInsumo, RESEED, 0);
DELETE FROM cantidadTipoInsumo;
DBCC CHECKIDENT (cantidadTipoInsumo, RESEED, 0);
DELETE FROM tipoInsumoEliminado;
DBCC CHECKIDENT (tipoInsumoEliminado, RESEED, 0);
DELETE FROM insumos;
DBCC CHECKIDENT (insumos, RESEED, 0);
DELETE FROM insumosEliminados;
DBCC CHECKIDENT (insumosEliminados, RESEED, 0);
/*--------EXTRAS--------*/
/*______GET______*/
SELECT * FROM categoriasLimpieza;
SELECT * FROM categoriasLimpiezaEliminadas;
SELECT * FROM tipoLimpieza;
SELECT * FROM tipoLimpiezaEliminado;
SELECT * FROM cantidadTipoLimpieza;
SELECT * FROM suministrosLimpieza;
SELECT * FROM suministrosLimpiezaEliminados;
SELECT * FROM gastosFijos;
SELECT * FROM gastosFijosEliminados;
/*______DELETE______*/
DELETE FROM categoriasLimpieza;
DBCC CHECKIDENT (categoriasLimpieza, RESEED, 0);
DELETE FROM categoriasLimpiezaEliminadas;
DBCC CHECKIDENT (categoriasLimpiezaEliminadas, RESEED, 0);
DELETE FROM tipoLimpieza;
DBCC CHECKIDENT (tipoLimpieza, RESEED, 0);
DELETE FROM tipoLimpiezaEliminado;
DBCC CHECKIDENT (tipoLimpiezaEliminado, RESEED, 0);
DELETE FROM cantidadTipoLimpieza;
DBCC CHECKIDENT (cantidadTipoLimpieza, RESEED, 0);
DELETE FROM suministrosLimpieza;
DBCC CHECKIDENT (suministrosLimpieza, RESEED, 0);
DELETE FROM suministrosLimpiezaEliminados;
DBCC CHECKIDENT (suministrosLimpiezaEliminados, RESEED, 0);
DELETE FROM gastosFijos;
DBCC CHECKIDENT (gastosFijos, RESEED, 0);
DELETE FROM gastosFijosEliminados;
DBCC CHECKIDENT (gastosFijosEliminados, RESEED, 0);
/*--------INVENTARIO--------*/
/*______GET______*/
SELECT * FROM almacenCategorias;
SELECT * FROM almacenTipoInsumo;
SELECT * FROM almacenLimpieza;
SELECT * FROM almacenTipoLimpieza;
SELECT * FROM almacenGastosFijos;
SELECT * FROM pedidos;
SELECT * FROM pedidosEliminados;
SELECT * FROM pedidoInsumo;
SELECT * FROM pedidoSuministro;
SELECT * FROM mensajesPedidoInsumo;
SELECT * FROM mensajesPedidoSuministro;
/*______DELETE______*/
DELETE FROM almacenCategorias;
DBCC CHECKIDENT (almacenCategorias, RESEED, 0);
DELETE FROM almacenTipoInsumo;
DBCC CHECKIDENT (almacenTipoInsumo, RESEED, 0);
DELETE FROM almacenLimpieza;
DBCC CHECKIDENT (almacenLimpieza, RESEED, 0);
DELETE FROM almacenTipoLimpieza;
DBCC CHECKIDENT (almacenTipoLimpieza, RESEED, 0);
DELETE FROM almacenGastosFijos;
DBCC CHECKIDENT (almacenGastosFijos, RESEED, 0);
DELETE FROM pedidos;
DBCC CHECKIDENT (pedidos, RESEED, 0);
DELETE FROM pedidosEliminados;
DBCC CHECKIDENT (pedidosEliminados, RESEED, 0);
DELETE FROM pedidoInsumo;
DBCC CHECKIDENT (pedidoInsumo, RESEED, 0);
DELETE FROM pedidoSuministro;
DBCC CHECKIDENT (pedidoSuministro, RESEED, 0);
DELETE FROM mensajesPedidoInsumo;
DBCC CHECKIDENT (mensajesPedidoInsumo, RESEED, 0);
DELETE FROM mensajesPedidoSuministro;
DBCC CHECKIDENT (mensajesPedidoSuministro, RESEED, 0);
/*--------MENUS--------*/
/*______GET______*/
SELECT * FROM menu;
SELECT * FROM tipoMenu;
SELECT * FROM tipoMenuUbicacionMenu;
SELECT * FROM ubicacionMenu;
SELECT * FROM tipoMenuEliminado;
/*______INSERT______*/
INSERT INTO menu (nombre) 
VALUES ('Desayuno');
INSERT INTO menu (nombre) 
VALUES ('Comida');
INSERT INTO menu (nombre) 
VALUES ('Cena');
INSERT INTO ubicacionMenu(nombre) 
VALUES ('Cocina');
INSERT INTO ubicacionMenu(nombre) 
VALUES ('Nutriólogia');
INSERT INTO ubicacionMenu(nombre) 
VALUES ('Área médica');
/*______DELETE______*/
DELETE FROM menu;
DBCC CHECKIDENT (menu, RESEED, 0);
DELETE FROM tipoMenu;
DBCC CHECKIDENT (tipoMenu, RESEED, 0);
DELETE FROM tipoMenuUbicacionMenu;
DBCC CHECKIDENT (tipoMenuUbicacionMenu, RESEED, 0);
DELETE FROM ubicacionMenu;
DBCC CHECKIDENT (ubicacionMenu, RESEED, 0);
DELETE FROM tipoMenuEliminado;
DBCC CHECKIDENT (tipoMenuEliminado, RESEED, 0);
/*--------PLATILLOS--------*/
/*______GET______*/
SELECT * FROM platillo;
SELECT * FROM especificacionesPlatillo;
SELECT * FROM almacenPlatillo;
SELECT * FROM tipoMenuPlatillo;
SELECT * FROM platilloEliminado;
/*______DELETE______*/
DELETE FROM platillo;
DBCC CHECKIDENT (platillo, RESEED, 0);
DELETE FROM especificacionesPlatillo;
DBCC CHECKIDENT (especificacionesPlatillo, RESEED, 0);
DELETE FROM almacenPlatillo;
DBCC CHECKIDENT (almacenPlatillo, RESEED, 0);
DELETE FROM tipoMenuPlatillo;
DBCC CHECKIDENT (tipoMenuPlatillo, RESEED, 0);
DELETE FROM platilloEliminado;
DBCC CHECKIDENT (platilloEliminado, RESEED, 0);
/*--------BEBIDAS--------*/
/*______GET______*/
SELECT * FROM bebida;
SELECT * FROM especificacionesBebida;
SELECT * FROM almacenBebida;
SELECT * FROM tipoMenuBebida;
SELECT * FROM bebidaEliminada;
/*______DELETE______*/
DELETE FROM bebida;
DBCC CHECKIDENT (bebida, RESEED, 0);
DELETE FROM especificacionesBebida;
DBCC CHECKIDENT (especificacionesBebida, RESEED, 0);
DELETE FROM almacenBebida;
DBCC CHECKIDENT (almacenBebida, RESEED, 0);
DELETE FROM tipoMenuBebida;
DBCC CHECKIDENT (tipoMenuBebida, RESEED, 0);
DELETE FROM bebidaEliminada;
DBCC CHECKIDENT (bebidaEliminada, RESEED, 0);
/*--------GUARNICIONES--------*/
/*______GET______*/
SELECT * FROM guarnicion;
SELECT * FROM especificacionesGuarnicion;
SELECT * FROM almacenGuarnicion;
SELECT * FROM tipoMenuGuarnicion;
SELECT * FROM guarnicionEliminada;
/*______DELETE______*/
DELETE FROM guarnicion;
DBCC CHECKIDENT (guarnicion, RESEED, 0);
DELETE FROM especificacionesGuarnicion;
DBCC CHECKIDENT (especificacionesGuarnicion, RESEED, 0);
DELETE FROM almacenGuarnicion;
DBCC CHECKIDENT (almacenGuarnicion, RESEED, 0);
DELETE FROM tipoMenuGuarnicion;
DBCC CHECKIDENT (tipoMenuGuarnicion, RESEED, 0);
DELETE FROM guarnicionEliminada;
DBCC CHECKIDENT (guarnicionEliminada, RESEED, 0);