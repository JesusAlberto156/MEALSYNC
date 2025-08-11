USE ComandaMedicaTepic

ALTER TABLE insumos
ADD codigo VARCHAR(20); 
ALTER TABLE suministrosLimpieza
ADD codigo VARCHAR(20); 

ALTER TABLE categoriasLimpieza
DROP COLUMN unidad; 
ALTER TABLE categoriasLimpieza
DROP COLUMN limite; 

ALTER TABLE pedidosAreaMedica
ADD precio DECIMAL(12,4); 

ALTER TABLE pedidoInsumo
ADD estado VARCHAR(20); 
EXEC sp_rename 'pedidoInsumo.preciounitiario', 'preciounitario', 'COLUMN';
ALTER TABLE pedidoSuministro
ADD estado VARCHAR(20); 
EXEC sp_rename 'pedidoSuministro.preciounitiario', 'preciounitario', 'COLUMN';

ALTER TABLE mensajesPedidoSuministro
ADD tipo VARCHAR(20); 
ALTER TABLE mensajesPedidoInsumo
ADD tipo VARCHAR(20); 

ALTER TABLE mensajesPedidoSuministro
ADD estado VARCHAR(20); 
ALTER TABLE mensajesPedidoInsumo
ADD estado VARCHAR(20); 

ALTER TABLE mensajesPedidoSuministro
ADD idusuario INT; 
ALTER TABLE mensajesPedidoInsumo
ADD idusuario INT; 

ALTER TABLE observacionesProveedor
ADD idpedido INT; 

ALTER TABLE suministrosLimpieza
ADD idtipo INT; 

ALTER TABLE almacenLimpieza
ADD CONSTRAINT DF_almacenLimpieza_Fecha DEFAULT GETDATE() FOR fecha;
ALTER TABLE almacenGastosFijos
ADD CONSTRAINT DF_almacenGastosFijos_Fecha DEFAULT GETDATE() FOR fecha;
ALTER TABLE pedidoInsumo
ADD CONSTRAINT DF_pedidoInsumo_Fecha DEFAULT GETDATE() FOR fecha;
ALTER TABLE pedidoSuministro
ADD CONSTRAINT DF_pedidoSuministro_Fecha DEFAULT GETDATE() FOR fecha;
ALTER TABLE pedidos
ADD CONSTRAINT DF_pedidos_Fecha DEFAULT GETDATE() FOR fecha;
ALTER TABLE mensajesPedidoInsumo
ADD CONSTRAINT DF_mensajesPedidoInsumo_Fecha DEFAULT GETDATE() FOR fecha;
ALTER TABLE mensajesPedidoSuministro
ADD CONSTRAINT DF_mensajesPedidoSuministro_Fecha DEFAULT GETDATE() FOR fecha;
ALTER TABLE observacionesProveedor
ADD CONSTRAINT DF_observacionesProveedor_Fecha DEFAULT GETDATE() FOR fecha;
ALTER TABLE almacenTipoLimpieza
ADD CONSTRAINT DF_almacenTipoLimpieza_Fecha DEFAULT GETDATE() FOR fecha;

ALTER TABLE pedidosCocina
ADD CONSTRAINT DF_pedidosCocina_Fecha DEFAULT GETDATE() FOR fecha;

CREATE TABLE [dbo].[pedidosAreaMedica](
	[idpedido] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetime] NOT NULL,
	[folio] [int] NOT NULL,
	[sala] [varchar](10) NOT NULL,
	[cirugia] [varchar](100) NOT NULL,
	[medico] [varchar](150) NOT NULL,
	[solicitante] [varchar](150) NOT NULL,
	[idusuario] [int] NOT NULL,
 CONSTRAINT [PK_pedidosAreaMedica] PRIMARY KEY CLUSTERED 
(
	[idpedido] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[pedidoAreaMedica](
	[idpedidoindividual] [int] IDENTITY(1,1) NOT NULL,
	[estado] [varchar](50) NULL,
	[cometario] [varchar](100) NULL,
	[idplatillo] [int] NULL,
	[idguarnicion] [int] NULL,
	[idbebida] [int] NULL,
	[idpedido] [int] NOT NULL,
 CONSTRAINT [PK_pedidoAreaMedica] PRIMARY KEY CLUSTERED 
(
	[idpedidoindividual] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[pedidosCocina](
	[idpedido] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetime] NOT NULL,
	[tipoubicacion] [varchar](50) NULL,
	[ubicacion] [varchar](250) NULL,
	[encargado] [varchar](150) NULL,
	[precio] [decimal](12,4) NOT NULL,
	[estado] [varchar](50) NULL,
	[idusuario] [int] NOT NULL,
 CONSTRAINT [PK_pedidosCocina] PRIMARY KEY CLUSTERED 
(
	[idpedido] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[pedidoCocinaCantidad](
	[idpedidoindividual] [int] IDENTITY(1,1) NOT NULL,
	[cantidad] [int] NOT NULL,
	[estado] [varchar](50) NULL,
	[idplatillo] [int] NULL,
	[idguarnicion] [int] NULL,
	[idbebida] [int] NULL,
	[idpedido] [int] NOT NULL,
 CONSTRAINT [PK_pedidoCocinaCantidad] PRIMARY KEY CLUSTERED 
(
	[idpedidoindividual] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[pedidosNutricion](
	[idpedido] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetime] NOT NULL,
	[tiempo] [varchar](20) NOT NULL,
	[tipo] [varchar](50) NOT NULL,
	[precio] [decimal](12,4) NOT NULL,
	[idusuario] [int] NOT NULL,
 CONSTRAINT [PK_pedidosNutricion] PRIMARY KEY CLUSTERED 
(
	[idpedido] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[pedidoNutricion](
	[idpedidoindividual] [int] IDENTITY(1,1) NOT NULL,
	[habitacion] [varchar](50) NOT NULL,
	[dieta] [varchar](50) NULL,
	[observacion] [varchar](50) NULL,
	[estado] [varchar](50) NULL,
	[idpedido] [int] NOT NULL,
 CONSTRAINT [PK_pedidoNutricion] PRIMARY KEY CLUSTERED 
(
	[idpedidoindividual] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[pedidoNutricionComida](
	[idpedidoindividual] [int] NOT NULL,
	[idplatillo] [int] NULL,
	[idguarnicion] [int] NULL,
	[idbebida] [int] NULL
)
GO

CREATE TABLE [dbo].[tipoLimpieza](
	[idtipo] [int] IDENTITY(1,1) NOT NULL,
	[tipo] [varchar](150) NOT NULL,
	[descripcion] [varchar](250) NULL,
	[unidad] [varchar](20) NOT NULL,
	[idcategoria] [int] NOT NULL,
	[limite] [decimal](10,4) NOT NULL,
 CONSTRAINT [PK_tipoLimpieza] PRIMARY KEY CLUSTERED 
(
	[idtipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[tipoLimpiezaEliminado](
	[ideliminado] [int] IDENTITY(1,1) NOT NULL,
	[idtipo] [int] NOT NULL,
 CONSTRAINT [PK_tipoLimpiezaEliminado] PRIMARY KEY CLUSTERED 
(
	[ideliminado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[almacenTipoLimpieza](
	[idalmacen] [int] IDENTITY(1,1) NOT NULL,
	[cantidadreal] [decimal](12, 4) NOT NULL,
	[precio] [decimal](12, 4) NOT NULL,
	[idtipo] [int] NOT NULL,
	[fecha] [datetime] NOT NULL,
	[transaccion] [varchar](20) NOT NULL,
 CONSTRAINT [PK_almacenTipoLimpieza] PRIMARY KEY CLUSTERED 
(
	[idalmacen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[cantidadTipoLimpieza](
	[idcantidad] [int] IDENTITY(1,1) NOT NULL,
	[cantidad] [decimal](10, 4) NOT NULL,
	[idtipo] [int] NOT NULL,
 CONSTRAINT [PK_cantidadTipoLimpieza] PRIMARY KEY CLUSTERED 
(
	[idcantidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[mensajesPedidoInsumo](
	[idmensaje] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetime] NOT NULL,
	[mensaje] [varchar](500) NOT NULL,
	[idpedidoindividual] [int] NOT NULL,
 CONSTRAINT [PK_mensajesPedidoInsumo] PRIMARY KEY CLUSTERED 
(
	[idmensaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[mensajesPedidoSuministro](
	[idmensaje] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetime] NOT NULL,
	[mensaje] [varchar](500) NOT NULL,
	[idpedidoindividual] [int] NOT NULL,
 CONSTRAINT [PK_mensajesPedidoSuministro] PRIMARY KEY CLUSTERED 
(
	[idmensaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[pedidosEliminados](
	[ideliminado] [int] IDENTITY(1,1) NOT NULL,
	[idpedido] [int] NOT NULL,
 CONSTRAINT [PK_pedidosEliminados] PRIMARY KEY CLUSTERED 
(
	[ideliminado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[pedidos](
	[idpedido] [int] NOT NULL,
	[fecha] [datetime] NOT NULL,
	[campus] [varchar](50) NOT NULL,
	[precio] [decimal](12,4) NULL,
	[estado] [varchar](30) NOT NULL,
	[idproveedor] [int] NOT NULL,
	[idusuario] [int] NOT NULL,
 CONSTRAINT [PK_pedidos] PRIMARY KEY CLUSTERED 
(
	[idpedido] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[pedidoInsumo](
	[idpedidoindividual] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetime] NOT NULL,
	[idinsumo] [int] NOT NULL,
	[cantidad] [int] NOT NULL,
	[preciounitario] [decimal] (10,4) NULL,
	[preciototal][decimal](12,4) NULL,
	[idpedido] [int] NOT NULL,
 CONSTRAINT [PK_pedidoInsumo] PRIMARY KEY CLUSTERED 
(
	[idpedidoindividual] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[pedidoSuministro](
	[idpedidoindividual] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetime] NOT NULL,
	[idsuministro] [int] NOT NULL,
	[cantidad] [int] NOT NULL,
	[preciounitario] [decimal] (10,4) NULL,
	[preciototal][decimal](12,4) NULL,
	[idpedido] [int] NOT NULL,
 CONSTRAINT [PK_pedidoSuministro] PRIMARY KEY CLUSTERED 
(
	[idpedidoindividual] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[almacenLimpieza](
	[idalmacen] [int] IDENTITY(1,1) NOT NULL,
	[cantidadreal] [decimal](12, 4) NOT NULL,
	[precio] [decimal](12, 4) NOT NULL,
	[idcategoria] [int] NOT NULL,
	[fecha] [datetime] NOT NULL,
	[transaccion] [varchar](20) NOT NULL,
 CONSTRAINT [PK_almacenLimpieza] PRIMARY KEY CLUSTERED 
(
	[idalmacen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[almacenGastosFijos](
	[idalmacen] [int] IDENTITY(1,1) NOT NULL,
	[precio] [decimal](10, 4) NOT NULL,
	[idgasto] [int] NOT NULL,
	[fecha] [datetime] NOT NULL,
	[transaccion] [varchar](20) NOT NULL,
 CONSTRAINT [PK_almacenGastosFijos] PRIMARY KEY CLUSTERED 
(
	[idalmacen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[categoriasLimpieza](
	[idcategoria] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](150) NOT NULL,
	[descripcion] [varchar](250) NULL,
	[unidad] [varchar](20) NOT NULL,
	[limite] [decimal](10, 4) NOT NULL,
 CONSTRAINT [PK_categoriasLimpieza] PRIMARY KEY CLUSTERED 
(
	[idcategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[categoriasLimpiezaEliminadas](
	[ideliminado] [int] IDENTITY(1,1) NOT NULL,
	[idcategoria] [int] NOT NULL,
 CONSTRAINT [PK_categoriasLimpiezaEliminadas] PRIMARY KEY CLUSTERED 
(
	[ideliminado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[gastosFijos](
	[idgasto] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](150) NOT NULL,
	[descripcion] [varchar](250) NULL,
 CONSTRAINT [PK_gastosFijos] PRIMARY KEY CLUSTERED 
(
	[idgasto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[gastosFijosEliminados](
	[ideliminado] [int] IDENTITY(1,1) NOT NULL,
	[idgasto] [int] NOT NULL,
 CONSTRAINT [PK_gastosFijosEliminados] PRIMARY KEY CLUSTERED 
(
	[ideliminado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[suministrosLimpieza](
	[idsuministro] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](150) NOT NULL,
	[descripcion] [varchar](250) NULL,
	[imagen] [varchar](max) NULL,
	[idproveedor] [int] NOT NULL,
	[idcategoria] [int] NOT NULL,
	[idcantidad] [int] NOT NULL,
 CONSTRAINT [PK_suministrosLimpieza] PRIMARY KEY CLUSTERED 
(
	[idsuministro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[suministrosLimpiezaEliminados](
	[ideliminado] [int] IDENTITY(1,1) NOT NULL,
	[idsuministro] [int] NOT NULL,
 CONSTRAINT [PK_suministrosLimpiezaEliminados] PRIMARY KEY CLUSTERED 
(
	[ideliminado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO