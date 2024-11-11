import express from 'express';
import pool from '../database/Nusairadb.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const tambakData = req.body;

    try {
        const [result] = await pool.promise().execute(
            'INSERT INTO tambak (nama, negara, provinsi, kabupaten, alamat, jumlahKolam) VALUES (?, ?, ?, ?, ?, ?)',
            [
                tambakData.nama,
                tambakData.negara,
                tambakData.provinsi,
                tambakData.kabupaten,
                tambakData.alamat,
                tambakData.jumlahKolam,
            ]
        );

        const tambakId = result.insertId;

        for (const kolam of tambakData.kolamDetails) {
            const size = kolam.panjang * kolam.lebar * kolam.kedalaman;
            await pool.promise().execute(
                'INSERT INTO kolam (tambak_id, namaKolam, tipeKolam, panjang, lebar, kedalaman, jumlahAnco, size) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    tambakId,
                    kolam.namaKolam,
                    kolam.tipeKolam,
                    kolam.panjang,
                    kolam.lebar,
                    kolam.kedalaman,
                    kolam.jumlahAnco,
                    size,  
                ]
            );
        }

        return res.status(201).json({ success: true, message: 'Data Tambak successfully saved' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error saving data to the database' });
    }
});

export default router;
