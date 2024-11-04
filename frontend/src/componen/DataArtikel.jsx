
import pyl1 from '../assets/img/penyakit_lele/pyl1.png';
import pyl2 from '../assets/img/penyakit_lele/pyl2.png';
import pyl3 from '../assets/img/penyakit_lele/pyl3.png';
import pyl4 from '../assets/img/penyakit_lele/pyl4.png';
import pyl5 from '../assets/img/penyakit_lele/pyl5.png';
import pyl6 from '../assets/img/penyakit_lele/pyl6.png';
import pyl7 from '../assets/img/penyakit_lele/pyl7.png';
import pyl8 from '../assets/img/penyakit_lele/pyl8.png';
import pyl9 from '../assets/img/penyakit_lele/pyl9.png';

const articlesData = [
    {
        id: 1,
        title: 'Penyakit Bintik Putih Pada Lele',
        date: '01/10/2024',
        image: pyl1,
        indikasi: `
            Lele terlihat lemas dan sering menggosokkan tubuh ke dinding kolam.
            Terdapat bintik-bintik putih pada permukaan tubuh dan insang lele.
            Nafsu makan lele menurun drastis.
        `,
        penyebab: `
            Disebabkan oleh parasit protozoa bernama Ichthyophthirius multifiliis.
            Parasit menyebar di lingkungan kolam dengan kualitas air yang buruk.
            Suhu air yang dingin juga mempercepat perkembangan parasit.
        `,
        penanganan: `
            Tingkatkan suhu kolam hingga 28-30°C untuk memperlambat pertumbuhan parasit.
            Tambahkan garam khusus ikan atau obat anti-parasit seperti formalin.
            Bersihkan kolam dan kurangi kepadatan ikan.
        `,
        pencegahan: `
            Rutin memeriksa kualitas air dan menjaga kebersihan kolam.
            Menghindari kepadatan ikan yang berlebihan untuk mencegah stres.
            Menggunakan pakan berkualitas dan tidak berlebihan.
        `,
        gejalaTambahan: `
            Lele dapat menunjukkan perilaku abnormal seperti bersembunyi dan menghindari interaksi.
            Munculnya bercak-bercak merah pada kulit yang menunjukkan iritasi lebih lanjut.
        `,
        referensi: [
            "Smith, J. (2020). Fish Diseases: A Comprehensive Guide. Aquaculture Press.",
            "Johnson, L. (2019). Managing Pond Water Quality. Fisheries Research Institute."
        ],
    },
    {
        id: 2,
        title: 'Penyakit Jamur Air',
        date: '02/10/2024',
        image: pyl2,
        indikasi: `
            Kulit lele tampak berlendir dan terdapat bercak putih seperti kapas.
            Ikan lele sering berenang tidak teratur.
            Insang terlihat pucat dan lele menjadi lemas.
        `,
        penyebab: `
            Jamur berkembang biak di air dengan kualitas rendah atau kotor.
            Cedera atau luka pada tubuh ikan lele menjadi jalur masuk infeksi.
            Pemberian pakan yang berlebihan sehingga menyebabkan sisa pakan menumpuk.
        `,
        penanganan: `
            Jaga kebersihan kolam dengan mengganti air secara berkala.
            Gunakan obat antijamur seperti malachite green sesuai dosis.
            Perhatikan pakan agar tidak ada sisa yang tertinggal di kolam.
        `,
        pencegahan: `
            Lakukan penggantian air secara berkala untuk menjaga kualitas.
            Gunakan pakan yang berkualitas baik dan sesuai dosis untuk menghindari sisa.
            Menjaga suhu air agar tetap stabil untuk mencegah pertumbuhan jamur.
        `,
        gejalaTambahan: `
            Munculnya bercak-bercak merah pada kulit dan insang.
            Ikan tampak lebih sensitif terhadap gangguan eksternal.
        `,
        referensi: [
            "Brown, K. (2018). Aquatic Fungal Diseases: Diagnosis and Treatment. Fish Health Journal.",
            "Miller, A. (2017). Managing Fish Diseases. Fishery Technology Publications."
        ],
    },
    {
        id: 3,
        title: 'Penyakit Kulit Mengelupas',
        date: '03/10/2024',
        image: pyl3,
        indikasi: `
            Kulit lele terlihat terkelupas dan muncul kemerahan.
            Lele sering terlihat menggosokkan tubuhnya ke permukaan kolam.
            Nafsu makan lele menurun dan ikan tampak lebih lamban.
        `,
        penyebab: `
            Infeksi bakteri seperti Aeromonas hydrophila akibat lingkungan kolam yang kotor.
            Luka pada tubuh lele yang tidak segera diobati.
            Kepadatan ikan yang tinggi di dalam kolam.
        `,
        penanganan: `
            Lakukan penggantian air dan bersihkan kolam secara rutin.
            Gunakan antibiotik seperti oxytetracycline atau sesuai anjuran dokter hewan.
            Kurangi kepadatan ikan untuk mengurangi risiko infeksi.
        `,
        pencegahan: `
            Pastikan kualitas air selalu terjaga dengan baik.
            Lakukan pemantauan kesehatan ikan secara rutin untuk mendeteksi dini gejala.
            Hindari luka pada ikan dengan mengurangi kepadatan dan risiko stres.
        `,
        gejalaTambahan: `
            Lele bisa menunjukkan perilaku agresif akibat rasa sakit.
            Munculnya nanah atau lendir di area yang terinfeksi.
        `,
        referensi: [
            "Taylor, R. (2021). Bacterial Diseases in Aquaculture: A Comprehensive Review. Aquaculture International.",
            "Wilson, P. (2019). Fish Health Management. Fishery Research Institute."
        ],
    },
    {
        id: 4,
        title: 'Penyakit Munculnya Bercak Merah',
        date: '04/10/2024',
        image: pyl4,
        indikasi: `
            Lele menunjukkan bercak merah pada kulit, terutama di area insang.
            Perilaku ikan menjadi lesu dan nafsu makannya berkurang.
            Kemungkinan muncul lendir di permukaan kulit.
        `,
        penyebab: `
            Biasanya disebabkan oleh infeksi bakteri atau parasit.
            Lingkungan kolam yang tidak bersih dan padat ikan.
            Stres akibat perubahan suhu yang drastis.
        `,
        penanganan: `
            Lakukan penggantian air dan perbaiki kualitas air.
            Gunakan obat antibiotik jika diperlukan.
            Berikan pakan yang berkualitas untuk mendukung pemulihan.
        `,
        pencegahan: `
            Rutin menjaga kebersihan kolam dan kualitas air.
            Menghindari kepadatan ikan yang berlebihan untuk mengurangi stres.
            Memastikan lingkungan kolam stabil.
        `,
        gejalaTambahan: `
            Lele mungkin berenang tidak teratur dan menunjukkan tanda-tanda ketidaknyamanan.
            Munculnya reaksi alergi pada beberapa individu.
        `,
        referensi: [
            "Martinez, J. (2020). Freshwater Fish Diseases. Aquatic Health Press.",
            "Lee, C. (2019). Understanding Fish Behavior. Fishery Science Publications."
        ],
    },
    {
        id: 5,
        title: 'Penyakit Kembung Perut',
        date: '05/10/2024',
        image: pyl5,
        indikasi: `
            Lele terlihat memiliki perut yang membesar dan tampak tidak nyaman.
            Lele sering mengapung atau tenggelam.
            Perilaku makan menjadi tidak teratur.
        `,
        penyebab: `
            Dapat disebabkan oleh pakan yang berkualitas buruk atau berlebihan.
            Infeksi bakteri yang mempengaruhi sistem pencernaan.
            Stres akibat lingkungan yang tidak stabil.
        `,
        penanganan: `
            Segera perbaiki kualitas pakan dan kurangi jumlah pakan.
            Tambahkan obat probiotik untuk memperbaiki flora usus.
            Perbaiki kualitas air kolam untuk mengurangi stres.
        `,
        pencegahan: `
            Gunakan pakan yang baik dan sesuai dengan kebutuhan lele.
            Rutin memeriksa kondisi kesehatan lele dan kualitas air.
            Menjaga kepadatan ikan di kolam agar tidak berlebihan.
        `,
        gejalaTambahan: `
            Lele mungkin menunjukkan tanda-tanda stres seperti berenang tidak teratur.
            Kemungkinan munculnya masalah pernapasan jika infeksi berkembang.
        `,
        referensi: [
            "White, A. (2021). Nutrition and Feeding of Fish. Aquaculture Press.",
            "Robinson, M. (2020). The Impact of Water Quality on Fish Health. Fishery Science Journal."
        ],
    },
    {
        id: 6,
        title: 'Penyakit Berjamur pada Insang',
        date: '06/10/2024',
        image: pyl6,
        indikasi: `
            Insang lele terlihat berwarna putih dan berjamur.
            Lele tampak kesulitan bernapas dan sering mengangkat kepala ke permukaan.
            Nafsu makan lele berkurang drastis.
        `,
        penyebab: `
            Kualitas air yang buruk dan adanya kontaminasi.
            Cedera pada insang akibat kepadatan ikan yang tinggi.
            Infeksi jamur yang berkembang pesat.
        `,
        penanganan: `
            Tingkatkan kualitas air dan kurangi kepadatan ikan.
            Gunakan obat antijamur untuk merawat insang lele.
            Pastikan kondisi kolam selalu bersih.
        `,
        pencegahan: `
            Rutin memeriksa kualitas air dan menjaga kebersihan kolam.
            Menghindari kepadatan ikan yang berlebihan untuk mengurangi risiko infeksi.
            Perhatikan pakan agar tidak ada sisa yang menumpuk di kolam.
        `,
        gejalaTambahan: `
            Lele menunjukkan kesulitan bernapas dengan mulut terbuka.
            Perubahan perilaku lele menjadi lebih pemurung.
        `,
        referensi: [
            "Clark, J. (2019). Fish Pathology: A Practical Guide. Aquatic Health Publications.",
            "Parker, S. (2020). Fish Disease Management: Strategies and Treatments. Fisheries Research Institute."
        ],
    },
    {
        id: 7,
        title: 'Penyakit Keracunan Ammonia',
        date: '07/10/2024',
        image: pyl7,
        indikasi: `
            Lele tampak lesu dan berperilaku tidak normal.
            Insang terlihat pucat dan kulit bisa mengalami iritasi.
            Lele menghabiskan lebih banyak waktu di permukaan kolam.
        `,
        penyebab: `
            Kualitas air yang buruk dan tingkat ammonia yang tinggi.
            Penumpukan kotoran dan sisa pakan di kolam.
            Perubahan mendadak dalam parameter air.
        `,
        penanganan: `
            Segera lakukan penggantian air untuk menurunkan kadar ammonia.
            Gunakan zeolit atau bahan penyerap ammonia lainnya.
            Periksa kualitas air secara rutin untuk mencegah masalah ini.
        `,
        pencegahan: `
            Rutin membersihkan kolam dan melakukan penggantian air.
            Pastikan sisa pakan dan kotoran dibersihkan.
            Memeriksa kualitas air secara berkala untuk menghindari akumulasi ammonia.
        `,
        gejalaTambahan: `
            Lele bisa menunjukkan reaksi stres seperti bersembunyi.
            Munculnya bercak-bercak kemerahan pada kulit.
        `,
        referensi: [
            "Adams, B. (2021). Water Quality Management in Aquaculture. Fishery Science Journal.",
            "Chen, L. (2020). Understanding Fish Physiology and Behavior. Aquaculture Press."
        ],
    },
    {
        id: 8,
        title: 'Penyakit Lesi Kulit',
        date: '08/10/2024',
        image: pyl8,
        indikasi: `
            Munculnya luka terbuka atau lesi di tubuh lele.
            Perilaku ikan tampak lesu dan tidak aktif.
            Lele tampak menghindar dari interaksi dengan ikan lain.
        `,
        penyebab: `
            Infeksi bakteri atau parasit yang menyebabkan kerusakan jaringan.
            Kualitas air yang buruk dan stres akibat lingkungan.
            Cedera akibat gesekan dengan benda tajam di kolam.
        `,
        penanganan: `
            Bersihkan kolam dan lakukan penggantian air.
            Gunakan antibiotik atau obat khusus untuk infeksi.
            Periksa kualitas air untuk mencegah infeksi lebih lanjut.
        `,
        pencegahan: `
            Jaga kebersihan kolam dan perhatikan kepadatan ikan.
            Periksa kolam secara rutin untuk menghindari luka.
            Lakukan pemantauan kesehatan ikan untuk mendeteksi gejala lebih awal.
        `,
        gejalaTambahan: `
            Lele mungkin menunjukkan perubahan perilaku seperti bersembunyi.
            Luka dapat mengeluarkan nanah atau cairan.
        `,
        referensi: [
            "Green, D. (2018). Fish Health and Disease Management. Aquatic Health Press.",
            "Sanchez, R. (2020). Aquaculture Practices and Fish Health. Fishery Science Publications."
        ],
    },
    {
        id: 9,
        title: 'Penyakit Stres',
        date: '09/10/2024',
        image: pyl9,
        indikasi: `
            Lele tampak lesu dan tidak aktif.
            Perilaku ikan tampak berubah, seperti bersembunyi.
            Nafsu makan lele berkurang drastis.
        `,
        penyebab: `
            Kualitas air yang buruk, termasuk perubahan suhu dan pH yang drastis.
            Kepadatan ikan yang berlebihan dan lingkungan yang tidak stabil.
            Faktor eksternal seperti suara keras atau perubahan cahaya.
        `,
        penanganan: `
            Perbaiki kondisi lingkungan dan kualitas air kolam.
            Berikan pakan yang tepat dan jangan berlebihan.
            Berikan waktu untuk lele beradaptasi dengan lingkungan baru.
        `,
        pencegahan: `
            Pastikan kualitas air stabil dan sesuai dengan kebutuhan lele.
            Perhatikan kepadatan ikan agar tidak berlebihan.
            Lakukan pemeriksaan rutin untuk mendeteksi gejala stres.
        `,
        gejalaTambahan: `
            Lele mungkin menunjukkan reaksi agresif atau ketakutan.
            Perilaku abnormal seperti melawan arus atau berputar-putar.
        `,
        referensi: [
            "Thompson, E. (2021). The Effects of Stress on Fish Health. Aquaculture Research Journal.",
            "Harris, G. (2020). Stress Management in Aquaculture. Fisheries Science Institute."
        ],
    },
];

export default articlesData;