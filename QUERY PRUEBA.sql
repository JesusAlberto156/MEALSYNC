USE ComandaMedicaTepic

SELECT * FROM estatus;

SELECT * FROM observacionesProveedor;

SELECT * FROM usuarios;

SELECT * FROM permisos;

SELECT * FROM tipoUsuario;

INSERT INTO tipoUsuario (tipo) VALUES ('Prueba');

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
VALUES ('Observacion de prueba',3,GETDATE(),2);

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
WHERE idusuario >= 27

DBCC CHECKIDENT (permisos, RESEED, 0);
DBCC CHECKIDENT (estatus, RESEED, 0);
DBCC CHECKIDENT (usuarios, RESEED, 26);

DELETE FROM observacionesProveedor

DELETE FROM insumos

DELETE FROM proveedores

DBCC CHECKIDENT (proveedores, RESEED, 0);
DBCC CHECKIDENT (insumos, RESEED, 0);
DBCC CHECKIDENT (observacionesProveedor, RESEED, 0);

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