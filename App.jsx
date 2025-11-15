import React, { useState } from 'react';
import { Coffee, GraduationCap, DollarSign, Users, Info, Menu, X, Star, Facebook, Instagram, Linkedin, Calendar, Zap, Smartphone } from 'lucide-react';

// --- MOCK DATA ---
const TRAINERS = [
  { 
    name: "Alex Chen", 
    title: "Head Barista & Roaster", 
    bio: "Alex is a certified Q Grader with 10 years of experience in specialty coffee sourcing and roasting. Known for his technical precision in espresso.", 
    imageUrl: "https://placehold.co/400x400/8B4513/FFFFFF?text=Alex+Q+Grader" 
  },
  { 
    name: "Sarah Kim", 
    title: "Latte Art Champion", 
    bio: "Sarah won the national Latte Art Championship in 2022. She specializes in teaching complex pouring techniques and milk texturing science.", 
    imageUrl: "https://placehold.co/400x400/694A3D/FFFFFF?text=Sarah+Latte+Art" 
  },
  { 
    name: "Marcus Bell", 
    title: "Operations & Brewing Expert", 
    bio: "Marcus focuses on café efficiency, inventory management, and diverse manual brewing methods (V60, Chemex, Aeropress).", 
    imageUrl: "https://placehold.co/400x400/A0522D/FFFFFF?text=Marcus+Brewing" 
  },
];

const COURSES = [
  { 
    id: 'basic', 
    title: "Basic Barista Fundamentals", 
    duration: "2 Days (16 hrs)", 
    price: 399,
    features: ["Espresso machine basics", "Milk steaming & pouring", "Grinder calibration", "4 classic drinks"],
    image: "https://placehold.co/800x600/964B00/FFFFFF?text=Perfect+Espresso+Shot" 
  },
  { 
    id: 'intermediate', 
    title: "Advanced Brewing & Latte Art", 
    duration: "3 Days (24 hrs)", 
    price: 699,
    features: ["Advanced milk texturing", "3 Latte Art patterns (Rosetta, Tulip, Heart)", "Manual brewing methods", "Troubleshooting espresso"],
    image: "https://placehold.co/800x600/6F4E37/FFFFFF?text=Advanced+Latte+Art" 
  },
  { 
    id: 'master', 
    title: "Professional Roasting & Operations", 
    duration: "5 Days (40 hrs)", 
    price: 1199,
    features: ["Green bean sourcing basics", "Roasting theory & profiling", "Cafe management & efficiency", "Sensory analysis (Cupping)"],
    image: "https://placehold.co/800x600/A0522D/FFFFFF?text=Sensory+Cupping+Session" 
  },
];

const PRICING = [
    { level: 'Basic', courses: COURSES.slice(0, 1), features: ["Foundational skills", "Certificate of Completion"], callToAction: "Start Brewing" },
    { level: 'Pro', courses: COURSES.slice(0, 2), features: ["All Basic & Intermediate skills", "Latte Art Mastery", "1-on-1 Trainer Review"], callToAction: "Level Up" },
    { level: 'Master', courses: COURSES, features: ["All courses included", "Q-Grader preparation module", "Job placement assistance", "Lifetime community access"], callToAction: "Become an Expert" },
];

const BATCHES = [
    { id: 1, courseId: 'basic', date: 'October 12-13, 2024', quota: 3, total: 10 },
    { id: 2, courseId: 'intermediate', date: 'October 25-27, 2024', quota: 1, total: 8 },
    { id: 3, courseId: 'master', date: 'November 4-8, 2024', quota: 5, total: 10 },
    { id: 4, courseId: 'basic', date: 'November 16-17, 2024', quota: 0, total: 10 }, // Sold out example
];


// --- CORE COMPONENTS ---

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
    { label: 'Home', page: 'home', icon: Coffee },
    { label: 'Courses', page: 'courses', icon: GraduationCap },
    { label: 'Upcoming', page: 'upcoming', icon: Calendar }, // New link
    { label: 'Pricing', page: 'pricing', icon: DollarSign },
    { label: 'Trainers', page: 'trainers', icon: Users },
    { label: 'About Us', page: 'about', icon: Info },
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
              <span className="text-amber-500">Bean</span> Academy
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

const Footer = () => (
    <footer className="bg-stone-800 text-stone-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} Bean Academy. Brewed with Passion.</p>
            
            {/* Social Media Links */}
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
                <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
                <span className="text-stone-600">|</span>
                <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
            </div>
        </div>
    </footer>
);

// --- PAGE COMPONENTS ---

const HomePage = ({ setPage }) => (
  <main className="pt-16 md:pt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center mb-20 bg-stone-800 p-8 md:p-16 rounded-3xl shadow-2xl">
        <p className="text-amber-500 uppercase tracking-widest text-sm mb-2 font-semibold">Master the Art of Coffee</p>
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
          From Bean to <span className="text-amber-500">Barista</span> Excellence
        </h2>
        <p className="text-stone-300 text-lg max-w-3xl mx-auto mb-8">
          Unlock your potential with hands-on training from world-class coffee experts. Whether you're starting a career or perfecting your home brew, we have the course for you.
        </p>
        <button 
          onClick={() => setPage('courses')}
          className="bg-amber-600 text-stone-900 font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:bg-amber-500 transform transition-all duration-300 hover:scale-105"
        >
          View Courses
        </button>
      </section>

      {/* Why Choose Us */}
      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="p-6 bg-stone-800 rounded-2xl shadow-lg border-t-4 border-amber-500">
          <GraduationCap className="w-8 h-8 text-amber-500 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Hands-On Learning</h3>
          <p className="text-stone-400">Train exclusively on professional-grade equipment in small class sizes for maximum practice.</p>
        </div>
        <div className="p-6 bg-stone-800 rounded-2xl shadow-lg border-t-4 border-amber-500">
          <Star className="w-8 h-8 text-amber-500 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Certified Trainers</h3>
          <p className="text-stone-400">Learn from Q Graders and Latte Art Champions who bring real-world experience.</p>
        </div>
        <div className="p-6 bg-stone-800 rounded-2xl shadow-lg border-t-4 border-amber-500">
          <Coffee className="w-8 h-8 text-amber-500 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Industry Recognition</h3>
          <p className="text-stone-400">Our certificates are recognized globally, opening doors to top coffee careers.</p>
        </div>
      </section>

      {/* Image Showcase */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12">
        <img 
          src="https://placehold.co/1200x500/A0522D/FFFFFF?text=Expert+Barista+Training+In+Action" 
          alt="Barista pouring latte art" 
          className="w-full h-auto object-cover"
          onerror="this.onerror=null; this.src='https://placehold.co/1200x500/A0522D/FFFFFF?text=Barista+Training';"
        />
        <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center">
            <h3 className="text-white text-3xl font-bold">Your Journey Starts Here</h3>
        </div>
      </div>

    </div>
  </main>
);

const CoursesPage = () => (
  <main className="pt-12 md:pt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-amber-500 mb-4 text-center">Our Curriculum</h2>
      <p className="text-xl text-stone-300 mb-12 text-center max-w-3xl mx-auto">
        Choose your path to coffee mastery. Each course is designed to be comprehensive and practical.
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
                View Batches
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
    const phoneNumber = "6281234567890"; // Example Indonesian WhatsApp number (Replace with actual number)
    const whatsappBaseUrl = `https://wa.me/${phoneNumber}?text=Hello!%20I%20am%20interested%20in%20enrolling%20in%20your%20course%20batches%20I%20saw%20on%20the%20website.`;

    const handleWhatsappClick = (courseTitle, date) => {
        const message = `Hello, I would like to inquire about registering for the *${courseTitle}* course batch on *${date}*. Is the quota still available?`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <main className="pt-12 md:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-amber-500 mb-4 text-center">Upcoming Course Batches</h2>
                <p className="text-xl text-stone-300 mb-12 text-center max-w-3xl mx-auto">
                    Secure your spot early! Our small class sizes fill up quickly to ensure maximum attention for every student.
                </p>

                <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    {BATCHES.map(batch => {
                        const course = getCourse(batch.courseId);
                        const isSoldOut = batch.quota <= 0;
                        
                        // Calculate quota color
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
                                        <span>**Date:** {batch.date}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Zap className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                                        <span className={`font-bold ${quotaColor}`}>
                                            **Quota:** {isSoldOut ? 'SOLD OUT' : `${batch.quota} spots left (${batch.total} total)`}
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
                                    <span>{isSoldOut ? 'Fully Booked' : 'Inquire via WhatsApp'}</span>
                                </button>
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-12 p-6 text-center bg-stone-800 rounded-2xl shadow-inner">
                    <h3 className="text-2xl font-bold text-white mb-2">Need a Custom Batch?</h3>
                    <p className="text-stone-400 mb-4">Contact us directly for group bookings or private training dates.</p>
                    <a 
                        href={whatsappBaseUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-amber-600 text-stone-900 font-bold py-3 px-6 rounded-full text-lg hover:bg-amber-500 transition-colors"
                    >
                        <Smartphone className="w-5 h-5"/>
                        <span>Chat Now (WhatsApp)</span>
                    </a>
                </div>
            </div>
        </main>
    );
};


const PricingPage = () => (
    <main className="pt-12 md:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-amber-500 mb-4 text-center">Flexible Learning Packages</h2>
            <p className="text-xl text-stone-300 mb-12 text-center max-w-3xl mx-auto">
                Tailor your education to your career goals with our structured plans.
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
                            {index === 1 && <span className="mr-2 text-white bg-amber-600 px-2 py-1 rounded-full text-xs">BEST VALUE</span>}
                            {plan.level}
                        </p>
                        <h3 className="text-3xl font-extrabold text-white mb-4">
                            ${plan.courses.reduce((sum, c) => sum + c.price, 0)}{index === 2 && '*'}
                        </h3>
                        <p className="text-stone-300 mb-6">
                            Includes: {plan.courses.map(c => c.title).join(', ')}
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
                        {index === 2 && <p className="text-stone-500 text-xs mt-3">*Savings calculated compared to purchasing individually.</p>}
                    </div>
                ))}
            </div>
        </div>
    </main>
);

const TrainerPage = () => (
  <main className="pt-12 md:pt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-amber-500 mb-4 text-center">Meet Our Expert Trainers</h2>
      <p className="text-xl text-stone-300 mb-12 text-center max-w-3xl mx-auto">
        Learn from the best in the industry. Our team consists of competition winners, certified graders, and cafe operators.
      </p>

      <div className="grid gap-10 md:grid-cols-3">
        {TRAINERS.map(trainer => (
          <div key={trainer.name} className="bg-stone-800 rounded-2xl shadow-2xl p-6 text-center">
            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-amber-500/50">
              <img 
                src={trainer.imageUrl} 
                alt={trainer.name} 
                className="w-full h-full object-cover" 
                onerror="this.onerror=null; this.src='https://placehold.co/400x400/8B4513/FFFFFF?text=Trainer';"
              />
            </div>
            <h3 className="text-2xl font-bold text-white">{trainer.name}</h3>
            <p className="text-amber-500 font-semibold mb-4">{trainer.title}</p>
            <p className="text-stone-300 text-sm italic">{trainer.bio}</p>
            <button className="mt-4 text-amber-500 hover:text-amber-400 transition-colors flex items-center justify-center mx-auto text-sm font-medium">
                <Info className="w-4 h-4 mr-1"/> Full Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  </main>
);

const AboutPage = () => (
  <main className="pt-12 md:pt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-amber-500 mb-4 text-center">Our Mission</h2>
      <div className="grid lg:grid-cols-2 gap-12 bg-stone-800 p-8 md:p-12 rounded-3xl shadow-2xl">
        
        {/* Mission Text */}
        <div className="lg:pr-8">
          <p className="text-stone-300 text-lg mb-6 leading-relaxed">
            Founded in 2015, **Bean Academy** was created with a singular focus: to elevate the standard of professional coffee making globally. We believe that great coffee starts with great education. We are dedicated to providing comprehensive, ethical, and hands-on training that respects the entire coffee supply chain, from farmer to cup.
          </p>
          <h3 className="text-2xl font-bold text-white mb-3">Our Core Values</h3>
          <ul className="space-y-3 text-stone-300">
            <li className="flex items-start"><Star className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" /> **Quality:** Uncompromising commitment to the best beans and equipment.</li>
            <li className="flex items-start"><Star className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" /> **Practicality:** Focus on real-world, applicable café skills.</li>
            <li className="flex items-start"><Star className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" /> **Community:** Fostering a global network of passionate coffee professionals.</li>
          </ul>
        </div>
        
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img 
            src="https://placehold.co/800x600/A0522D/FFFFFF?text=Ethical+Sourcing+Beans" 
            alt="Coffee beans being sorted" 
            className="w-full h-full object-cover"
            onerror="this.onerror=null; this.src='https://placehold.co/800x600/A0522D/FFFFFF?text=Our+Coffee+Ethos';"
          />
        </div>
      </div>
      
    </div>
  </main>
);

// --- MAIN APPLICATION ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setPage={setCurrentPage} />;
      case 'courses':
        return <CoursesPage />;
      case 'upcoming': // New case for Upcoming Batches
        return <UpcomingPage />;
      case 'pricing':
        return <PricingPage />;
      case 'trainers':
        return <TrainerPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 font-sans antialiased">
      {/* Load Tailwind CSS */}
      <script src="https://cdn.tailwindcss.com"></script>
      
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      
      <div className="min-h-[70vh]">
        {renderPage()}
      </div>

      <Footer />
    </div>
  );
}

