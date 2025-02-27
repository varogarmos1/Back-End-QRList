import express from 'express'

import { getAllAsistentes } from './models/asistentesModel.js';
import { getUser } from './models/usersModel.js';
import { getEventosFromUser } from './models/eventosModel.js';
// const userRoutes = require('./routes/userRoutes');
import { manejoErrores } from '../middlewares/manejoErrores.js';


const app = express();

// app.get('/', getUser);
app.use(express.json());

app.use(manejoErrores);
// app.use('/api/users', userRoutes);

export default app;
