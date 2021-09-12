import { getConnection, queries, sql } from "../database";
import cloudinary from 'cloudinary'
import { unlink } from 'fs';

/* GET ALL USERS */

export const getUsuario = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM usuario')
        res.json(result.recordset)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


export const imagesUsuario = async (req, res) => {
    console.log(req.body);
    const { title, description } = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    let { fecha_publicacion, comentarios, cantidad_reaccion, cantidad_guardado, cantidad_comentario, tipo_publicacion } = req.body;
    // if (fecha_publicacion == null || comentarios == null || cantidad_reaccion == null || cantidad_guardado == null || cantidad_comentario == null || tipo_publicacion == null) {
    //     return res.status(400).json({msg: 'Bad Request. Please fill all fields'})
    // }
    if (fecha_publicacion == null) fecha_publicacion  = "2021-09-06 15:05:32.943";
    if (comentarios == null) comentarios  = "00000000-0000-0000-0000-000000000000";
    if (cantidad_reaccion == null) cantidad_reaccion = 0;
    if (cantidad_guardado == null) cantidad_guardado = 0;
    if (cantidad_comentario == null) cantidad_comentario = 0;
    if (tipo_publicacion == null) tipo_publicacion = 0;

    try {
        const pool = await getConnection();
        await pool.request()
        .input("id_url_imagen", sql.VarChar, result.url)
        .input("titulo_publicacion", sql.VarChar, title)
        .input("descripcion_imagen", sql.Text, description)
        .input("fecha_publicacion", sql.Date, fecha_publicacion)
        .input("comentarios", sql.UniqueIdentifier, comentarios)
        .input("cantidad_reaccion", sql.Int, cantidad_reaccion)
        .input("cantidad_guardado", sql.Int, cantidad_guardado)
        .input("cantidad_comentario", sql.Int, cantidad_comentario)
        .input("tipo_publicacion", sql.VarChar, tipo_publicacion)
        .query("INSERT INTO publicacion(id_url_imagen, titulo_publicacion, descripcion_imagen, fecha_publicacion, comentarios, cantidad_reaccion, cantidad_guardado, cantidad_comentario, tipo_publicacion) VALUES (@id_url_imagen, @titulo_publicacion, @descripcion_imagen, @fecha_publicacion, @comentarios, @cantidad_reaccion, @cantidad_guardado, @cantidad_comentario, @tipo_publicacion)");
        unlink(req.file.path, (err) => {
            if (err) throw err;
            console.log('path/file.txt was deleted');
        });
        res.send('Received')
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
}

export const createUser = async (req, res) => {
    const { nombre_usuario, apellido_usuario, alias_usuario, correo_electronico, clave_usuario } = req.body;
    let { numero_telefono, informacion_adicional, genero, fecha_creacion_perfil, fecha_nacimiento,
        guardados_usuario, valoracion_publicacion, reaccion_publicacion, comentario_usuario, verificacion_correo,
         contactos, publicaciones_usuario, guardados_wiki, tipo_usuario_c, imagen_perfil } = req.body;
    
    if (nombre_usuario == null || apellido_usuario == null || alias_usuario == null || correo_electronico == null || clave_usuario == null) {
        return res.status(400).json({msg: 'Por favor, complete los campos obligatorios'});
    }

    if (numero_telefono == null) numero_telefono = 0;
    if (informacion_adicional == null) informacion_adicional = '';
    if (genero == null) genero = '';
    if (fecha_creacion_perfil == null) fecha_creacion_perfil = new Date();
    if (fecha_nacimiento == null) fecha_nacimiento = '2021-06-13';
    if (guardados_usuario == null) guardados_usuario = '00000000-0000-0000-0000-000000000000';
    if (valoracion_publicacion == null) valoracion_publicacion = '00000000-0000-0000-0000-000000000000';
    if (reaccion_publicacion == null) reaccion_publicacion = '00000000-0000-0000-0000-000000000000';
    if (comentario_usuario == null) comentario_usuario = '00000000-0000-0000-0000-000000000000';
    if (verificacion_correo == null) verificacion_correo = 0;
    if (contactos == null) contactos = '00000000-0000-0000-0000-000000000000';
    if (publicaciones_usuario == null) publicaciones_usuario = '00000000-0000-0000-0000-000000000000';
    if(guardados_wiki == null) guardados_wiki = '00000000-0000-0000-0000-000000000000';
    if (tipo_usuario_c == null) tipo_usuario_c = 0;
    if (imagen_perfil == null) imagen_perfil = 'Vacío';

    try {
        const pool = await getConnection();
        await pool.request()
        .input("nombre_usuario", sql.VarChar, nombre_usuario)
        .input("apellido_usuario", sql.VarChar, apellido_usuario)
        .input("alias_usuario", sql.VarChar, alias_usuario)
        .input("correo_electronico", sql.VarChar, correo_electronico)
        .input("clave_usuario", sql.VarChar, clave_usuario)
        .input("numero_telefono", sql.BigInt, numero_telefono)
        .input("informacion_adicional", sql.Text, informacion_adicional)
        .input("genero", sql.VarChar, genero)
        .input("fecha_nacimiento", sql.Date, fecha_nacimiento)
        .input("guardados_usuario", sql.UniqueIdentifier,guardados_usuario)
        .input("valoracion_publicacion", sql.UniqueIdentifier,valoracion_publicacion)
        .input("reaccion_publicacion", sql.UniqueIdentifier,reaccion_publicacion)
        .input("comentario_usuario", sql.UniqueIdentifier,comentario_usuario)
        .input("verificacion_correo", sql.SmallInt,verificacion_correo)
        .input("contactos", sql.UniqueIdentifier,contactos)
        .input("publicaciones_usuario", sql.UniqueIdentifier,publicaciones_usuario)
        .input("guardados_wiki", sql.UniqueIdentifier,guardados_wiki)
        .input("tipo_usuario_c", sql.SmallInt,tipo_usuario_c)
        .input("imagen_perfil", sql.VarChar,imagen_perfil)
        .query(queries.postUser);

        res.json( nombre_usuario, apellido_usuario, alias_usuario, correo_electronico, clave_usuario, numero_telefono, informacion_adicional, genero, fecha_creacion_perfil, fecha_nacimiento,
            guardados_usuario, valoracion_publicacion, reaccion_publicacion, comentario_usuario, verificacion_correo, contactos, publicaciones_usuario, guardados_wiki, tipo_usuario_c, imagen_perfil );
    } catch (error) {
        
        res.status(500);
        res.send(error.message);
    }
}

export const GetUserByEmail = async (req, res) => {

    const { correo_electronico } = req.params;

    const pool = await getConnection();
    const result = await pool.request().input("correo_electronico", sql.VarChar, correo_electronico).query(queries.getUserByemail);

    res.send(result.recordset[0]);

}