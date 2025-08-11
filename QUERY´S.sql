USE ComandaMedicaTepic

ALTER TABLE pedidosAreaMedica
DROP COLUMN folio;

ALTER TABLE pedidosAreaMedica
ADD CONSTRAINT DF_pedidosAreaMedica_Fecha DEFAULT GETDATE() FOR fecha;

use INFRAMED;
SELECT * FROM TiposCirugias
select * from ceye