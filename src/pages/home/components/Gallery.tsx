import React from 'react';
import { motion } from 'framer-motion';

interface Service {
    title: string;
    count: string;
    image: string;
    icon: string;
}

const services: Service[] = [
    {
        title: 'Photography',
        count: '245+ Experts',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80',
        icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
    },
    {
        title: 'Honeymoon/Planning',
        count: '120+ Packages',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
        icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
    },
    {
        title: 'Decoration',
        count: '500+ Themes',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
        title: 'Jewellery',
        count: '350+ Stores',
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=80',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
];

const Gallery: React.FC = () => {
    return (
        <div className="py-20 bg-gray-900 rounded-[3rem] p-12 shadow-2xl overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

            <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative z-10">
                <div className="space-y-4">
                    <h2 className="text-4xl font-serif text-white tracking-tight">Our Wedding Services!</h2>
                    <div className="w-24 h-1 bg-amber-500" />
                </div>
                <div className="flex gap-4 mt-8 md:mt-0">
                    <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:bg-amber-500 hover:text-white transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar relative z-10">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -15 }}
                        className="shrink-0 w-[240px] md:w-[280px] bg-white/5 backdrop-blur-sm rounded-[2.5rem] p-4 border border-white/10 group cursor-pointer"
                    >
                        <div className="relative h-[280px] rounded-[2rem] overflow-hidden mb-6">
                            <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white font-bold text-lg leading-tight tracking-tight">{service.title}</p>
                                <p className="text-amber-400 text-xs font-bold mt-1 uppercase tracking-widest">{service.count}</p>
                            </div>
                        </div>
                        <div className="flex justify-center pb-2">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-amber-500 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination/Dots as seen in image */}
            <div className="flex justify-center items-center gap-4 mt-8 relative z-10">
                <span className="text-white/40 text-sm font-bold">01</span>
                <div className="w-48 h-1 bg-white/10 rounded-full relative">
                    <div className="absolute h-full w-1/4 bg-amber-500 rounded-full left-0 transition-all" />
                </div>
                <span className="text-white text-sm font-bold">04</span>
            </div>
        </div>
    );
};

export default Gallery;
