const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const plannerRoutes = require('./routes/plannerRoutes');
const careerRoutes = require('./routes/careerRoutes');
const assistantRoutes = require('./routes/assistantRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/assistant', assistantRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});