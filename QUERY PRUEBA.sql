USE ComandaMedicaTepic

select * from almacenCategorias;
ALTER TABLE almacenTipoInsumo
ADD fecha DATETIME NOT NULL 
ALTER TABLE almacenTipoInsumo
ADD transaccion VARCHAR(20) NOT NULL 

INSERT INTO almacenCategorias (cantidadreal,precio,idcategoria,transaccion) VALUES (25,3000,2,'Compra');

INSERT INTO almacenCategorias (cantidadreal,precio,fecha,idcategoria,transaccion) VALUES (25,3000,'2025-02-22 14:30:00',1,'Compra');
INSERT INTO almacenCategorias (cantidadreal,precio,fecha,idcategoria,transaccion) VALUES (5,300,'2025-02-25 14:30:00',2,'Compra');
INSERT INTO almacenCategorias (cantidadreal,precio,fecha,idcategoria,transaccion) VALUES (15,1500,'2025-03-15 14:30:00',2,'Compra');
INSERT INTO almacenCategorias (cantidadreal,precio,fecha,idcategoria,transaccion) VALUES (22,3500,'2025-04-29 14:30:00',3,'Compra');
INSERT INTO almacenCategorias (cantidadreal,precio,fecha,idcategoria,transaccion) VALUES (20,3100,'2025-05-05 14:30:00',1,'Compra');

ALTER TABLE almacenTipoInsumo
ADD CONSTRAINT DF_almacenTipoInsumo_Fecha DEFAULT GETDATE() FOR fecha;

ALTER TABLE almacenCategorias
ADD fecha DATETIME NOT NULL 
ALTER TABLE almacenCategorias
ADD transaccion VARCHAR(20) NOT NULL 

ALTER TABLE almacenCategorias
ADD CONSTRAINT DF_almacenCategorias_Fecha DEFAULT GETDATE() FOR fecha;
DELETE FROM categoriasInsumo WHERE idcategoria = 2

ALTER TABLE tipoInsumo
ADD limite DECIMAL(10,4) NOT NULL 

ALTER TABLE insumos
ADD idcantidad INT NOT NULL 


ALTER TABLE tipoInsumo
ALTER COLUMN descripcion VARCHAR(250) NULL


ALTER TABLE categoriasInsumo
ALTER COLUMN descripcion VARCHAR(250) NULL
ALTER TABLE categoriasInsumo
ALTER COLUMN cantidad INT NULL
ALTER TABLE categoriasInsumo
ALTER COLUMN precio DECIMAL(12,4) NULL
ALTER TABLE categoriasInsumo
ALTER COLUMN idalmacen INT NULL

ALTER TABLE almacenCategorias
ADD idcategoria INT NOT NULL 
ALTER TABLE categoriasInsumo
DROP COLUMN cantidad;
ALTER TABLE categoriasInsumo
DROP COLUMN precio;
ALTER TABLE categoriasInsumo
DROP COLUMN idalmacen;

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

ALTER TABLE especificacionesPlatillo
ALTER COLUMN precio DECIMAL(12,4) NOT NULL
ALTER TABLE especificacionesBebida
ALTER COLUMN precio DECIMAL(12,4) NOT NULL
ALTER TABLE especificacionesGuarnicion
ALTER COLUMN precio DECIMAL(12,4) NOT NULL

ALTER TABLE almacenPlatillo
ALTER COLUMN cantidad DECIMAL(10,4) NOT NULL
ALTER TABLE almacenBebida
ALTER COLUMN cantidad DECIMAL(10,4) NOT NULL
ALTER TABLE almacenGuarnicion
ALTER COLUMN cantidad DECIMAL(10,4) NOT NULL

ALTER TABLE logComandaMedicaTepic
ADD CONSTRAINT DF_logCamandaMedicaTepic_Fecha DEFAULT GETDATE() FOR fecha;
DBCC CHECKIDENT (cantidadTipoInsumo, RESEED, 0);
delete from cantidadTipoInsumo
select * from usuariosEliminados;
SELECT * FROM cantidadTipoInsumo;
SELECT * FROM logComandaMedicaTepic;
select * from insumosEliminados;
DELETE FROM logComandaMedicaTepic;
select*from categoriasInsumo
DELETE FROM usuarios WHERE idusuario > 2
DELETE FROM permisos WHERE idusuario > 1
DELETE FROM estatus WHERE idusuario > 1
DBCC CHECKIDENT (logComandaMedicaTepic, RESEED, 0);
DBCC CHECKIDENT (usuarios, RESEED, 2);
DBCC CHECKIDENT (permisos, RESEED, 1);
DBCC CHECKIDENT (estatus, RESEED, 1);

DBCC CHECKIDENT (categoriasInsumo, RESEED, 1);
SELECT * FROM estatus;

SELECT SYSDATETIMEOFFSET() AS FechaConZonaHoraria;

SELECT * FROM observacionesProveedor;

SELECT * FROM usuarios;

SELECT * FROM usuariosEliminados

SELECT * FROM permisos;

SELECT * FROM tipoUsuario;

INSERT INTO tipoUsuario (tipo) VALUES ('Ti');

INSERT INTO usuarios (nombre,nombrecorto,usuario,contrasena,idtipo) 
VALUES ('JESUS ALBERTO PARTIDA MICHEL','JESUS PARTIDA','U.Partida04','Legendario156',4);

INSERT INTO permisos (administrador,chef,almacenista,cocinero,nutriologo,medico,superadministrador,idusuario) 
VALUES (1,1,1,1,1,1,1,27);

INSERT INTO permisos (administrador,chef,almacenista,cocinero,nutriologo,medico,superadministrador,idusuario) 
VALUES (0,0,0,0,0,0,1,27);

INSERT INTO estatus(habilitado,activo,idusuario) 
VALUES (1,0,27);

INSERT INTO proveedores(nombre,rfc,domicilio,telefono,correo) 
VALUES ('PROVEEDOR DE PRUEBA 10','040903PRUEBA','AV. PRUEBA 10','3221023945','prueba10@gmail.com');

INSERT INTO observacionesProveedor(observacion,calificacion,fecha,idproveedor)
VALUES ('Observacion de prueba',5,GETDATE(),2);

INSERT INTO estatus(habilitado,activo,idusuario) 
VALUES (1,0,28);

DELETE estatus WHERE idusuario = 27;

UPDATE estatus SET habilitado = 1  WHERE idusuario = 28; 
UPDATE estatus SET activo = 0  WHERE idusuario = 27; 

SELECT * FROM dbo.platillo

ALTER TABLE precioInsumo
ADD idusuario INT NOT NULL 

ALTER TABLE precioInsumo
ADD estado VARCHAR(20) NULL 

ALTER TABLE precioInsumo
DROP COLUMN estado;

SELECT * FROM menu

SELECT * FROM platillo

SELECT * FROM guarnicion

SELECT * FROM bebida

INSERT INTO medida(medida)
VALUES ('Litros');

UPDATE medida SET unidad = ('Kilogramos') WHERE idmedida = 1;
UPDATE medida SET medida = ('Paquete'), cantidad = (0.750) WHERE idmedida = 1; 

UPDATE medida SET unidad = ('Kilogramos') WHERE idmedida = 2;
UPDATE medida SET medida = ('Paquete'), cantidad = (1) WHERE idmedida = 2; 

INSERT INTO tipoInsumo(tipo,descripcion,idmedida)
VALUES ('carne de res','Producto provinente del ganado vacuno','1');

SELECT * FROM medida
SELECT * FROM tipoInsumo

SELECT * FROM insumos

INSERT INTO insumos(nombre,descripcion,imagen,idproveedor,idtipo)
VALUES ('Leche Entera Vaca Blanca','','https://us-central1-yema-cdn.cloudfunctions.net/cdn/api/v1/yema-plm/images/view/productImage/32303-leche-entera-vaca-blanca-1_785c7390-75b2-4375-83cd-0cdae9676e51=fjpg-q80-tcrop-w688',3,1);

DELETE FROM permisos

DELETE FROM estatus

DELETE FROM usuarios 
WHERE idusuario >= 33

DELETE FROM permisos 
WHERE idusuario >= 33

DELETE FROM estatus
WHERE idusuario >= 32

ALTER TABLE observacionesProveedor
DROP COLUMN idusuario;

ALTER TABLE precioInsumo
DROP COLUMN idusuario;

DBCC CHECKIDENT (permisos, RESEED, 8);
DBCC CHECKIDENT (estatus, RESEED, 7);
DBCC CHECKIDENT (usuarios, RESEED, 32);

DELETE FROM observacionesProveedor

DELETE FROM insumos

DELETE FROM proveedores

DELETE FROM usuariosEliminados

DBCC CHECKIDENT (proveedores, RESEED, 0);
DBCC CHECKIDENT (insumos, RESEED, 0);
DBCC CHECKIDENT (observacionesProveedor, RESEED, 0);
DBCC CHECKIDENT (usuariosEliminados, RESEED, 0);

SELECT * FROM proveedores
SELECT * FROM almacen

ALTER TABLE medida
ADD cantidad DECIMAL(10,4) NULL 

DELETE FROM tipoInsumo

DELETE FROM insumos

DELETE FROM medida

DBCC CHECKIDENT (tipoInsumo, RESEED, 0);
DBCC CHECKIDENT (insumos, RESEED, 0);
DBCC CHECKIDENT (medida, RESEED, 0);
/*MODIFICACIONES PARA LA BASE DE DATOS*/
ALTER TABLE almacen
ALTER COLUMN cantidad INT NOT NULL

ALTER TABLE estatus
ALTER COLUMN habilitado BIT NOT NULL
ALTER TABLE estatus
ALTER COLUMN activo BIT NOT NULL

ALTER TABLE insumos
ALTER COLUMN nombre VARCHAR(150) NOT NULL

ALTER TABLE dbo.medida
ALTER COLUMN medida VARCHAR(20) NOT NULL
ALTER TABLE dbo.medida
ALTER COLUMN unidad VARCHAR(20) NOT NULL
ALTER TABLE dbo.medida
ALTER COLUMN cantidad DECIMAL(10,4) NOT NULL

ALTER TABLE dbo.observacionesProveedor
ALTER COLUMN calificacion INT NOT NULL
ALTER TABLE dbo.observacionesProveedor
ALTER COLUMN fecha DATETIME NOT NULL
ALTER TABLE dbo.observacionesProveedor
ADD idusuario INT NOT NULL

ALTER TABLE dbo.permisos
ALTER COLUMN administrador BIT NOT NULL
ALTER TABLE dbo.permisos
ALTER COLUMN chef BIT NOT NULL
ALTER TABLE dbo.permisos
ALTER COLUMN almacenista BIT NOT NULL
ALTER TABLE dbo.permisos
ALTER COLUMN cocinero BIT NOT NULL
ALTER TABLE dbo.permisos
ALTER COLUMN nutriologo BIT NOT NULL
ALTER TABLE dbo.permisos
ALTER COLUMN medico BIT NOT NULL
ALTER TABLE dbo.permisos
ALTER COLUMN superadministrador BIT NOT NULL
ALTER TABLE dbo.permisos
ALTER COLUMN idusuario INT NOT NULL

ALTER TABLE dbo.precioInsumo
ALTER COLUMN precio INT NOT NULL
ALTER TABLE dbo.precioInsumo
ALTER COLUMN fecha DATETIME NOT NULL
ALTER TABLE dbo.precioInsumo
ALTER COLUMN estado VARCHAR(20) NOT NULL

ALTER TABLE dbo.proveedores
ALTER COLUMN nombre VARCHAR(150) NOT NULL

ALTER TABLE dbo.tipoInsumo
ALTER COLUMN tipo VARCHAR(150) NOT NULL

ALTER TABLE dbo.almacenPlatillo
ADD cantidad INT NOT NULL
 
CREATE TABLE almacenBebida (
    idalmacen INT NOT NULL,
    idbebida INT NOT NULL,
    cantidad INT NOT NULL,
)

CREATE TABLE almacenGuarnicion (
    idalmacen INT NOT NULL,
    idguarnicion INT NOT NULL,
    cantidad INT NOT NULL,
)

CREATE TABLE especificacionesPlatillo (
    idespecificacion INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    descripcion VARCHAR(250) NULL,
    precio INT NOT NULL,
	preparacion INT NOT NULL,
	idplatillo INT NOT NULL
)

CREATE TABLE especificacionesBebida (
    idespecificacion INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    descripcion VARCHAR(250) NULL,
    precio INT NOT NULL,
	preparacion INT NOT NULL,
	idbebida INT NOT NULL
)

CREATE TABLE especificacionesGuarnicion (
    idespecificacion INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    descripcion VARCHAR(250) NULL,
    precio INT NOT NULL,
	preparacion INT NOT NULL,
	idguarnicion INT NOT NULL
)

CREATE TABLE tipoMenu (
    idtipo INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    nombre VARCHAR(100) NOT NULL
)

CREATE TABLE tipoMenuPlatillo (
    idtipo INT NOT NULL,
    idplatillo INT NOT NULL,
)

CREATE TABLE tipoMenuBebida (
    idtipo INT NOT NULL,
    idbebida INT NOT NULL,
)

CREATE TABLE tipoMenuGuarnicion (
    idtipo INT NOT NULL,
    idguarnicion INT NOT NULL,
)
/*MODIFICACIONES PARA LA BASE DE DATOS*/

SELECT * FROM medicos

ALTER TABLE dbo.precioInsumo
ALTER COLUMN precio DECIMAL(12,4) NOT NULL

EXEC sp_rename 'medida.medida', 'nombre', 'COLUMN';