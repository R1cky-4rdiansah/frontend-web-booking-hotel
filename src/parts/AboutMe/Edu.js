import React from "react";

const data = [
  {
    location: "Universitas Duta Bangsa",
    profesi: "D3 Teknik Komputer",
    year: "2018 - 21",
    text: " Belajar dan latihan dalam bidang teknik komputer. Jurusan ini mencakup berbagai aspek teknologi komputer, termasuk pemrograman, jaringan komputer, sistem komputer, kecerdasan buatan, robotika, dan banyak lagi. Lulus 3 tahun dengan predikat cumlaude.",
  },
  {
    location: "BPS Klaten",
    profesi: "Staf BPS",
    year: "September - Nov 2020",
    text: "  Mengumpulkan data dari berbagai sumber, baik melalui survei lapangan, wawancara, atau pengumpulan data dari lembaga atau organisasi lain. Menyajikan data statistik secara visual dan deskriptif menggunakan tabel, grafik, dan laporan untuk memudahkan pemahaman dan pengambilan keputusan.",
  },
  {
    location: "Regarsport",
    profesi: "Staf IT",
    year: "2022 - Sekarang",
    text: "  Mengembangkan, menguji, dan memelihara web kustom sesuai kebutuhan organisasi, serta memperbarui dan meningkatkan perangkat lunak yang ada. Mengelola proyek pengembangan sistem baru, mulai dari perencanaan hingga implementasi, termasuk koordinasi dengan departemen lain dan pelatihan pengguna.",
  },
];

const Edu = () => {
  return (
    <section className="wrapper-edu">
      <h1 className="title-about font-semibold mx-auto">
        <span className="text-prmary-blue">Education</span>{" "}
        <span className="text-primary-dark">&</span>{" "}
        <span className="text-primary-orange">Experience</span>
      </h1>
      <div className="grid-edu">
        {data.map((val, i) => (
          <div
            key={i}
            className="bg-white shadow-md p-3 flex flex-col gap-3 rounded-lg"
          >
            <div className="title-edu">
              <div>
                <h4 className="">
                  {val.location}
                </h4>
                <h6 className="">
                  {val.profesi}
                </h6>
              </div>
              <h6 className="">
                {val.year}
              </h6>
            </div>
            <p className="text-base text-secondary-gray indent-4 text-justify mb-0">
              {val.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Edu;
