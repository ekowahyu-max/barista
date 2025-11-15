import React, { useState } from 'react';
// Hapus semua baris di bawah ini dari file Anda:
// <script src="https://cdn.tailwindcss.com"></script>

import { Coffee, GraduationCap, DollarSign, Users, Info, Menu, X, Star, Facebook, Instagram, Linkedin, Calendar, Zap, Smartphone, Mail, Send, FlaskConical, Medal } from 'lucide-react';

// --- DATA TIRUAN (MOCK DATA) ---
const TRAINERS = [
  { 
    name: "Alex Chen", 
    title: "Kepala Barista & Roaster", 
    bio: "Alex adalah Q Grader bersertifikat dengan 10 tahun pengalaman dalam sumber dan roasting kopi spesialti. Dikenal karena presisi teknisnya dalam espresso.", 
    // URL Gambar yang lebih spesifik
    imageUrl: "https://placehold.co/400x400/8B4513/FFFBEB?text=Alex+Q+Grader" 
  },
  { 
    name: "Sarah Kim", 
    title: "Juara Latte Art", 
    bio: "Sarah memenangkan Kejuaraan Latte Art nasional pada tahun 2022. Dia berspesialisasi dalam mengajarkan teknik penuangan yang kompleks dan ilmu tekstur susu.", 
    // URL Gambar yang lebih spesifik
    imageUrl: "https://placehold.co/400x400/694A3D/FFFBEB?text=Sarah+Juara+Latte+Art" 
  },
  { 
    name: "Marcus Bell", 
    title: "Ahli Operasi & Menyeduh", 
    bio: "Marcus berfokus pada efisiensi kafe, manajemen inventaris, dan beragam metode penyeduhan manual (V60, Chemex, Aeropress).", 
    // URL Gambar yang lebih spesifik
    imageUrl: "https://placehold.co/400x400/A0522D/FFFBEB?text=Marcus+Ahli+Brewing" 
  },
];

const COURSES = [
  { 
    id: 'basic', 
    title: "Dasar-Dasar Barista Dasar", 
    duration: "2 Hari (16 jam)", 
    price: 399,
    features: ["Dasar mesin Espresso", "Penguapan & penuangan susu", "Kalibrasi grinder", "4 minuman klasik"],
    // Mock Gambar Kursus Dasar
    image: "https://placehold.co/800x600/964B00/FFFFFF?text=Barista+Sempurna+Espresso" 
  },
  { 
    id: 'intermediate', 
    title: "Menyeduh Lanjutan & Latte Art", 
    duration: "3 Hari (24 jam)", 
    price: 699,
    features: ["Tekstur susu lanjutan", "3 Pola Latte Art (Rosetta, Tulip, Hati)", "Metode penyeduhan manual", "Penyelesaian masalah espresso"],
    // Mock Gambar Kursus Lanjutan: Warna gelap, tekstur kayu
    image: "https://placehold.co/800x600/5A473E/FFFFFF?text=Latte+Art+Tulip+Mahir" 
  },
  { 
    id: 'master', 
    title: "Roasting & Operasi Profesional", 
    duration: "5 Hari (40 jam)", 
    price: 1199,
    features: ["Dasar sumber biji mentah", "Teori & profil Roasting", "Manajemen & efisiensi Kafe", "Analisis Sensorik (Cupping)"],
    // Mock Gambar Kursus Master
    image: "https://placehold.co/800x600/A0522D/FFFFFF?text=Sesi+Cupping+Profesional" 
  },
];

const PRICING = [
    { level: 'Dasar', courses: COURSES.slice(0, 1), features: ["Keterampilan dasar", "Sertifikat Kelulusan"], callToAction: "Mulai Menyeduh" },
    { level: 'Pro', courses: COURSES.slice(0, 2), features: ["Semua keterampilan Dasar & Menengah", "Mahir Latte Art", "Tinjauan 1-lawan-1 dengan Pelatih"], callToAction: "Tingkatkan Level" },
    { level: 'Master', courses: COURSES, features: ["Semua kursus termasuk", "Modul persiapan Q-Grader", "Bantuan penempatan kerja", "Akses komunitas seumur hidup"], callToAction: "Jadilah Ahli" },
];

const BATCHES = [
    { id: 1, courseId: 'basic', date: '12-13 Oktober 2024', quota: 3, total: 10 },
    { id: 2, courseId: 'intermediate', date: '25-27 Oktober 2024', quota: 1, total: 8 },
    { id: 3, courseId: 'master', date: '4-8 November 2024', quota: 5, total: 10 },
    { id: 4, courseId: 'basic', date: '16-17 November 2024', quota: 0, total: 10 }, // Sold out example
];


// --- KOMPONEN INTI ---

const NavItem = ({ label, icon: Icon, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center space-x-2 p-3 rounded-xl transition-colors duration-300 w-full text-left
      ${isActive 
        ? 'bg-amber-600 text-stone-900 font-bold shadow-lg' 
        : 'text-amber-100 hover:bg-stone-700 hover:text-amber-500'
      }
    `}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm md:text-base">{label}</span>
  </button>
);

const Header = ({ currentPage, setPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { label: 'Beranda', page: 'home', icon: Coffee },
    { label: 'Kursus', page: 'courses', icon: GraduationCap },
    { label: 'Jadwal', page: 'upcoming', icon: Calendar }, 
    { label: 'Harga', page: 'pricing', icon: DollarSign },
    { label: 'Pelatih', page: 'trainers', icon: Users },
    { label: 'Tentang Kami', page: 'about', icon: Info },
    { label: 'Kontak', page: 'contact', icon: Mail },
  ];

  const handleNavClick = (page) => {
    setPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-900/90 backdrop-blur-sm shadow-xl border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Coffee className="w-8 h-8 text-amber-500 mr-2" />
            <h1 className="text-2xl font-extrabold text-white tracking-wider">
              <span className="text-amber-500">Akademi Kopi</span> Bean
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {links.map(link => (
              <NavItem
                key={link.page}
                label={link.label}
                icon={link.icon}
                onClick={() => handleNavClick(link.page)}
                isActive={currentPage === link.page}
                className="w-auto p-2"
              />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-amber-500 p-2 rounded-lg hover:bg-stone-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-stone-900 pb-4`}>
        <div className="px-4 space-y-2">
          {links.map(link => (
            <NavItem
              key={link.page}
              label={link.label}
              icon={link.icon}
              onClick={() => handleNavClick(link.page)}
              isActive={currentPage === link.page}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

// CTA Mengambang untuk Seluler
const FloatingCta = ({ setPage }) => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-stone-900/90 backdrop-blur-sm border-t border-amber-500/50 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
        <button
            onClick={() => setPage('upcoming')}
            className="w-full flex items-center justify-center space-x-2 bg-amber-600 text-stone-900 font-extrabold py-3 px-4 rounded-xl text-lg shadow-xl hover:bg-amber-500 transition-colors transform hover:scale-[1.01]"
        >
            <Calendar className="w-6 h-6" />
            <span>Cek Jadwal Mendatang</span>
        </button>
    </div>
);

const Footer = () => (
    <footer className="bg-stone-800 text-stone-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} Akademi Kopi Bean. Diseduh dengan Semangat.</p>
            
            {/* Tautan Media Sosial */}
            <div className="flex justify-center space-x-6 mt-4 mb-4">
                <a href="#" aria-label="Facebook" className="text-stone-400 hover:text-amber-500 transition-colors">
                    <Facebook className="w-6 h-6" />
                </a>
                <a href="#" aria-label="Instagram" className="text-stone-400 hover:text-amber-500 transition-colors">
                    <Instagram className="w-6 h-6" />
                </a>
                <a href="#" aria-label="LinkedIn" className="text-stone-400 hover:text-amber-500 transition-colors">
                    <Linkedin className="w-6 h-6" />
                </a>
            </div>

            <div className="flex justify-center space-x-4 mt-2">
                <a href="#" className="hover:text-amber-500 transition-colors">Kebijakan Privasi</a>
                <span className="text-stone-600">|</span>
                <a href="#" className="hover:text-amber-500 transition-colors">Syarat Layanan</a>
            </div>
        </div>
    </footer>
);

// --- KOMPONEN HALAMAN ---

const HomePage = ({ setPage }) => (
  <main className="pt-16 md:pt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Bagian Hero */}
      <section className="text-center mb-20 bg-stone-800 p-8 md:p-16 rounded-3xl shadow-2xl">
        <p className="text-amber-500 uppercase tracking-widest text-sm mb-2 font-semibold">Kuasai Seni Kopi</p>
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
          Dari Biji ke <span className="text-amber-500">Keunggulan Barista</span>
        </h2>
        <p className="text-stone-300 text-lg max-w-3xl mx-auto mb-8">
          Buka potensi Anda dengan pelatihan langsung dari para ahli kopi kelas dunia. Baik Anda memulai karir atau menyempurnakan seduhan rumahan Anda, kami memiliki kursus yang tepat.
        </p>
        <button 
          onClick={() => setPage('courses')}
          className="bg-amber-600 text-stone-900 font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:bg-amber-500 transform transition-all duration-300 hover:scale-105"
        >
          Lihat Kursus
        </button>
      </section>

      {/* Mengapa Memilih Kami - Ikon Diperbarui */}
      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="p-6 bg-stone-800 rounded-2xl shadow-lg border-t-4 border-amber-500">
          {/* Ikon baru: Menunjukkan eksperimen dan teknik */}
          <FlaskConical className="w-8 h-8 text-amber-500 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Pembelajaran Praktis</h3>
          <p className="text-stone-400">Berlatih secara eksklusif menggunakan peralatan kelas profesional dalam ukuran kelas kecil untuk latihan maksimal.</p>
        </div>
        <div className="p-6 bg-stone-800 rounded-2xl shadow-lg border-t-4 border-amber-500">
           {/* Ikon baru: Menunjukkan penghargaan dan kualitas */}
          <Medal className="w-8 h-8 text-amber-500 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Pelatih Bersertifikat</h3>
          <p className="text-stone-400">Belajar dari Q Graders dan Juara Latte Art yang membawa pengalaman dunia nyata.</p>
        </div>
        <div className="p-6 bg-stone-800 rounded-2xl shadow-lg border-t-4 border-amber-500">
           {/* Ikon baru: Menunjukkan jaringan dan pengakuan industri */}
          <Users className="w-8 h-8 text-amber-500 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Pengakuan Industri</h3>
          <p className="text-stone-400">Sertifikat kami diakui secara global, membuka pintu untuk karir kopi terbaik.</p>
        </div>
      </section>

      {/* Tampilan Gambar Hero - Diperbarui */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12">
        <img 
          // Mock URL yang lebih deskriptif
          src="https://placehold.co/1200x500/A0522D/FFFFFF?text=Barista+Menuang+Latte+Art+Gaya+Profesional" 
          alt="Barista menuangkan latte art" 
          className="w-full h-auto object-cover"
          onerror="this.onerror=null; this.src='https://placehold.co/1200x500/A0522D/FFFFFF?text=Pelatihan+Barista';"
        />
        <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center">
            <h3 className="text-white text-3xl font-bold">Perjalanan Anda Dimulai Di Sini</h3>
        </div>
      </div>

    </div>
  </main>
);

const CoursesPage = () => (
  <main className="pt-12 md:pt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-amber-500 mb-4 text-center">Kurikulum Kami</h2>
      <p className="text-xl text-stone-300 mb-12 text-center max-w-3xl mx-auto">
        Pilih jalur Anda menuju penguasaan kopi. Setiap kursus dirancang agar komprehensif dan praktis.
      </p>

      <div className="grid gap-10 lg:grid-cols-3">
        {COURSES.map(course => (
          <div key={course.id} className="bg-stone-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]">
            <div className="h-48 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover"
                onerror="this.onerror=null; this.src='https://placehold.co/800x600/6F4E37/FFFFFF?text=Course+Image';"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
              <div className="flex justify-between items-center mb-4 text-amber-500 font-semibold">
                <span>{course.duration}</span>
                <span className="text-3xl">${course.price}</span>
              </div>
              <ul className="space-y-2 text-stone-300 mb-6">
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="w-4 h-4 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-amber-600 text-stone-900 font-bold py-3 rounded-xl hover:bg-amber-500 transition-colors">
                Lihat Jadwal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);

const UpcomingPage = () => {
    const getCourse = (id) => COURSES.find(c => c.id === id);
    const phoneNumber = "6281234567890"; // Contoh nomor WhatsApp Indonesia
    const whatsappBaseUrl = `https://wa.me/${phoneNumber}?text=Halo!%20Saya%20tertarik%20untuk%20mendaftar%20di%20batch%20kursus%20Anda%20yang%20saya%20lihat%20di%20website.`;

    const handleWhatsappClick = (courseTitle, date) => {
        const message = `Halo, saya ingin bertanya tentang pendaftaran untuk kursus *${courseTitle}* batch tanggal *${date}*. Apakah kuota masih tersedia?`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <main className="pt-12 md:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-amber-500 mb-4 text-center">Jadwal Kursus Mendatang</h2>
                <p className="text-xl text-stone-300 mb-12 text-center max-w-3xl mx-auto">
                    Amankan tempat Anda lebih awal! Ukuran kelas kami yang kecil cepat terisi untuk memastikan perhatian maksimal bagi setiap siswa.
                </p>

                <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    {BATCHES.map(batch => {
                        const course = getCourse(batch.courseId);
                        const isSoldOut = batch.quota <= 0;
                        
                        // Menghitung warna kuota
                        let quotaColor = 'text-green-500';
                        if (batch.quota <= 3 && batch.quota > 0) quotaColor = 'text-yellow-500';
                        if (batch.quota === 1) quotaColor = 'text-red-500';
                        if (isSoldOut) quotaColor = 'text-stone-500';

                        return (
                            <div key={batch.id} className={`p-6 rounded-2xl shadow-xl transition-all duration-300 ${isSoldOut ? 'bg-stone-800/50 opacity-70' : 'bg-stone-800 hover:shadow-amber-500/20'}`}>
                                <h3 className={`text-2xl font-extrabold ${isSoldOut ? 'text-stone-500' : 'text-amber-500'} mb-2`}>
                                    {course.title}
                                </h3>
                                <p className="text-stone-300 mb-4">{course.duration} | ${course.price}</p>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-stone-300">
                                        <Calendar className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                                        <span>**Tanggal:** {batch.date}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Zap className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                                        <span className={`font-bold ${quotaColor}`}>
                                            **Kuota:** {isSoldOut ? '**PENUH**' : `${batch.quota} tempat tersisa (${batch.total} total)`}
                                        </span>
                                    </div>
                                </div>

                                <button 
                                    onClick={!isSoldOut ? () => handleWhatsappClick(course.title, batch.date) : null}
                                    disabled={isSoldOut}
                                    className={`w-full font-bold py-3 rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 
                                        ${isSoldOut 
                                            ? 'bg-stone-700 text-stone-400 cursor-not-allowed' 
                                            : 'bg-green-600 text-white hover:bg-green-500 transform transition-all duration-300 hover:scale-[1.01]'
                                        }`}
                                >
                                    <Smartphone className="w-5 h-5"/>
                                    <span>{isSoldOut ? 'Sudah Terisi Penuh' : 'Tanya via WhatsApp'}</span>
                                </button>
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-12 p-6 text-center bg-stone-800 rounded-2xl shadow-inner">
                    <h3 className="text-2xl font-bold text-white mb-2">Butuh Batch Khusus?</h3>
                    <p className="text-stone-400 mb-4">Hubungi kami langsung untuk pemesanan grup atau tanggal pelatihan privat.</p>
                    <a 
                        href={whatsappBaseUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-amber-600 text-stone-900 font-bold py-3 px-6 rounded-full text-lg hover:bg-amber-500 transition-colors"
                    >
                        <Smartphone className="w-5 h-5"/>
                        <span>Chat Sekarang (WhatsApp)</span>
                    </a>
                </div>
                {/* Tambahkan padding untuk CTA mengambang di seluler */}
                <div className="h-20 md:hidden"></div> 
            </div>
        </main>
    );
};


const PricingPage = () => (
    <main className="pt-12 md:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-amber-500 mb-4 text-center">Paket Belajar Fleksibel</h2>
            <p className="text-xl text-stone-300 mb-12 text-center max-w-3xl mx-auto">
                Sesuaikan pendidikan Anda dengan tujuan karir Anda melalui rencana terstruktur kami.
            </p>

            <div className="grid gap-8 lg:grid-cols-3">
                {PRICING.map((plan, index) => (
                    <div 
                        key={plan.level} 
                        className={`p-8 rounded-3xl shadow-2xl transition-all duration-300 border-4 
                            ${index === 1 
                                ? 'bg-amber-600/10 border-amber-500' 
                                : 'bg-stone-800 border-stone-700 hover:border-amber-500'
                            }
                        `}
                    >
                        <p className={`uppercase tracking-wider font-bold mb-2 ${index === 1 ? 'text-amber-500' : 'text-stone-400'}`}>
                            {index === 1 && <span className="mr-2 text-white bg-amber-600 px-2 py-1 rounded-full text-xs">NILAI TERBAIK</span>}
                            {plan.level}
                        </p>
                        <h3 className="text-3xl font-extrabold text-white mb-4">
                            ${plan.courses.reduce((sum, c) => sum + c.price, 0)}{index === 2 && '*'}
                        </h3>
                        <p className="text-stone-300 mb-6">
                            Termasuk: {plan.courses.map(c => c.title).join(', ')}
                        </p>

                        <ul className="space-y-3 text-stone-300 mb-8 min-h-[150px]">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <Star className={`w-4 h-4 mr-3 flex-shrink-0 ${index === 1 ? 'text-amber-500' : 'text-stone-400'}`} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full font-bold py-3 rounded-xl shadow-lg transition-colors
                            ${index === 1 
                                ? 'bg-amber-600 text-stone-900 hover:bg-amber-500' 
                                : 'bg-stone-600 text-white hover:bg-stone-500'
                            }`}
                        >
                            {plan.callToAction}
                        </button>
                        {index === 2 && <p className="text-stone-500 text-xs mt-3">*Penghematan dihitung dibandingkan pembelian perorangan.</p>}
                    </div>
                ))}
            </div>
            {/* Tambahkan padding untuk CTA mengambang di seluler */}
            <div className="h-20 md:hidden"></div> 
        </div>
    </main>
);

const TrainerPage = () => (
  <main className="pt-12 md:pt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-amber-500 mb-4 text-center">Temui Pelatih Ahli Kami</h2>
      <p className="text-xl text-stone-300 mb-12 text-center max-w-3xl mx-auto">
        Belajar dari yang terbaik di industri. Tim kami terdiri dari pemenang kompetisi, grader bersertifikat, dan operator kafe.
      </p>

      <div className="grid gap-10 md:grid-cols-3">
        {TRAINERS.map(trainer => (
          <div key={trainer.name} className="bg-stone-800 rounded-2xl shadow-2xl p-6 text-center">
            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-amber-500/50">
              <img 
                src={trainer.imageUrl} 
                alt={trainer.name} 
                className="w-full h-full object-cover" 
                onerror="this.onerror=null; this.src='https://placehold.co/400x400/8B4513/FFFFFF?text=Pelatih';"
              />
            </div>
            <h3 className="text-2xl font-bold text-white">{trainer.name}</h3>
            <p className="text-amber-500 font-semibold mb-4">{trainer.title}</p>
            <p className="text-stone-300 text-sm italic">{trainer.bio}</p>
            <button className="mt-4 text-amber-500 hover:text-amber-400 transition-colors flex items-center justify-center mx-auto text-sm font-medium">
                <Info className="w-4 h-4 mr-1"/> Profil Lengkap
            </button>
          </div>
        ))}
      </div>
      {/* Tambahkan padding untuk CTA mengambang di seluler */}
      <div className="h-20 md:hidden"></div> 
    </div>
  </main>
);

const AboutPage = () => (
  <main className="pt-12 md:pt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-amber-500 mb-4 text-center">Misi Kami</h2>
      <div className="grid lg:grid-cols-2 gap-12 bg-stone-800 p-8 md:p-12 rounded-3xl shadow-2xl">
        
        {/* Misi Text */}
        <div className="lg:pr-8">
          <p className="text-stone-300 text-lg mb-6 leading-relaxed">
            Didirikan pada tahun 2015, **Akademi Kopi Bean** diciptakan dengan fokus tunggal: untuk meningkatkan standar pembuatan kopi profesional secara global. Kami percaya bahwa kopi yang hebat dimulai dengan pendidikan yang hebat. Kami berdedikasi untuk memberikan pelatihan yang komprehensif, etis, dan praktis yang menghormati seluruh rantai pasokan kopi, dari petani hingga cangkir.
          </p>
          <h3 className="text-2xl font-bold text-white mb-3">Nilai Inti Kami</h3>
          <ul className="space-y-3 text-stone-300">
            <li className="flex items-start"><Star className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" /> **Kualitas:** Komitmen tanpa kompromi terhadap biji dan peralatan terbaik.</li>
            <li className="flex items-start"><Star className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" /> **Kepraktisan:** Fokus pada keterampilan kafe yang nyata dan dapat diterapkan.</li>
            <li className="flex items-start"><Star className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" /> **Komunitas:** Memelihara jaringan global profesional kopi yang bersemangat.</li>
          </ul>
        </div>
        
        {/* Gambar Tentang Kami - Diperbarui */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img 
            // Mock URL yang lebih deskriptif
            src="https://placehold.co/800x600/5A473E/FFFFFF?text=Biji+Kopi+Pilihan+Berkualitas" 
            alt="Biji kopi sedang disortir" 
            className="w-full h-full object-cover"
            onerror="this.onerror=null; this.src='https://placehold.co/800x600/5A473E/FFFFFF?text=Etos+Kopi+Kami';"
          />
        </div>
      </div>
      {/* Tambahkan padding untuk CTA mengambang di seluler */}
      <div className="h-20 md:hidden"></div> 
    </div>
  </main>
);

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Mengirim...');
        
        // --- Mock pengiriman formulir ---
        setTimeout(() => {
            console.log('Form Submitted:', form);
            setStatus('Terima kasih! Pesan Anda telah terkirim. Kami akan merespons dalam waktu 48 jam.');
            setForm({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <main className="pt-12 md:pt-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-amber-500 mb-4 text-center">Hubungi Kami</h2>
                <p className="text-xl text-stone-300 mb-12 text-center max-w-3xl mx-auto">
                    Punya pertanyaan tentang kursus, jadwal, atau pelatihan privat? Kirimkan kami pesan!
                </p>

                <div className="bg-stone-800 p-8 rounded-3xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-stone-300 mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-stone-700 text-white border border-stone-600 focus:border-amber-500 focus:ring-amber-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-1">Alamat Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-stone-700 text-white border border-stone-600 focus:border-amber-500 focus:ring-amber-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-stone-300 mb-1">Pesan Anda</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={form.message}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-stone-700 text-white border border-stone-600 focus:border-amber-500 focus:ring-amber-500 transition-colors"
                            ></textarea>
                        </div>
                        
                        {status && (
                            <p className={`text-center font-semibold ${status.includes('Terima kasih') ? 'text-green-400' : 'text-amber-400'}`}>
                                {status}
                            </p>
                        )}

                        <button 
                            type="submit"
                            disabled={status.includes('Mengirim')}
                            className="w-full flex items-center justify-center space-x-2 bg-amber-600 text-stone-900 font-bold py-3 rounded-xl shadow-lg hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5"/>
                            <span>{status.includes('Mengirim') ? 'Mengirim...' : 'Kirim Pesan'}</span>
                        </button>
                    </form>
                </div>
            </div>
            {/* Tambahkan padding untuk CTA mengambang di seluler */}
            <div className="h-20 md:hidden"></div> 
        </main>
    );
};

// --- APLIKASI UTAMA ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setPage={setCurrentPage} />;
      case 'courses':
        return <CoursesPage />;
      case 'upcoming': 
        return <UpcomingPage />;
      case 'pricing':
        return <PricingPage />;
      case 'trainers':
        return <TrainerPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 font-sans antialiased">
      {/* CATATAN: CDN Tailwind Dihapus di sini. Sekarang diimpor melalui src/main.jsx */}
      
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      
      <div className="min-h-[70vh]">
        {renderPage()}
      </div>

      <FloatingCta setPage={setCurrentPage} /> {/* CTA Stikcy untuk seluler */}
      <Footer />
    </div>
  );
}

