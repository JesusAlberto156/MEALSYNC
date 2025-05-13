USE ComandaMedicaTepic

SELECT * FROM estatus;


SELECT * FROM observacionesProveedor;

SELECT * FROM usuarios;

SELECT * FROM permisos;

SELECT * FROM tipoUsuario;

INSERT INTO tipoUsuario (tipo) VALUES ('Prueba');

INSERT INTO usuarios (nombre,nombrecorto,usuario,contrasena,idtipo) 
VALUES ('USUARIO DE PRUEBA 2','PRUEBA 2','U.Prueba2','prueba123',4);

INSERT INTO permisos (administrador,chef,almacenista,cocinero,nutriologo,medico,superadministrador,idusuario) 
VALUES (1,1,1,1,1,1,1,27);

INSERT INTO permisos (administrador,chef,almacenista,cocinero,nutriologo,medico,superadministrador,idusuario) 
VALUES (0,0,0,1,0,0,0,28);

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

INSERT INTO tipoInsumo(tipo,descripcion,idmedida)
VALUES ('carne de res','Producto provinente del ganado vacuno','1');

SELECT * FROM medida
SELECT * FROM tipoInsumo

SELECT * FROM insumos

INSERT INTO insumos(nombre,descripcion,imagen,idproveedor,idtipo)
VALUES ('Leche Entera Vaca Blanca','','https://us-central1-yema-cdn.cloudfunctions.net/cdn/api/v1/yema-plm/images/view/productImage/32303-leche-entera-vaca-blanca-1_785c7390-75b2-4375-83cd-0cdae9676e51=fjpg-q80-tcrop-w688',3,1);

