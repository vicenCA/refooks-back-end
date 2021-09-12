import { getConnection, sql } from "../database";
import { queries } from "../database/queries";
import cloudinary from 'cloudinary'
import { unlink } from 'fs';

export const getAllFoods = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllFoods);
        res.json(result.recordset);
    } catch (error) {
        res.send(error.message);
    }
}

export const getFoodByID = async (req, res) => {
    try {
        const { id_alimento } = req.params;

        const pool = await getConnection();
        const result = await pool.request()
        .input("id_alimento", sql.UniqueIdentifier, id_alimento).query(queries.getFoodByid);

        res.send(result.recordset[0]);
    } catch (error) {
        res.send(error.message);
    }
}

export const createFood = async (req, res) => {
    
    const { nombre_alimento, nombre_cientifico, tipo_alimento, subtipo_alimento, origen_tipo, origen_mundo } = req.body;
    let { produccion, calorias, grasas, carbohidratos, proteinas, agua, tiempo_produccion,
        origen_manufactura, lacteo, medicina, preparaciones, vitaminas, imagen_alimento, comentarios,
        valoracion_alimento, cantidad_guardados, promedio_valoracion, cantidad_vistas  } = req.body;
    // if (nombre_alimento == null || nombre_cientifico == null || tipo_alimento == null || subtipo_alimento == null || origen_tipo == null || origen_mundo == null) {
    //     return res.status(400).json({msg: 'Por favor, complete los campos obligatorios'});
    // }

    const result = await cloudinary.v2.uploader.upload(req.file.path);
    
    if (produccion == null) produccion = 0;
    if (calorias == null) calorias = 0.0;
    if (grasas == null) grasas = 0.0;
    if (carbohidratos == null) carbohidratos = 0.0;
    if (proteinas == null) proteinas = 0.0;
    if (agua == null) agua = 0.0;
    if (tiempo_produccion == null) tiempo_produccion = 'Desconocido';
    if (origen_manufactura == null) origen_manufactura = 'Desconocido';
    if (lacteo == null) lacteo = 'Desconocido';
    if (medicina == null) medicina = 'Desconocido';
    if (preparaciones == null) preparaciones = '00000000-0000-0000-0000-000000000000';
    if (vitaminas == null) vitaminas = '00000000-0000-0000-0000-000000000000';
    if(comentarios == null) comentarios = '00000000-0000-0000-0000-000000000000';
    if (valoracion_alimento == null) valoracion_alimento = '00000000-0000-0000-0000-000000000000';
    if (cantidad_guardados == null) cantidad_guardados = 0;
    if (promedio_valoracion == null) promedio_valoracion = 0.0;
    if (cantidad_vistas == null) cantidad_vistas = 0;

    try {
        const pool = await getConnection();
        await pool.request()
        .input("nombre_alimento", sql.VarChar,nombre_alimento)
        .input("nombre_cientifico", sql.VarChar,nombre_cientifico)
        .input("tipo_alimento", sql.VarChar,tipo_alimento)
        .input("subtipo_alimento", sql.VarChar, subtipo_alimento)
        .input("origen_tipo", sql.VarChar,origen_tipo)
        .input("origen_mundo", sql.VarChar,origen_mundo)
        .input("produccion", sql.BigInt,produccion)
        .input("calorias", sql.Float,calorias)
        .input("grasas", sql.Float,grasas)
        .input("carbohidratos", sql.Float,carbohidratos)
        .input("proteinas", sql.Float,proteinas)
        .input("agua", sql.Float,agua)
        .input("tiempo_produccion", sql.Text,tiempo_produccion)
        .input("origen_manufactura", sql.Text,origen_manufactura)
        .input("lacteo", sql.Text,lacteo)
        .input("medicina", sql.Text,medicina)
        .input("preparaciones", sql.UniqueIdentifier,preparaciones)
        .input("vitaminas", sql.UniqueIdentifier,vitaminas)
        .input("imagen_alimento", sql.VarChar,result.url)
        .input("comentarios", sql.UniqueIdentifier,comentarios)
        .input("valoracion_alimento", sql.UniqueIdentifier,valoracion_alimento)
        .input("cantidad_guardados", sql.Int,cantidad_guardados)
        .input("promedio_valoracion", sql.Float,promedio_valoracion)
        .input("cantidad_vistas", sql.Int, cantidad_vistas)
        .query(queries.postFood);

        unlink(req.file.path, (err) => {
            if (err) throw err;
            console.log(err);
        });
        
        res.json( nombre_alimento, nombre_cientifico, tipo_alimento, subtipo_alimento, origen_tipo, origen_mundo, produccion, 
            calorias, grasas, carbohidratos, proteinas, agua, tiempo_produccion, origen_manufactura, lacteo, medicina, preparaciones, vitaminas,
            imagen_alimento, comentarios, valoracion_alimento, cantidad_guardados, promedio_valoracion, cantidad_vistas);
    } catch (error) {
        
        res.status(500);
        res.send(error.message);
    }
} 