USE ComandaMedicaTepic

ALTER TABLE insumos
ADD codigo VARCHAR(20); 
ALTER TABLE suministrosLimpieza
ADD codigo VARCHAR(20); 

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

CREATE TABLE [dbo].[cantidadCategoriasLimpieza](
	[idcantidad] [int] IDENTITY(1,1) NOT NULL,
	[cantidad] [decimal](10, 4) NOT NULL,
	[idcategoria] [int] NOT NULL,
 CONSTRAINT [PK_cantidadCategoriasLimpieza] PRIMARY KEY CLUSTERED 
(
	[idcantidad] ASC
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