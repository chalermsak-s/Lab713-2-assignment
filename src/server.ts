import express from 'express';
import eventRoute from './routes/eventRoute';
import bookRoute from './routes/bookRoute';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/events', eventRoute);
app.use('/books', bookRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;