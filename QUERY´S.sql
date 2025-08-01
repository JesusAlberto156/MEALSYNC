USE ComandaMedicaTepic

ALTER TABLE almacenLimpieza
ADD CONSTRAINT DF_almacenLimpieza_Fecha DEFAULT GETDATE() FOR fecha;
ALTER TABLE almacenGastosFijos
ADD CONSTRAINT DF_almacenGastosFijos_Fecha DEFAULT GETDATE() FOR fecha;

CREATE TABLE [dbo].[almacenLimpieza](
	[idalmacen] [int] NOT NULL,
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
	[idalmacen] [int] NOT NULL,
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
	[idcantidad] [int] NOT NULL,
	[cantidad] [decimal](10, 4) NOT NULL,
	[idcategoria] [int] NOT NULL,
 CONSTRAINT [PK_cantidadCategoriasLimpieza] PRIMARY KEY CLUSTERED 
(
	[idcantidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
CREATE TABLE [dbo].[categoriasLimpieza](
	[idcategoria] [int] NOT NULL,
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
	[idelminado] [int] NOT NULL,
	[idcategoria] [int] NOT NULL,
 CONSTRAINT [PK_categoriasLimpiezaEliminadas] PRIMARY KEY CLUSTERED 
(
	[idelminado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
CREATE TABLE [dbo].[gastosFijos](
	[idgasto] [int] NOT NULL,
	[nombre] [varchar](150) NOT NULL,
	[descripcion] [varchar](250) NULL,
 CONSTRAINT [PK_gastosFijos] PRIMARY KEY CLUSTERED 
(
	[idgasto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
CREATE TABLE [dbo].[gastosFijosEliminados](
	[ideliminado] [int] NOT NULL,
	[idgasto] [int] NOT NULL,
 CONSTRAINT [PK_gastosFijosEliminados] PRIMARY KEY CLUSTERED 
(
	[ideliminado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[guarnicion]    Script Date: 01/08/2025 09:02:17 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[suministrosLimpieza](
	[idsuministro] [int] NOT NULL,
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
	[ideliminado] [int] NOT NULL,
	[idsuministro] [int] NOT NULL,
 CONSTRAINT [PK_suministrosLimpiezaEliminados] PRIMARY KEY CLUSTERED 
(
	[ideliminado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
