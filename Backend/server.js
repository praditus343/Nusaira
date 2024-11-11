import cors from "cors";
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3020;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});