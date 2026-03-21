import React, { useRef, useCallback, useState, useEffect } from 'react';
import './ServicesSection.css';

interface Service {
    num: string;
    title: string;
    location: string;
    headline: string;
    desc: string;
    img: string;
}

const services: Service[] = [
    {
        num: '01', title: 'Event Management', location: 'Wedding Planning', headline: 'EVENT\nMANAGEMENT',
        desc: 'From grand sangeet nights to intimate vow ceremonies, our expert planners orchestrate every detail of your wedding journey.',
        img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200'
    },
    {
        num: '02', title: 'E-Invites', location: 'Digital Invitations', headline: 'E-INVITES',
        desc: 'Stunning digital invitations with animated motifs, RSVP tracking, and multilingual support for the modern Indian wedding.',
        img: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=1200'
    },
    {
        num: '03', title: 'Wedding Venues', location: 'Heritage & Luxury', headline: 'WEDDING\nVENUES',
        desc: 'Curated heritage palaces, luxury resorts, and intimate halls across India — the perfect backdrop for your forever moment.',
        img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200'
    },
    {
        num: '04', title: 'Food & Catering', location: 'Royal Cuisine', headline: 'FOOD &\nCATERING',
        desc: 'Multi-cuisine royal spreads — live counters, traditional thalis, and bespoke menus designed to delight every guest.',
        img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200'
    },
    {
        num: '05', title: 'Photography', location: 'Cinematic Moments', headline: 'PHOTOGRAPHY',
        desc: 'Cinematic storytelling by award-winning photographers capturing candid emotions, grand moments, and timeless memories.',
        img: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200'
    },
    {
        num: '06', title: 'Honeymoon Planning', location: 'Romantic Escapes', headline: 'HONEYMOON\nPLANNING',
        desc: 'Bespoke romantic getaways — from Maldivian villas to Swiss retreats — tailored for your dream post-wedding escape.',
        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200'
    },
    {
        num: '07', title: 'Decoration', location: 'Thematic Décor', headline: 'DECORATION',
        desc: 'Opulent floral mandaps, fairy-light canopies, and thematic décor transforming your venue into a dreamscape.',
        img: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1200'
    },
    {
        num: '08', title: 'Jewellery', location: 'Bridal Collection', headline: 'JEWELLERY',
        desc: 'Exquisite bridal collections — kundan, polki, temple gold, and diamond sets adding regal sparkle to your day.',
        img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200'
    },
    {
        num: '09', title: 'Mehndi', location: 'Henna Artistry', headline: 'MEHNDI',
        desc: 'Intricate henna artistry blending Rajasthani, Arabic, and contemporary patterns by India\'s finest artists.',
        img: 'https://images.unsplash.com/photo-1595981234058-a9302fb97229?w=1200'
    },
    {
        num: '10', title: 'Makeup', location: 'Bridal Glam', headline: 'MAKEUP',
        desc: 'Celebrity bridal makeovers — airbrush, HD, and traditional looks with premium products that let your radiance shine.',
        img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200'
    },
];

const AUTOPLAY_MS = 4500;
const WINDOW_OFFSETS = [-1, 0, 1, 2, 3, 4, 5];

interface FlyCard {
    img: string;
    top: number;
    left: number;
    w: number;
    h: number;
}

const ServicesSection: React.FC = () => {
    const [active, setActive] = useState(0);
    const [slideDir, setSlideDir] = useState(0); // 1 = next, -1 = prev
    const [flyOrigin, setFlyOrigin] = useState<number | null>(null);
    const [flyCard, setFlyCard] = useState<FlyCard | null>(null);
    const [progressKey, setProgressKey] = useState(0);

    const sectionRef = useRef<HTMLElement | null>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const autoRef = useRef<NodeJS.Timeout | null>(null);

    const current = services[active];

    /* ── Navigate ── */
    const goTo = useCallback((targetIdx: number, dir: number) => {
        if (targetIdx === active || slideDir !== 0) return;

        const originIndex = dir === 1 ? 1 : 0;
        const cardEl = cardsRef.current[originIndex];

        if (cardEl && sectionRef.current) {
            const cr = cardEl.getBoundingClientRect();
            const sr = sectionRef.current.getBoundingClientRect();
            setFlyCard({
                img: services[targetIdx].img,
                top: cr.top - sr.top,
                left: cr.left - sr.left,
                w: cr.width, h: cr.height,
            });
        }

        setSlideDir(dir);
        setFlyOrigin(originIndex);

        setTimeout(() => {
            setActive(targetIdx);
            setSlideDir(0);
            setFlyOrigin(null);
            setFlyCard(null);
            setProgressKey(k => k + 1);
        }, 850);
    }, [active, slideDir]);

    const goNext = useCallback(() => {
        const next = (active + 1) % services.length;
        goTo(next, 1);
    }, [active, goTo]);

    const goPrev = useCallback(() => {
        const prev = (active - 1 + services.length) % services.length;
        goTo(prev, -1);
    }, [active, goTo]);

    /* ── Auto-scroll ── */
    const resetAuto = useCallback(() => {
        if (autoRef.current) clearInterval(autoRef.current);
        setProgressKey(k => k + 1);
        autoRef.current = setInterval(() => {
            const next = (active + 1) % services.length;
            goTo(next, 1);
        }, AUTOPLAY_MS);
    }, [active, goTo]);

    useEffect(() => {
        resetAuto();
        return () => { if (autoRef.current) clearInterval(autoRef.current); };
    }, [resetAuto]);

    const onUserNav = useCallback((dir: number) => {
        if (dir === 1) goNext();
        else goPrev();
        resetAuto();
    }, [goNext, goPrev, resetAuto]);

    return (
        <section className="sv-section" id="services-section" ref={sectionRef}>
            {/* Background */}
            <div className="sv-bg">
                <img src={current.img} alt="" />
                <div className="sv-bg-overlay" />
            </div>

            {/* Fly card */}
            {flyCard && (
                <div className="sv-fly" style={{
                    top: `${flyCard.top}px`, 
                    left: `${flyCard.left}px`,
                    width: `${flyCard.w}px`, 
                    height: `${flyCard.h}px`,
                } as any}>
                    <img src={flyCard.img} alt="" />
                    <div className="sv-bg-overlay sv-fly-overlay" />
                </div>
            )}

            {/* Left text */}
            <div className="sv-text-area">
                <div className="sv-text-inner" key={`t-${active}`}>
                    <span className="sv-label">{current.location}</span>
                    <h2 className="sv-headline" style={{ whiteSpace: 'pre-line' }}>{current.headline}</h2>
                    <p className="sv-desc">{current.desc}</p>
                    <button className="sv-cta">
                        <span className="sv-cta-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                            </svg>
                        </span>
                        <span>Explore Service</span>
                    </button>
                </div>
            </div>

            {/* 7 Cards Track */}
            <div className="sv-cards-viewport">
                <div
                    className="sv-cards-track"
                    style={{
                        transform: `translateX(calc(-179px + ${slideDir * -179}px))`,
                        transition: slideDir !== 0 ? 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                    }}
                >
                    {WINDOW_OFFSETS.map((offset, i) => {
                        const idx = (active + 1 + offset + services.length) % services.length;
                        return (
                            <div
                                className="sv-card"
                                key={`track-${i}-${active}`}
                                ref={el => { cardsRef.current[i] = el; }}
                                onClick={() => {
                                    if (slideDir !== 0) return;
                                    if (offset > 0) onUserNav(1);
                                    if (offset < 0) onUserNav(-1);
                                }}
                                style={{
                                    opacity: flyOrigin === i ? 0 : 1,
                                    visibility: flyOrigin === i ? 'hidden' : 'visible'
                                }}
                            >
                                <img className="sv-card-img" src={services[idx].img} alt={services[idx].title} loading="lazy" />
                                <div className="sv-card-film" />
                                <div className="sv-card-info">
                                    <span className="sv-card-loc">{services[idx].location}</span>
                                    <h3 className="sv-card-title">{services[idx].title}</h3>
                                </div>
                                <div className="sv-card-shine" />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="sv-bottom">
                <div className="sv-arrows">
                    <button className="sv-arrow" onClick={() => { goPrev(); resetAuto(); }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    <button className="sv-arrow" onClick={() => { goNext(); resetAuto(); }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
                    </button>
                </div>
                <div className="sv-progress">
                    <div className="sv-progress-track" />
                    <div className="sv-progress-fill" key={progressKey} />
                </div>
                <div className="sv-page">{active + 1}</div>
            </div>
        </section>
    );
};

export default ServicesSection;
