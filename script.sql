USE [master]
GO
/****** Object:  Database [INFRAMED]    Script Date: 29/07/2025 01:00:07 p. m. ******/
CREATE DATABASE [INFRAMED]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'INFRAMED', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\INFRAMED.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'INFRAMED_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\INFRAMED_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [INFRAMED] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [INFRAMED].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [INFRAMED] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [INFRAMED] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [INFRAMED] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [INFRAMED] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [INFRAMED] SET ARITHABORT OFF 
GO
ALTER DATABASE [INFRAMED] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [INFRAMED] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [INFRAMED] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [INFRAMED] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [INFRAMED] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [INFRAMED] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [INFRAMED] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [INFRAMED] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [INFRAMED] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [INFRAMED] SET  ENABLE_BROKER 
GO
ALTER DATABASE [INFRAMED] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [INFRAMED] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [INFRAMED] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [INFRAMED] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [INFRAMED] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [INFRAMED] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [INFRAMED] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [INFRAMED] SET RECOVERY FULL 
GO
ALTER DATABASE [INFRAMED] SET  MULTI_USER 
GO
ALTER DATABASE [INFRAMED] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [INFRAMED] SET DB_CHAINING OFF 
GO
ALTER DATABASE [INFRAMED] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [INFRAMED] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [INFRAMED] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [INFRAMED] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'INFRAMED', N'ON'
GO
ALTER DATABASE [INFRAMED] SET QUERY_STORE = ON
GO
ALTER DATABASE [INFRAMED] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [INFRAMED]
GO
/****** Object:  Table [dbo].[Areas]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Areas](
	[IdArea] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdArea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Biomedica]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Biomedica](
	[IDE] [varchar](50) NOT NULL,
	[Estado] [varchar](20) NOT NULL,
	[Funcionalidad] [varchar](20) NOT NULL,
	[Propiedad] [varchar](50) NOT NULL,
	[ResponsableMantenimiento] [varchar](50) NOT NULL,
	[DuenoEquipo] [varchar](50) NULL,
	[ActivoFijo] [varchar](50) NULL,
	[IdGrupo] [varchar](50) NOT NULL,
	[Equipo] [varchar](100) NULL,
	[Modelo] [varchar](100) NULL,
	[Marca] [varchar](100) NULL,
	[Serie] [varchar](100) NULL,
	[Accesorios] [text] NULL,
	[Manual] [varchar](500) NULL,
	[SubEquipo] [varchar](100) NULL,
	[NivelRiesgo] [varchar](20) NULL,
	[PeriodoMantenimiento] [varchar](10) NULL,
	[UltimoMant] [datetime] NULL,
	[Area] [int] NULL,
	[SubArea] [int] NULL,
	[FichaTecnica] [bit] NULL,
	[HojaResguardo] [bit] NULL,
	[EntradaEquipo] [bit] NULL,
	[FacturaCompra] [bit] NULL,
	[Mantenimientos] [bit] NULL,
	[Imagen] [bit] NULL,
	[TarjetaExpediente] [bit] NULL,
	[Observaciones] [varchar](1000) NULL,
	[IdGrupoCEYE] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[IDE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CEYE]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CEYE](
	[IDE] [int] IDENTITY(1,1) NOT NULL,
	[Sala] [varchar](10) NULL,
	[Fecha] [date] NULL,
	[HoraInicio] [varchar](10) NULL,
	[Cirujano] [varchar](150) NULL,
	[Anestesiologo] [varchar](150) NULL,
	[Paciente] [varchar](150) NULL,
	[AH] [varchar](10) NULL,
	[Edad] [varchar](10) NULL,
	[Folio] [varchar](20) NULL,
	[Procedencia] [varchar](100) NULL,
	[RequerimientosInstrumentales] [varchar](max) NULL,
	[Duracion] [varchar](10) NULL,
	[ID_Cirugia] [int] NULL,
	[Area] [varchar](50) NULL,
	[Estado] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[IDE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cirugias]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cirugias](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NombreCirugia] [varchar](100) NOT NULL,
	[DuracionEstandar] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GrupoCEYEProgramacion]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GrupoCEYEProgramacion](
	[IdGrupoCEYE] [int] IDENTITY(1,1) NOT NULL,
	[NombreConjunto] [varchar](200) NULL,
	[Descripcion] [varchar](250) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdGrupoCEYE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GrupoEquipos]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GrupoEquipos](
	[IdGrupo] [varchar](50) NOT NULL,
	[Descripcion] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdGrupo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistorialAccesosUsuarios]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialAccesosUsuarios](
	[Id_H_A_Usuarios] [int] IDENTITY(1,1) NOT NULL,
	[ID] [int] NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellidos] [varchar](150) NOT NULL,
	[Email] [varchar](255) NULL,
	[Usuario] [varchar](50) NOT NULL,
	[Contrasena] [varchar](255) NOT NULL,
	[No_Celular] [varchar](20) NULL,
	[FechaCreacion] [datetime] NULL,
	[ImgPerfil] [varchar](255) NULL,
	[Area] [varchar](100) NULL,
	[RolID] [int] NOT NULL,
	[Accion] [varchar](50) NOT NULL,
	[FechaMovimiento] [datetime] NULL,
	[EstatusAcceso] [varchar](30) NULL,
	[EstatusSesion] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id_H_A_Usuarios] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistorialAreas]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialAreas](
	[IdHistorial] [int] IDENTITY(1,1) NOT NULL,
	[IdArea] [int] NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Accion] [varchar](50) NULL,
	[IdUsuario] [varchar](50) NULL,
	[NombreUsuario] [varchar](100) NULL,
	[ApellidoUsuario] [varchar](100) NULL,
	[AreaUsuario] [varchar](100) NULL,
	[FechaMovimiento] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdHistorial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistorialBiomedica]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialBiomedica](
	[IdHistorialEquipoBiomedica] [int] IDENTITY(1,1) NOT NULL,
	[IDE] [varchar](50) NOT NULL,
	[Estado] [varchar](20) NOT NULL,
	[Funcionalidad] [varchar](20) NOT NULL,
	[Propiedad] [varchar](50) NOT NULL,
	[ResponsableMantenimiento] [varchar](50) NOT NULL,
	[DuenoEquipo] [varchar](50) NULL,
	[ActivoFijo] [varchar](50) NULL,
	[IdGrupo] [varchar](50) NOT NULL,
	[Equipo] [varchar](100) NULL,
	[Modelo] [varchar](100) NULL,
	[Marca] [varchar](100) NULL,
	[Serie] [varchar](100) NULL,
	[Accesorios] [text] NULL,
	[Manual] [varchar](500) NULL,
	[SubEquipo] [varchar](100) NULL,
	[NivelRiesgo] [varchar](20) NULL,
	[PeriodoMantenimiento] [varchar](10) NULL,
	[UltimoMant] [datetime] NULL,
	[Area] [varchar](100) NULL,
	[SubArea] [varchar](100) NULL,
	[FichaTecnica] [bit] NULL,
	[HojaResguardo] [bit] NULL,
	[EntradaEquipo] [bit] NULL,
	[FacturaCompra] [bit] NULL,
	[Mantenimientos] [bit] NULL,
	[Imagen] [bit] NULL,
	[TarjetaExpediente] [bit] NULL,
	[Accion] [varchar](20) NOT NULL,
	[FechaMovimiento] [datetime] NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[NombreUsuario] [varchar](100) NOT NULL,
	[ApellidoUsuario] [varchar](100) NOT NULL,
	[AreaUsuario] [varchar](100) NOT NULL,
	[Observaciones] [varchar](1000) NULL,
 CONSTRAINT [PK_HistorialBiomedica] PRIMARY KEY CLUSTERED 
(
	[IdHistorialEquipoBiomedica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistorialEquipoSistemas]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialEquipoSistemas](
	[IdHistorialEquipoSistemas] [int] IDENTITY(1,1) NOT NULL,
	[ID] [varchar](50) NOT NULL,
	[Estatus] [varchar](50) NOT NULL,
	[Piso] [varchar](50) NULL,
	[Tipo] [varchar](50) NULL,
	[Marca] [varchar](50) NULL,
	[Modelo] [varchar](100) NULL,
	[Serie] [varchar](50) NULL,
	[Contraloria] [varchar](50) NULL,
	[SO] [varchar](50) NULL,
	[Procesador] [varchar](100) NULL,
	[RAM] [varchar](50) NULL,
	[TipoAlm] [varchar](50) NULL,
	[Capacidad] [varchar](50) NULL,
	[ResponsableMTO] [varchar](100) NULL,
	[Observaciones] [text] NULL,
	[Responsiva] [bit] NOT NULL,
	[Credenciales] [varchar](50) NULL,
	[Departamento] [varchar](100) NULL,
	[Asignacion] [varchar](100) NULL,
	[FechaMovimiento] [datetime] NOT NULL,
	[Accion] [varchar](20) NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[NombreUsuario] [varchar](100) NOT NULL,
	[ApellidoUsuario] [varchar](100) NOT NULL,
	[AreaUsuario] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdHistorialEquipoSistemas] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistorialGrupoEquipos]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialGrupoEquipos](
	[IdHistorialGrupos] [int] IDENTITY(1,1) NOT NULL,
	[IdGrupo] [varchar](50) NOT NULL,
	[Descripcion] [varchar](200) NULL,
	[Accion] [varchar](50) NULL,
	[IdUsuario] [varchar](50) NULL,
	[NombreUsuario] [varchar](100) NULL,
	[ApellidoUsuario] [varchar](100) NULL,
	[AreaUsuario] [varchar](100) NULL,
	[FechaMovimiento] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdHistorialGrupos] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistorialInsumosTaller]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialInsumosTaller](
	[IDHistorial] [int] IDENTITY(1,1) NOT NULL,
	[IDE] [int] NOT NULL,
	[IDEcompra] [varchar](50) NULL,
	[Nombre] [varchar](255) NOT NULL,
	[Estado] [varchar](20) NULL,
	[Referencia] [varchar](100) NULL,
	[Marca] [varchar](100) NULL,
	[Insumo] [varchar](50) NULL,
	[CodificacionCompra] [varchar](100) NULL,
	[Stock] [varchar](50) NULL,
	[Accion] [varchar](50) NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[NombreUsuario] [varchar](100) NOT NULL,
	[ApellidoUsuario] [varchar](100) NOT NULL,
	[AreaUsuario] [varchar](100) NOT NULL,
	[FechaMovimiento] [datetime] NULL,
	[GruposCompatibles] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[IDHistorial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistorialSubAreas]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialSubAreas](
	[IdHistorialSubAreas] [int] IDENTITY(1,1) NOT NULL,
	[IdSubArea] [int] NOT NULL,
	[Nombre] [varchar](255) NOT NULL,
	[IdArea] [int] NOT NULL,
	[NombreArea] [varchar](255) NOT NULL,
	[Accion] [varchar](50) NOT NULL,
	[Fecha] [datetime] NULL,
	[IdUsuario] [int] NOT NULL,
	[NombreUsuario] [varchar](100) NOT NULL,
	[ApellidoUsuario] [varchar](100) NOT NULL,
	[AreaUsuario] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdHistorialSubAreas] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistorialUsuarios]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialUsuarios](
	[IdHistorialUsuarios] [int] IDENTITY(1,1) NOT NULL,
	[ID] [int] NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellidos] [varchar](150) NOT NULL,
	[Email] [varchar](255) NULL,
	[Usuario] [varchar](50) NOT NULL,
	[Contrasena] [varchar](255) NOT NULL,
	[No_Celular] [varchar](20) NULL,
	[FechaCreacion] [datetime] NULL,
	[ImgPerfil] [varchar](255) NULL,
	[Area] [varchar](100) NULL,
	[Accion] [varchar](50) NOT NULL,
	[FechaMovimiento] [datetime] NULL,
	[IdUsuario] [int] NOT NULL,
	[NombreUsuario] [varchar](100) NOT NULL,
	[ApellidoUsuario] [varchar](100) NOT NULL,
	[AreaUsuario] [varchar](100) NOT NULL,
	[EstatusAcceso] [varchar](30) NULL,
	[EstatusSesion] [varchar](30) NULL,
	[RolID] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdHistorialUsuarios] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InsumoGrupoCompatibilidad]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InsumoGrupoCompatibilidad](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IDE] [int] NOT NULL,
	[IdGrupo] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InsumosRefacciones]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InsumosRefacciones](
	[IDE] [int] IDENTITY(1,1) NOT NULL,
	[IDEcompra] [varchar](50) NULL,
	[Nombre] [varchar](255) NOT NULL,
	[Estado] [varchar](20) NULL,
	[Referencia] [varchar](100) NULL,
	[Marca] [varchar](100) NULL,
	[Insumo] [varchar](50) NULL,
	[CodificacionCompra] [varchar](100) NULL,
	[Stock] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[IDE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permisos]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permisos](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[RolID] [int] NOT NULL,
	[Tabla] [varchar](50) NOT NULL,
	[Columna] [varchar](50) NOT NULL,
	[Permiso] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReservaEquiposBiomedicos]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReservaEquiposBiomedicos](
	[IdReserva] [int] IDENTITY(1,1) NOT NULL,
	[IDE_Equipo] [varchar](50) NOT NULL,
	[IDE_CEYE] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdReserva] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReservaGruposCEYE]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReservaGruposCEYE](
	[IdReservaGrupoCEYE] [int] IDENTITY(1,1) NOT NULL,
	[IDE] [int] NOT NULL,
	[IdGrupoCEYE] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdReservaGrupoCEYE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NombreRol] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[NombreRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sistemas]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sistemas](
	[ID] [varchar](50) NOT NULL,
	[Estatus] [varchar](50) NOT NULL,
	[Piso] [varchar](50) NULL,
	[Tipo] [varchar](50) NULL,
	[Marca] [varchar](50) NULL,
	[Modelo] [varchar](100) NULL,
	[Serie] [varchar](50) NULL,
	[Contraloria] [varchar](50) NULL,
	[SO] [varchar](50) NULL,
	[Procesador] [varchar](100) NULL,
	[RAM] [varchar](50) NULL,
	[TipoAlm] [varchar](50) NULL,
	[Capacidad] [varchar](50) NULL,
	[ResponsableMTO] [varchar](100) NULL,
	[Observaciones] [text] NULL,
	[Responsiva] [bit] NOT NULL,
	[Credenciales] [varchar](50) NULL,
	[Departamento] [int] NULL,
	[Asignacion] [int] NULL,
	[QrCode] [varbinary](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubAreas]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubAreas](
	[IdSubArea] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[IdArea] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdSubArea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TiposCirugias]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TiposCirugias](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NombreCirugia] [varchar](100) NOT NULL,
	[DuracionEstandar] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 29/07/2025 01:00:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellidos] [varchar](150) NOT NULL,
	[Email] [varchar](255) NULL,
	[Usuario] [varchar](50) NOT NULL,
	[Contrasena] [varchar](255) NOT NULL,
	[No_Celular] [varchar](20) NULL,
	[FechaCreacion] [datetime] NULL,
	[ImgPerfil] [varchar](255) NULL,
	[Area] [varchar](100) NULL,
	[EstatusAcceso] [bit] NULL,
	[EstatusSesion] [bit] NULL,
	[RolID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[HistorialAccesosUsuarios] ADD  DEFAULT (getdate()) FOR [FechaMovimiento]
GO
ALTER TABLE [dbo].[HistorialAreas] ADD  DEFAULT (getdate()) FOR [FechaMovimiento]
GO
ALTER TABLE [dbo].[HistorialBiomedica] ADD  DEFAULT (getdate()) FOR [FechaMovimiento]
GO
ALTER TABLE [dbo].[HistorialEquipoSistemas] ADD  DEFAULT (getdate()) FOR [FechaMovimiento]
GO
ALTER TABLE [dbo].[HistorialGrupoEquipos] ADD  DEFAULT (getdate()) FOR [FechaMovimiento]
GO
ALTER TABLE [dbo].[HistorialInsumosTaller] ADD  DEFAULT (getdate()) FOR [Fecha]
GO
ALTER TABLE [dbo].[HistorialInsumosTaller] ADD  DEFAULT (getdate()) FOR [FechaMovimiento]
GO
ALTER TABLE [dbo].[HistorialSubAreas] ADD  DEFAULT (getdate()) FOR [Fecha]
GO
ALTER TABLE [dbo].[HistorialUsuarios] ADD  DEFAULT (getdate()) FOR [FechaMovimiento]
GO
ALTER TABLE [dbo].[Sistemas] ADD  DEFAULT ((0)) FOR [Responsiva]
GO
ALTER TABLE [dbo].[Usuarios] ADD  DEFAULT (getdate()) FOR [FechaCreacion]
GO
ALTER TABLE [dbo].[Usuarios] ADD  DEFAULT ((1)) FOR [EstatusAcceso]
GO
ALTER TABLE [dbo].[Usuarios] ADD  DEFAULT ((0)) FOR [EstatusSesion]
GO
ALTER TABLE [dbo].[Biomedica]  WITH CHECK ADD FOREIGN KEY([IdGrupo])
REFERENCES [dbo].[GrupoEquipos] ([IdGrupo])
GO
ALTER TABLE [dbo].[Biomedica]  WITH CHECK ADD  CONSTRAINT [FK_Biomedica_Areas] FOREIGN KEY([Area])
REFERENCES [dbo].[Areas] ([IdArea])
GO
ALTER TABLE [dbo].[Biomedica] CHECK CONSTRAINT [FK_Biomedica_Areas]
GO
ALTER TABLE [dbo].[Biomedica]  WITH CHECK ADD  CONSTRAINT [FK_Biomedica_GrupoCEYEProgramacion] FOREIGN KEY([IdGrupoCEYE])
REFERENCES [dbo].[GrupoCEYEProgramacion] ([IdGrupoCEYE])
GO
ALTER TABLE [dbo].[Biomedica] CHECK CONSTRAINT [FK_Biomedica_GrupoCEYEProgramacion]
GO
ALTER TABLE [dbo].[Biomedica]  WITH CHECK ADD  CONSTRAINT [FK_Biomedica_SubAreas] FOREIGN KEY([SubArea])
REFERENCES [dbo].[SubAreas] ([IdSubArea])
GO
ALTER TABLE [dbo].[Biomedica] CHECK CONSTRAINT [FK_Biomedica_SubAreas]
GO
ALTER TABLE [dbo].[CEYE]  WITH CHECK ADD  CONSTRAINT [FK_CEYE_Cirugia] FOREIGN KEY([ID_Cirugia])
REFERENCES [dbo].[TiposCirugias] ([ID])
GO
ALTER TABLE [dbo].[CEYE] CHECK CONSTRAINT [FK_CEYE_Cirugia]
GO
ALTER TABLE [dbo].[InsumoGrupoCompatibilidad]  WITH CHECK ADD FOREIGN KEY([IdGrupo])
REFERENCES [dbo].[GrupoEquipos] ([IdGrupo])
GO
ALTER TABLE [dbo].[InsumoGrupoCompatibilidad]  WITH CHECK ADD FOREIGN KEY([IDE])
REFERENCES [dbo].[InsumosRefacciones] ([IDE])
GO
ALTER TABLE [dbo].[Permisos]  WITH CHECK ADD FOREIGN KEY([RolID])
REFERENCES [dbo].[Roles] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ReservaEquiposBiomedicos]  WITH CHECK ADD  CONSTRAINT [FK_Reserva_CEYE] FOREIGN KEY([IDE_CEYE])
REFERENCES [dbo].[CEYE] ([IDE])
GO
ALTER TABLE [dbo].[ReservaEquiposBiomedicos] CHECK CONSTRAINT [FK_Reserva_CEYE]
GO
ALTER TABLE [dbo].[ReservaEquiposBiomedicos]  WITH CHECK ADD  CONSTRAINT [FK_Reserva_Equipo] FOREIGN KEY([IDE_Equipo])
REFERENCES [dbo].[Biomedica] ([IDE])
GO
ALTER TABLE [dbo].[ReservaEquiposBiomedicos] CHECK CONSTRAINT [FK_Reserva_Equipo]
GO
ALTER TABLE [dbo].[ReservaGruposCEYE]  WITH CHECK ADD  CONSTRAINT [FK_ReservaGruposCEYE_CEYE] FOREIGN KEY([IDE])
REFERENCES [dbo].[CEYE] ([IDE])
GO
ALTER TABLE [dbo].[ReservaGruposCEYE] CHECK CONSTRAINT [FK_ReservaGruposCEYE_CEYE]
GO
ALTER TABLE [dbo].[ReservaGruposCEYE]  WITH CHECK ADD  CONSTRAINT [FK_ReservaGruposCEYE_GrupoCEYE] FOREIGN KEY([IdGrupoCEYE])
REFERENCES [dbo].[GrupoCEYEProgramacion] ([IdGrupoCEYE])
GO
ALTER TABLE [dbo].[ReservaGruposCEYE] CHECK CONSTRAINT [FK_ReservaGruposCEYE_GrupoCEYE]
GO
ALTER TABLE [dbo].[Sistemas]  WITH CHECK ADD  CONSTRAINT [FK_Sistemas_Asignacion] FOREIGN KEY([Asignacion])
REFERENCES [dbo].[SubAreas] ([IdSubArea])
GO
ALTER TABLE [dbo].[Sistemas] CHECK CONSTRAINT [FK_Sistemas_Asignacion]
GO
ALTER TABLE [dbo].[Sistemas]  WITH CHECK ADD  CONSTRAINT [FK_Sistemas_Departamento] FOREIGN KEY([Departamento])
REFERENCES [dbo].[Areas] ([IdArea])
GO
ALTER TABLE [dbo].[Sistemas] CHECK CONSTRAINT [FK_Sistemas_Departamento]
GO
ALTER TABLE [dbo].[SubAreas]  WITH CHECK ADD FOREIGN KEY([IdArea])
REFERENCES [dbo].[Areas] ([IdArea])
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD FOREIGN KEY([RolID])
REFERENCES [dbo].[Roles] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[HistorialEquipoSistemas]  WITH CHECK ADD  CONSTRAINT [CHK_Accion_Historial] CHECK  (([Accion]='CREACION' OR [Accion]='ACTUALIZACION' OR [Accion]='BAJA' OR [Accion]='ACTIVO' OR [Accion]='EN REPARACIÓN'))
GO
ALTER TABLE [dbo].[HistorialEquipoSistemas] CHECK CONSTRAINT [CHK_Accion_Historial]
GO
ALTER TABLE [dbo].[Permisos]  WITH CHECK ADD CHECK  (([Permiso]='TOTAL' OR [Permiso]='ELIMINAR' OR [Permiso]='EDITAR' OR [Permiso]='VER'))
GO
ALTER TABLE [dbo].[Sistemas]  WITH CHECK ADD  CONSTRAINT [CHK_Estatus] CHECK  (([Estatus]='EN REPARACIÓN' OR [Estatus]='BAJA' OR [Estatus]='ACTIVO'))
GO
ALTER TABLE [dbo].[Sistemas] CHECK CONSTRAINT [CHK_Estatus]
GO
USE [master]
GO
ALTER DATABASE [INFRAMED] SET  READ_WRITE 
GO
