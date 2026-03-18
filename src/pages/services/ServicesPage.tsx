import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronLeft, Utensils, Scissors, Gem, MapPin, Sparkles, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import images from assets/auth exactly as requested
import cateringImg from '../../assets/auth/wedding-food.jpeg';
import mehendiImg from '../../assets/auth/wedding-mehndi.png';
import jewelleryImg from '../../assets/auth/wedding-jewellery.jpeg';
import venueImg from '../../assets/auth/wedding-venue.jpeg';
import decorImg from '../../assets/auth/wedding-decor.jpeg';
import invitationImg from '../../assets/auth/wedding-invitation.jpeg';

const servicesList = [
    {
        id: 'catering',
        title: 'Catering Services',
        description: 'Exquisite culinary experiences tailored for your special day.',
        image: cateringImg,
        icon: <Utensils size={24} className="text-amber-500" />,
        color: 'from-orange-500/20 to-amber-500/5'
    },
    {
        id: 'venue',
        title: 'Wedding Venue',
        description: 'Discover breathtaking locations for your dream celebration.',
        image: venueImg,
        icon: <MapPin size={24} className="text-rose-500" />,
        color: 'from-rose-500/20 to-pink-500/5'
    },
    {
        id: 'decor',
        title: 'Wedding Decor',
        description: 'Transform any space with our bespoke floral and thematic decorations.',
        image: decorImg,
        icon: <Sparkles size={24} className="text-purple-500" />,
        color: 'from-purple-500/20 to-fuchsia-500/5'
    },
    {
        id: 'jewellery',
        title: 'Bridal Jewellery',
        description: 'Timeless pieces to complete your perfect bridal look.',
        image: jewelleryImg,
        icon: <Gem size={24} className="text-emerald-500" />,
        color: 'from-emerald-500/20 to-teal-500/5'
    },
    {
        id: 'mehendi',
        title: 'Mehendi Artists',
        description: 'Intricate and beautiful henna designs by master artists.',
        image: mehendiImg,
        icon: <Scissors size={24} className="text-blue-500" />,
        color: 'from-blue-500/20 to-cyan-500/5'
    },
    {
        id: 'invitation',
        title: 'Invitations',
        description: 'Custom designed invitations to set the tone for your wedding.',
        image: invitationImg,
        icon: <Mail size={24} className="text-indigo-500" />,
        color: 'from-indigo-500/20 to-violet-500/5'
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const ServicesPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FDFBF2] font-sans selection:bg-rose-100 selection:text-rose-600">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-all"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-serif text-gray-900 tracking-tight">Premium Wedding Services</h1>
                        <p className="text-sm text-gray-500">Everything you need for your perfect day</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12 pb-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {servicesList.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            onClick={() => navigate(`/services/${service.id}`)}
                            className="group bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 cursor-pointer flex flex-col"
                        >
                            {/* Image Section */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-b ${service.color} opacity-60 mix-blend-multiply`} />
                                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl rotate-3 group-hover:-rotate-3 transition-transform">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-serif text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-500 flex-1 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Explore Vendors</span>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
};

export default ServicesPage;
