/* 
    Usuario de prueba Administrador
    1	1	1	usuario@test.com	Rodolfo Xiloj	$2a$10$INoMkHfDyYD4rqjSB1XLG.FB76UuHcEFv8WJ.Y	555-555-5555	1990-01-01	2024-12-17 14:53:15.677	NULL
    contrasenia real: contra321
 */
Insert into Usuarios (id_rol, id_estados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento) 
              values (1, 1, 'usuario@test.com', 'Rodolfo Xiloj', '$2a$10$mX7BeMclKtTIO7zg7cWqOOrFjjqg1spZJAVo2qZ/Rpyrl3CSUU7lW', '555-555-5555', '1990-01-01');
                
--Insertar ROLES
Insert into Rol (nombre) values ('Administrador');
Insert into Rol (nombre) values ('Cliente');
Insert into Rol (nombre) values ('Vendedor');

--Insertar ESTADOS
Insert into Estados (nombre) values ('Activo');
Insert into Estados (nombre) values ('Inactivo');

-----------------------------------
--Primera Semana
----------------------------------
--Crear Base de Datos
CREATE DATABASE GDA00117_OT_NombreApellido;
GO
--Decirle que vamnos a trabajar en la base de datos
USE GDA00117_OT_NombreApellido;
GO

--Crear Tablas
--Crear Tabla Clientes
CREATE TABLE Clientes (
    --Identificador Unico para la tabla cliente
    id_clientes INT PRIMARY KEY IDENTITY(1,1),
    razon_social VARCHAR(245),
    nombre_comercial VARCHAR(245),
    direccion_entrega VARCHAR(245),
    telefono VARCHAR(45),
    email VARCHAR(45)
);
--Crear Tabla Estados
CREATE TABLE Estados (
    --Identificador Unico para la tabla estados
    id_estados INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(45) NOT NULL
);
--Crear Tabla Rol
CREATE TABLE Rol (
    --Identificador Unico para la tabla rol
    id_rol INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(45) NOT NULL
);

--Crear Tabla Usuarios
CREATE TABLE Usuarios (
    --Identificador Unico para la tabla usuarios
    id_usuarios INT PRIMARY KEY IDENTITY(1,1),
    --Referencia a la tabla rol
    id_rol INT FOREIGN KEY REFERENCES Rol(id_rol),
    --Referencia a la tabla estados
    id_estados INT FOREIGN KEY REFERENCES Estados(id_estados),
    correo_electronico VARCHAR(100) NOT NULL UNIQUE,
    nombre_completo VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    telefono VARCHAR(45),
    fecha_nacimiento DATE,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    --Referencia a la tabla Clientes
    id_clientes INT FOREIGN KEY REFERENCES Clientes(id_clientes)
);
--Crear Tabla CategoriaProductos
CREATE TABLE CategoriaProductos (
    --Identificador Unico para la tabla CategoriaProductos
    id_categoria_productos INT PRIMARY KEY IDENTITY(1,1),
    --Referencia a la tabla usuarios
    id_usuarios INT FOREIGN KEY REFERENCES Usuarios(id_usuarios),
    --Referencia a la tabla estados
    id_estados INT FOREIGN KEY REFERENCES Estados(id_estados),
    nombre VARCHAR(45) NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE()
);
--Crear Tabla Productos
CREATE TABLE Productos (
    --Identificador Unico para la tabla Productos
    id_productos INT PRIMARY KEY IDENTITY(1,1),
    --Referencia a la tabla CategoriaProductos
    id_categoria_productos INT FOREIGN KEY REFERENCES CategoriaProductos(id_categoria_productos),
    --Referencia a la tabla usuarios
    id_usuarios INT FOREIGN KEY REFERENCES Usuarios(id_usuarios),
    nombre VARCHAR(45) NOT NULL,
    marca VARCHAR(45),
    codigo VARCHAR(45),
    stock FLOAT NOT NULL,
    --Referencia a la tabla estados
    id_estados INT FOREIGN KEY REFERENCES Estados(id_estados),
    precio FLOAT NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    foto VARBINARY(MAX)
);
--Crear Tabla Orden
CREATE TABLE Orden (
    --Identificador Unico para la tabla Orden
    id_orden INT PRIMARY KEY IDENTITY(1,1),
    --Referencia a la tabla usuarios
    id_usuarios INT FOREIGN KEY REFERENCES Usuarios(id_usuarios),
    --Referencia a la tabla estados
    id_estados INT FOREIGN KEY REFERENCES Estados(id_estados),
    fecha_creacion DATETIME DEFAULT GETDATE(),
    nombre_completo VARCHAR(100),
    direccion VARCHAR(545),
    telefono VARCHAR(45),
    correo_electronico VARCHAR(45),
    fecha_entrega DATE,
    total_orden FLOAT
);
--Crear Tabla OrdenDetalles
CREATE TABLE OrdenDetalles (
    --Identificador Unico para la tabla OrdenDetalles
    id_orden_detalles INT PRIMARY KEY IDENTITY(1,1),
    --Referencia a la tabla Orden
    id_orden INT FOREIGN KEY REFERENCES Orden(id_orden),
    --Referencia a la tabla Productos
    id_productos INT FOREIGN KEY REFERENCES Productos(id_productos),
    cantidad INT NOT NULL,
    precio FLOAT NOT NULL,
    subtotal FLOAT NOT NULL
);
GO

--Crear Procedimientos Almacenados
--Crear Procedimiento Almacenado para Actualizar inactivar productos
CREATE PROCEDURE sp_InactivarProducto
    @id_productos INT,
    @id_estados INT
AS
BEGIN
    UPDATE Productos
    SET id_estados = @id_estados
    WHERE id_productos = @id_productos;
END;
GO

--Crear Vistas
--a Total de Productos activos que tenga en stock mayor a 0
CREATE VIEW vw_ProductosActivosConStock AS
SELECT * 
FROM Productos 
WHERE id_estados = (SELECT id_estados FROM Estados WHERE nombre = 'Activo') 
AND stock > 0;
GO
--Vista para obtener el total de ordenes en Agosto del 2024
CREATE VIEW vw_TotalOrdenesAgosto2024 AS
SELECT SUM(total_orden) AS TotalQuetzales
FROM Orden
WHERE MONTH(fecha_creacion) = 8 AND YEAR(fecha_creacion) = 2024;
GO
--Vista pata obtener el top 10 de clientes con mayor consumo
CREATE VIEW vw_Top10ClientesMayorConsumo AS
SELECT TOP 10 c.id_clientes, c.nombre_comercial, SUM(o.total_orden) AS TotalConsumo
FROM Clientes c
JOIN Usuarios u ON c.id_clientes = u.id_clientes
JOIN Orden o ON u.id_usuarios = o.id_usuarios
GROUP BY c.id_clientes, c.nombre_comercial
ORDER BY TotalConsumo DESC;
GO
--Vista para obtener el top 10 de productos mas vendidos orden asc
CREATE VIEW vw_Top10ProductosMasVendidos AS
SELECT TOP 10 p.id_productos, p.nombre, SUM(od.cantidad) AS TotalVendidos
FROM Productos p
JOIN OrdenDetalles od ON p.id_productos = od.id_productos
GROUP BY p.id_productos, p.nombre
ORDER BY TotalVendidos ASC;
GO

---Procedimientos para CRUD
--Procedimiento para Insertar Productos
CREATE PROCEDURE sp_InsertarProducto
    @id_categoria_productos INT,
    @id_usuarios INT,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock FLOAT,
    @id_estados INT,
    @precio FLOAT,
    @foto VARBINARY(MAX)
AS
BEGIN
    INSERT INTO Productos (id_categoria_productos, id_usuarios, nombre, marca, codigo, stock, id_estados, precio, foto)
    VALUES (@id_categoria_productos, @id_usuarios, @nombre, @marca, @codigo, @stock, @id_estados, @precio, @foto);
END;
GO
--Procedimiento para Actualizar Productos
CREATE PROCEDURE sp_ActualizarProducto
    @id_productos INT,
    @id_categoria_productos INT,
    @id_usuarios INT,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock FLOAT,
    @id_estados INT,
    @precio FLOAT,
    @foto VARBINARY(MAX)
AS
BEGIN
    UPDATE Productos
    SET id_categoria_productos = @id_categoria_productos,
        id_usuarios = @id_usuarios,
        nombre = @nombre,
        marca = @marca,
        codigo = @codigo,
        stock = @stock,
        id_estados = @id_estados,
        precio = @precio,
        foto = @foto
    WHERE id_productos = @id_productos;
END;
GO
--Procedimiento para Insertar CategoriaProductos
CREATE PROCEDURE sp_InsertarCategoriaProducto
    @id_usuarios INT,
    @id_estados INT,
    @nombre VARCHAR(45)
AS
BEGIN
    INSERT INTO CategoriaProductos (id_usuarios, id_estados, nombre)
    VALUES (@id_usuarios, @id_estados, @nombre);
END;
GO
--Procedimiento para Actualizar CategoriaProductos
CREATE PROCEDURE sp_ActualizarCategoriaProducto
    @id_categoria_productos INT,
    @id_usuarios INT,
    @id_estados INT,
    @nombre VARCHAR(45)
AS
BEGIN
    UPDATE CategoriaProductos
    SET id_usuarios = @id_usuarios,
        id_estados = @id_estados,
        nombre = @nombre
    WHERE id_categoria_productos = @id_categoria_productos;
END;
GO
--Procedimiento para Insertar Estado
CREATE PROCEDURE sp_InsertarEstado
    @nombre VARCHAR(45)
AS
BEGIN
    INSERT INTO Estados (nombre)
    VALUES (@nombre);
END;
GO
--Procedimiento para Actualizar Estado
CREATE PROCEDURE sp_ActualizarEstado
    @id_estados INT,
    @nombre VARCHAR(45)
AS
BEGIN
    UPDATE Estados
    SET nombre = @nombre
    WHERE id_estados = @id_estados;
END;
GO
--Procedimiento para insertar Usuarios
CREATE PROCEDURE sp_InsertarUsuario
    @id_rol INT,
    @id_estados INT,
    @correo_electronico VARCHAR(45),
    @nombre_completo VARCHAR(100),
    @password VARCHAR(100),
    @telefono VARCHAR(45),
    @fecha_nacimiento DATE,
    @id_clientes INT
AS
BEGIN
    INSERT INTO Usuarios (id_rol, id_estados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, id_clientes)
    VALUES (@id_rol, @id_estados, @correo_electronico, @nombre_completo,  @password, @telefono, @fecha_nacimiento, @id_clientes);
END;
GO
--Procedimiento para Actualizar Usuarios
CREATE PROCEDURE sp_ActualizarUsuario
    @id_usuarios INT,
    @id_rol INT,
    @id_estados INT,
    @correo_electronico VARCHAR(45),
    @nombre_completo VARCHAR(100),
    @password VARCHAR(45),
    @telefono VARCHAR(45),
    @fecha_nacimiento DATE,
    @id_clientes INT
AS
BEGIN
    UPDATE Usuarios
    SET id_rol = @id_rol,
        id_estados = @id_estados,
        correo_electronico = @correo_electronico,
        nombre_completo = @nombre_completo,
        password = @password,
        telefono = @telefono,
        fecha_nacimiento = @fecha_nacimiento,
        id_clientes = @id_clientes
    WHERE id_usuarios = @id_usuarios;
END;
GO
--Procedimiento para Insertar Orden
CREATE PROCEDURE sp_InsertarOrden
    @id_usuarios INT,
    @id_estados INT,
    @nombre_completo VARCHAR(100),
    @direccion VARCHAR(545),
    @telefono VARCHAR(45),
    @correo_electronico VARCHAR(45),
    @fecha_entrega DATE,
    @total_orden FLOAT
AS
BEGIN
    INSERT INTO Orden (id_usuarios, id_estados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden)
    VALUES (@id_usuarios, @id_estados, @nombre_completo, @direccion, @telefono, @correo_electronico, @fecha_entrega, @total_orden);
END;
GO
--Procedimiento para Actualizar Orden
CREATE PROCEDURE sp_ActualizarOrden
    @id_orden INT,
    @id_usuarios INT,
    @id_estados INT,
    @nombre_completo VARCHAR(100),
    @direccion VARCHAR(545),
    @telefono VARCHAR(45),
    @correo_electronico VARCHAR(45),
    @fecha_entrega DATE,
    @total_orden FLOAT
AS
BEGIN
    UPDATE Orden
    SET id_usuarios = @id_usuarios,
        id_estados = @id_estados,
        nombre_completo = @nombre_completo,
        direccion = @direccion,
        telefono = @telefono,
        correo_electronico = @correo_electronico,
        fecha_entrega = @fecha_entrega,
        total_orden = @total_orden
    WHERE id_orden = @id_orden;
END;
GO
--Procedimiento para Insertar clientes
CREATE PROCEDURE sp_InsertarCliente
    @razon_social VARCHAR(245),
    @nombre_comercial VARCHAR(245),
    @direccion_entrega VARCHAR(245),
    @telefono VARCHAR(45),
    @email VARCHAR(45)
AS
BEGIN
    INSERT INTO Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email)
    VALUES (@razon_social, @nombre_comercial, @direccion_entrega, @telefono, @email);
END;
GO
--Procedimiento para Actualizar clientes
CREATE PROCEDURE sp_ActualizarCliente
    @id_clientes INT,
    @razon_social VARCHAR(245),
    @nombre_comercial VARCHAR(245),
    @direccion_entrega VARCHAR(245),
    @telefono VARCHAR(45),
    @email VARCHAR(45)
AS
BEGIN
    UPDATE Clientes
    SET razon_social = @razon_social,
        nombre_comercial = @nombre_comercial,
        direccion_entrega = @direccion_entrega,
        telefono = @telefono,
        email = @email
    WHERE id_clientes = @id_clientes;
END;
GO
--Procedimiento para Insertar OrdenDetalles
CREATE PROCEDURE sp_InsertarOrdenConDetalles
    @jsonOrden NVARCHAR(MAX)
AS
BEGIN
    BEGIN TRANSACTION;

    BEGIN TRY
        DECLARE @id_orden INT;

        -- Insertar el encabezado de la orden
        INSERT INTO Orden (id_usuarios, id_estados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden)
        SELECT 
            id_usuarios,
            id_estados,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            fecha_entrega,
            total_orden
        FROM OPENJSON(@jsonOrden)
        WITH (
            id_usuarios INT,
            id_estados INT,
            nombre_completo NVARCHAR(100),
            direccion NVARCHAR(545),
            telefono NVARCHAR(45),
            correo_electronico NVARCHAR(45),
            fecha_entrega DATE,
            total_orden FLOAT
        );

        -- Obtener el ID del encabezado recién insertado
        SET @id_orden = SCOPE_IDENTITY();

        -- Insertar los detalles de la orden
        INSERT INTO OrdenDetalle (id_orden, Producto_id, cantidad, precio_unitario, subtotal)
        SELECT 
            @id_orden,
            Producto_id,
            cantidad,
            precio_unitario,
            subtotal
        FROM OPENJSON(@jsonOrden, '$.detalles')
        WITH (
            Producto_id INT,
            cantidad FLOAT,
            precio_unitario FLOAT,
            subtotal FLOAT
        );

        -- Confirmar la transacción
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Si ocurre un error, revertir la transacción
        ROLLBACK TRANSACTION;

        -- Propagar el error
        THROW;
    END CATCH;
END;
GO
--Procedimiento para Actualizar OrdenDetalles
CREATE PROCEDURE sp_ActualizarOrdenConDetalles
    @id_orden INT,
    @jsonOrden NVARCHAR(MAX)
AS
BEGIN
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Actualizar el encabezado de la orden
        UPDATE Orden
        SET 
            id_usuarios = id_usuarios,
            id_estados = id_estados,
            nombre_completo = nombre_completo,
            direccion = direccion,
            telefono = telefono,
            correo_electronico = correo_electronico,
            fecha_entrega = fecha_entrega,
            total_orden = total_orden
        FROM OPENJSON(@jsonOrden)
        WITH (
            id_usuarios INT,
            id_estados INT,
            nombre_completo NVARCHAR(100),
            direccion NVARCHAR(545),
            telefono NVARCHAR(45),
            correo_electronico NVARCHAR(45),
            fecha_entrega DATE,
            total_orden FLOAT
        )
        WHERE id_orden = @id_orden;

        -- Eliminar los detalles de la orden
        DELETE FROM OrdenDetalle
        WHERE id_orden = @id_orden;

        -- Insertar los detalles de la orden
        INSERT INTO OrdenDetalle (id_orden, Producto_id, cantidad, precio_unitario, subtotal)
        SELECT 
            @id_orden,
            Producto_id,
            cantidad,
            precio_unitario,
            subtotal
        FROM OPENJSON(@jsonOrden, '$.detalles')
        WITH (
            Producto_id INT,
            cantidad FLOAT,
            precio_unitario FLOAT,
            subtotal FLOAT
        );

        -- Confirmar la transacción
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Si ocurre un error, revertir la transacción
        ROLLBACK TRANSACTION;

        -- Propagar el error
        THROW;
    END CATCH;
END;