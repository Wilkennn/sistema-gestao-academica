import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import routes from './src/routes/routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

export default app;
