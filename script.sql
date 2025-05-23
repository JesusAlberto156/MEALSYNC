USE [master]
GO
/****** Object:  Database [ComandaMedicaTepic]    Script Date: 22/05/2025 04:16:18 p. m. ******/
CREATE DATABASE [ComandaMedicaTepic]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'comandasCMPDHTepic', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\comandasCMPDHTepic.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'comandasCMPDHTepic_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\comandasCMPDHTepic_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ComandaMedicaTepic] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ComandaMedicaTepic].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ComandaMedicaTepic] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET ARITHABORT OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ComandaMedicaTepic] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ComandaMedicaTepic] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ComandaMedicaTepic] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ComandaMedicaTepic] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ComandaMedicaTepic] SET  MULTI_USER 
GO
ALTER DATABASE [ComandaMedicaTepic] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ComandaMedicaTepic] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ComandaMedicaTepic] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ComandaMedicaTepic] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ComandaMedicaTepic] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ComandaMedicaTepic] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'ComandaMedicaTepic', N'ON'
GO
ALTER DATABASE [ComandaMedicaTepic] SET QUERY_STORE = OFF
GO
USE [ComandaMedicaTepic]
GO
/****** Object:  Table [dbo].[almacen]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[almacen](
	[idalmacen] [int] IDENTITY(1,1) NOT NULL,
	[cantidad] [varchar](150) NULL,
	[observacion] [varchar](250) NULL,
	[idprecio] [int] NOT NULL,
 CONSTRAINT [PK_almacen] PRIMARY KEY CLUSTERED 
(
	[idalmacen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[almacenPlatillo]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[almacenPlatillo](
	[idalmacen] [int] NOT NULL,
	[idplatillo] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bebida]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bebida](
	[idbebida] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NULL,
	[idmenu] [int] NULL,
 CONSTRAINT [PK_idbebida] PRIMARY KEY CLUSTERED 
(
	[idbebida] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comandas]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comandas](
	[idcomanda] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [date] NOT NULL,
	[hora] [time](7) NOT NULL,
	[cirugia] [varchar](90) NOT NULL,
	[dispositivo] [char](20) NULL,
	[idmedico] [int] NOT NULL,
	[idusuario] [int] NOT NULL,
 CONSTRAINT [PK__comandas__62DF6CBE1EB922AC] PRIMARY KEY CLUSTERED 
(
	[idcomanda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estatus]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estatus](
	[idestatus] [int] IDENTITY(1,1) NOT NULL,
	[habilitado] [bit] NULL,
	[activo] [bit] NULL,
	[idusuario] [int] NOT NULL,
 CONSTRAINT [PK_estatus] PRIMARY KEY CLUSTERED 
(
	[idestatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[guarnicion]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[guarnicion](
	[idguarnicion] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NULL,
	[idmenu] [int] NULL,
 CONSTRAINT [PK_idguarnicion] PRIMARY KEY CLUSTERED 
(
	[idguarnicion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[insumos]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[insumos](
	[idinsumo] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](150) NULL,
	[descripcion] [varchar](250) NULL,
	[imagen] [varchar](max) NULL,
	[idproveedor] [int] NOT NULL,
	[idtipo] [int] NOT NULL,
 CONSTRAINT [PK_insumos] PRIMARY KEY CLUSTERED 
(
	[idinsumo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[medicos]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[medicos](
	[idmedico] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](150) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idmedico] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[medida]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[medida](
	[idmedida] [int] IDENTITY(1,1) NOT NULL,
	[medida] [varchar](20) NULL,
	[unidad] [varchar](20) NULL,
	[cantidad] [decimal](10, 4) NULL,
 CONSTRAINT [PK_medida] PRIMARY KEY CLUSTERED 
(
	[idmedida] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[menu]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[menu](
	[idmenu] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NULL,
 CONSTRAINT [PK_idmenu] PRIMARY KEY CLUSTERED 
(
	[idmenu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[observacionesProveedor]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[observacionesProveedor](
	[idobservacion] [int] IDENTITY(1,1) NOT NULL,
	[observacion] [varchar](250) NULL,
	[calificacion] [int] NULL,
	[fecha] [datetime] NULL,
	[idproveedor] [int] NOT NULL,
 CONSTRAINT [PK_observacionesProveedor] PRIMARY KEY CLUSTERED 
(
	[idobservacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ordenes]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ordenes](
	[idorden] [int] IDENTITY(1,1) NOT NULL,
	[platillo] [varchar](100) NULL,
	[bebida] [varchar](100) NULL,
	[guarnicion] [varchar](100) NULL,
	[comentarios] [varchar](100) NULL,
	[idcomanda] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idorden] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[permisos]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[permisos](
	[idpermiso] [int] IDENTITY(1,1) NOT NULL,
	[administrador] [bit] NULL,
	[chef] [bit] NULL,
	[almacenista] [bit] NULL,
	[cocinero] [bit] NULL,
	[nutriologo] [bit] NULL,
	[medico] [bit] NULL,
	[superadministrador] [bit] NULL,
	[idusuario] [int] NULL,
 CONSTRAINT [PK_permisos] PRIMARY KEY CLUSTERED 
(
	[idpermiso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[platillo]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[platillo](
	[idplatillo] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NULL,
	[idmenu] [int] NULL,
 CONSTRAINT [PK_idplatillo] PRIMARY KEY CLUSTERED 
(
	[idplatillo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[precioInsumo]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[precioInsumo](
	[idprecio] [int] IDENTITY(1,1) NOT NULL,
	[precio] [int] NULL,
	[fecha] [datetime] NULL,
	[idinsumo] [int] NOT NULL,
	[idusuario] [int] NOT NULL,
	[estado] [varchar](20) NULL,
 CONSTRAINT [PK_precioInsumo] PRIMARY KEY CLUSTERED 
(
	[idprecio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[proveedores]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[proveedores](
	[idproveedor] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](150) NULL,
	[rfc] [varchar](30) NULL,
	[domicilio] [varchar](150) NULL,
	[telefono] [varchar](20) NULL,
	[correo] [varchar](150) NULL,
 CONSTRAINT [PK_proveedores] PRIMARY KEY CLUSTERED 
(
	[idproveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipoInsumo]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipoInsumo](
	[idtipo] [int] IDENTITY(1,1) NOT NULL,
	[tipo] [varchar](150) NULL,
	[descripcion] [varchar](250) NULL,
	[idmedida] [int] NOT NULL,
 CONSTRAINT [PK_tipoInsumo] PRIMARY KEY CLUSTERED 
(
	[idtipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipoUsuario]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipoUsuario](
	[idtipo] [int] IDENTITY(1,1) NOT NULL,
	[tipo] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idtipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 22/05/2025 04:16:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[idusuario] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](150) NOT NULL,
	[nombrecorto] [varchar](50) NOT NULL,
	[usuario] [varchar](25) NOT NULL,
	[contrasena] [varchar](15) NOT NULL,
	[idtipo] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[idusuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[almacen]  WITH CHECK ADD  CONSTRAINT [FK_almacen_precioInsumo] FOREIGN KEY([idprecio])
REFERENCES [dbo].[precioInsumo] ([idprecio])
GO
ALTER TABLE [dbo].[almacen] CHECK CONSTRAINT [FK_almacen_precioInsumo]
GO
ALTER TABLE [dbo].[almacenPlatillo]  WITH CHECK ADD  CONSTRAINT [FK_almacenPlatillo_almacen] FOREIGN KEY([idalmacen])
REFERENCES [dbo].[almacen] ([idalmacen])
GO
ALTER TABLE [dbo].[almacenPlatillo] CHECK CONSTRAINT [FK_almacenPlatillo_almacen]
GO
ALTER TABLE [dbo].[almacenPlatillo]  WITH CHECK ADD  CONSTRAINT [FK_almacenPlatillo_platillo] FOREIGN KEY([idplatillo])
REFERENCES [dbo].[platillo] ([idplatillo])
GO
ALTER TABLE [dbo].[almacenPlatillo] CHECK CONSTRAINT [FK_almacenPlatillo_platillo]
GO
ALTER TABLE [dbo].[bebida]  WITH CHECK ADD  CONSTRAINT [FK_bebida_menu] FOREIGN KEY([idmenu])
REFERENCES [dbo].[menu] ([idmenu])
GO
ALTER TABLE [dbo].[bebida] CHECK CONSTRAINT [FK_bebida_menu]
GO
ALTER TABLE [dbo].[comandas]  WITH CHECK ADD  CONSTRAINT [FK__comandas__idmedi__690797E6] FOREIGN KEY([idmedico])
REFERENCES [dbo].[medicos] ([idmedico])
GO
ALTER TABLE [dbo].[comandas] CHECK CONSTRAINT [FK__comandas__idmedi__690797E6]
GO
ALTER TABLE [dbo].[comandas]  WITH CHECK ADD  CONSTRAINT [FK__comandas__idusua__69FBBC1F] FOREIGN KEY([idusuario])
REFERENCES [dbo].[usuarios] ([idusuario])
GO
ALTER TABLE [dbo].[comandas] CHECK CONSTRAINT [FK__comandas__idusua__69FBBC1F]
GO
ALTER TABLE [dbo].[estatus]  WITH CHECK ADD  CONSTRAINT [FK_estatus_usuarios] FOREIGN KEY([idusuario])
REFERENCES [dbo].[usuarios] ([idusuario])
GO
ALTER TABLE [dbo].[estatus] CHECK CONSTRAINT [FK_estatus_usuarios]
GO
ALTER TABLE [dbo].[guarnicion]  WITH CHECK ADD  CONSTRAINT [FK_guarnicion_menu] FOREIGN KEY([idmenu])
REFERENCES [dbo].[menu] ([idmenu])
GO
ALTER TABLE [dbo].[guarnicion] CHECK CONSTRAINT [FK_guarnicion_menu]
GO
ALTER TABLE [dbo].[insumos]  WITH CHECK ADD  CONSTRAINT [FK_insumos_proveedores] FOREIGN KEY([idproveedor])
REFERENCES [dbo].[proveedores] ([idproveedor])
GO
ALTER TABLE [dbo].[insumos] CHECK CONSTRAINT [FK_insumos_proveedores]
GO
ALTER TABLE [dbo].[insumos]  WITH CHECK ADD  CONSTRAINT [FK_insumos_tipoInsumo] FOREIGN KEY([idtipo])
REFERENCES [dbo].[tipoInsumo] ([idtipo])
GO
ALTER TABLE [dbo].[insumos] CHECK CONSTRAINT [FK_insumos_tipoInsumo]
GO
ALTER TABLE [dbo].[observacionesProveedor]  WITH CHECK ADD  CONSTRAINT [FK_observacionesProveedor_proveedores] FOREIGN KEY([idproveedor])
REFERENCES [dbo].[proveedores] ([idproveedor])
GO
ALTER TABLE [dbo].[observacionesProveedor] CHECK CONSTRAINT [FK_observacionesProveedor_proveedores]
GO
ALTER TABLE [dbo].[ordenes]  WITH CHECK ADD  CONSTRAINT [FK__ordenes__idcoman__6CD828CA] FOREIGN KEY([idcomanda])
REFERENCES [dbo].[comandas] ([idcomanda])
GO
ALTER TABLE [dbo].[ordenes] CHECK CONSTRAINT [FK__ordenes__idcoman__6CD828CA]
GO
ALTER TABLE [dbo].[permisos]  WITH CHECK ADD  CONSTRAINT [FK_permisos_usuarios] FOREIGN KEY([idusuario])
REFERENCES [dbo].[usuarios] ([idusuario])
GO
ALTER TABLE [dbo].[permisos] CHECK CONSTRAINT [FK_permisos_usuarios]
GO
ALTER TABLE [dbo].[platillo]  WITH CHECK ADD  CONSTRAINT [FK_platillo_menu] FOREIGN KEY([idmenu])
REFERENCES [dbo].[menu] ([idmenu])
GO
ALTER TABLE [dbo].[platillo] CHECK CONSTRAINT [FK_platillo_menu]
GO
ALTER TABLE [dbo].[precioInsumo]  WITH CHECK ADD  CONSTRAINT [FK_precioInsumo_insumos] FOREIGN KEY([idinsumo])
REFERENCES [dbo].[insumos] ([idinsumo])
GO
ALTER TABLE [dbo].[precioInsumo] CHECK CONSTRAINT [FK_precioInsumo_insumos]
GO
ALTER TABLE [dbo].[precioInsumo]  WITH CHECK ADD  CONSTRAINT [FK_precioInsumo_usuarios] FOREIGN KEY([idusuario])
REFERENCES [dbo].[usuarios] ([idusuario])
GO
ALTER TABLE [dbo].[precioInsumo] CHECK CONSTRAINT [FK_precioInsumo_usuarios]
GO
ALTER TABLE [dbo].[tipoInsumo]  WITH CHECK ADD  CONSTRAINT [FK_tipoInsumo_medida] FOREIGN KEY([idmedida])
REFERENCES [dbo].[medida] ([idmedida])
GO
ALTER TABLE [dbo].[tipoInsumo] CHECK CONSTRAINT [FK_tipoInsumo_medida]
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD FOREIGN KEY([idtipo])
REFERENCES [dbo].[tipoUsuario] ([idtipo])
GO
USE [master]
GO
ALTER DATABASE [ComandaMedicaTepic] SET  READ_WRITE 
GO
