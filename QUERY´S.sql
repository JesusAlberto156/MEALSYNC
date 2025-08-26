USE ComandaMedicaTepic

ALTER TABLE pedidosAreaMedica
DROP COLUMN folio;
ALTER TABLE pedidosAreaMedica
DROP COLUMN fechacirugia;
ALTER TABLE pedidosAreaMedica
ADD idcirugia INT;
ALTER TABLE pedidosAreaMedica
ADD CONSTRAINT DF_pedidosAreaMedica_Fecha DEFAULT GETDATE() FOR fecha;

SELECT * FROM claveAutorizacion