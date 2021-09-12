import express from "express";
import config from './config';
import cors from 'cors';
import morgan from 'morgan';
import multer from "multer";
import path from 'path';
import exphbs from "express-handlebars";

import router from "./routes/index";
import AlimentoRoutes from "./routes/alimento.route";

const app = express();

app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs')

// MIddlewares (funciones que se ejecutan antes de que lleguen a las rutas)

app.use(morgan('dev'));
app.use(cors());
app.use(express.json()) // Entiende el envío y recibo de un archivo json.
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

app.use(multer({storage}).single('image'));

app.use(router);
app.use(AlimentoRoutes);

export default app;