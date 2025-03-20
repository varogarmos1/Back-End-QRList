import express from 'express';
import userOrgRouter from './routes/userOrganizacionRoutes.js';
import authRouter from './routes/authRoutes.js';
import asistentesRoutes from './routes/asistentesRoutes.js';
import orgRouter from './routes/organizacionRouter.js';

const app = express();

app.use(express.json());

app.use('/api/organizaciones',orgRouter);
app.use('/api/auth', authRouter);
app.use('/api/', asistentesRoutes);

export default app;
