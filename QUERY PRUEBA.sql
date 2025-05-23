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