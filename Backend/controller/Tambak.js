import pool from '../database/Nusairadb.js'; // Assuming pool is set up
import Kolam from '../models/DataTambak.js'; // Import the Kolam model

class TambakController {
    static async save(req, res) {
        const tambakData = req.body; 
        
        const validationErrors = Tambak.validate(tambakData);
        if (validationErrors.length > 0) {
            return res.status(400).json({ success: false, errors: validationErrors });
        }

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
                const kolamModel = new Kolam({
                    tambak_id: tambakId,
                    namaKolam: kolam.namaKolam,
                    tipeKolam: kolam.tipeKolam,
                    panjang: kolam.panjang,
                    lebar: kolam.lebar,
                    kedalaman: kolam.kedalaman,
                    jumlahAnco: kolam.jumlahAnco,
                });

                const kolamValidationErrors = Kolam.validate(kolam);
                if (kolamValidationErrors.length > 0) {
                    return res.status(400).json({ success: false, errors: kolamValidationErrors });
                }

                await Kolam.save(kolamModel, pool);
            }

            return res.status(201).json({ success: true, message: 'Data Tambak and Kolam successfully saved' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error saving data to the database' });
        }
    }

    static async getAll(req, res) {
        try {
            const [rows] = await pool.promise().execute('SELECT * FROM tambak');
            return res.status(200).json(rows);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error fetching data from the database' });
        }
    }
}

export default TambakController;
