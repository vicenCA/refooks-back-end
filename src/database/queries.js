export const queries = {
    /* ALIMENTOS */

    getAllFoods: "SELECT * FROM alimento",
    getFoodByid: "SELECT * FROM alimento WHERE id_alimento = @id_alimento",
    postFood: "INSERT INTO alimento VALUES ((newid()), @nombre_alimento, @nombre_cientifico, @tipo_alimento, @subtipo_alimento, @origen_tipo, @origen_mundo, @produccion, @calorias, @grasas, @carbohidratos, @proteinas, @agua, @tiempo_produccion, @origen_manufactura, @lacteo, @medicina, @preparaciones, @vitaminas, @imagen_alimento, @comentarios, @valoracion_alimento, @cantidad_guardados, @promedio_valoracion, @cantidad_vistas)",

    /* USUARIO */

    postUser: "INSERT INTO usuario VALUES ((newid()), @nombre_usuario, @apellido_usuario, @alias_usuario, @correo_electronico, @clave_usuario, @numero_telefono, @informacion_adicional, @genero, CURRENT_TIMESTAMP, @fecha_nacimiento, @guardados_usuario, @valoracion_publicacion, @reaccion_publicacion, @comentario_usuario, @verificacion_correo, @contactos,  @publicaciones_usuario, @guardados_wiki, @tipo_usuario_c, @imagen_perfil)", 
    getUserByemail: "SELECT * FROM usuario WHERE correo_electronico = @correo_electronico",
}