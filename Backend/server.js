import cors from "cors";
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import tambakRoutes from './routes/TambakRoutes.js';
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3020;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3020',
  credentials: true,
}));

app.use(bodyParser.json());

app.use('/api/tambak', tambakRoutes);

const corsOptions = {
  origin: 'http://localhost:5173',  
  methods: 'GET, POST, PUT, DELETE',  
  allowedHeaders: 'Content-Type, Authorization',  
};

app.use(cors(corsOptions));  

app.use(express.json());


app.post('/api/tambak', (req, res) => {
  const formData = req.body;
  console.log('Data diterima:', formData);

  res.status(200).json({ message: 'Data berhasil diterima', data: formData });
});





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});