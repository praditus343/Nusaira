class Kolam {
    constructor({ tambak_id, namaKolam, tipeKolam, panjang, lebar, kedalaman, jumlahAnco }) {
        this.tambak_id = tambak_id;
        this.namaKolam = namaKolam;
        this.tipeKolam = tipeKolam;
        this.panjang = panjang;
        this.lebar = lebar;
        this.kedalaman = kedalaman;
        this.jumlahAnco = jumlahAnco;
        this.size = this.calculateSize(); 
    }

    calculateSize() {
        return this.panjang * this.lebar * this.kedalaman;
    }

    static validate(data) {
        const errors = [];
        if (!data.namaKolam) {
            errors.push("Nama Kolam is required.");
        }
        if (data.panjang <= 0 || data.lebar <= 0 || data.kedalaman <= 0) {
            errors.push("Panjang, lebar, dan kedalaman harus lebih besar dari 0.");
        }
        if (data.jumlahAnco < 0) {
            errors.push("Jumlah Anco tidak boleh negatif.");
        }
        return errors;
    }

    static async save(data, pool) {
        const validationErrors = Kolam.validate(data);
        if (validationErrors.length > 0) {
            throw new Error(validationErrors.join(", "));
        }

        const size = data.calculateSize();
        const result = await pool.promise().execute(
            'INSERT INTO kolam (tambak_id, namaKolam, tipeKolam, panjang, lebar, kedalaman, jumlahAnco, size) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                data.tambak_id,
                data.namaKolam,
                data.tipeKolam,
                data.panjang,
                data.lebar,
                data.kedalaman,
                data.jumlahAnco,
                size 
            ]
        );

        return result;
    }
}

export default Kolam;
