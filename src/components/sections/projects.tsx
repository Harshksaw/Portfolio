'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import SemiCircularDial from "../HalfCircleDialList";
import Mobile3DMockup from "../shared/Mobile3DMockup";
import Desktop3DMockup from "../shared/Desktop3DMockup";

interface Project {
    title: string;
    shortTitle: string;
    type: string;
    description: string[];
    techStack: string[];
    image: string[];
    demoUrl?: string;
    repoUrl?: string;
}

// Project data with demo URLs and GitHub links
const projects: Project[] = [
    {
        title: "Full-Stack Room Booking System",
        shortTitle: "StudyEkaant",
        type: "production",
        description: [
            "Microservices architecture with autoscaling and load balancing.",
            "Supports 200+ concurrent users; ~95% uptime.",
            "Offline booking + payments; >$5K monthly transactions. Message queues, caching, and real-time seat tracking; API response times ~60% faster."
        ],
        techStack: ["React Native", "Docker", "Kubernetes", "Redis"],
        image: ["https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760193/File5_oppopy.png","https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760200/p17_mui7p3.png","https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760201/p15_m78wma.png","https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760201/p16_rgvkmt.png","https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760191/File3_mdbyvr.png","https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760190/File8_tccknl.png"],
        demoUrl: "https://www.studyekaant.com",
        repoUrl: "https://github.com/Harshksaw/Ekaant-StudyRoom-APP"
    },
    {
        title: "Learning Management System",
        shortTitle: "Krishna Academy LMS",
        type: "production",
        description: [
            "Used by 3 institutions; 1500+ concurrent students.",
            "Low-latency streaming via AWS + FFmpeg; latency ↓ ~40%.",
            "Anti-piracy: screenshot/record blocking, device-bound login, suspicious-activity alerts."
        ],
        techStack: ["React", "Node/Express", "MongoDB", "AWS"],
        image: ["https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760199/File12_wa4uol.png","https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760198/File11_p5uety.png","https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760199/File13_gkbiv1.png"],
        demoUrl: "https://krishnaacademy.in",
        repoUrl: "https://github.com/Harshksaw/LMS-App"
    },
    {
        title: "MySmartFactory.ai",
        shortTitle: "AI Safety Detection",
        type: "production",
        description: [
            "End-to-end system with FastAPI backend and Next.js frontend, integrated with three containers running machine learning models",
            "AI-centric site with multi-persona chat and RAG experiments (self-hosted LLM via Ollama).",
            "(YOLO and CV) for safety failure detection using live CCTV cameras.",
            "Real-time alerts via WhatsApp, email, browser, and push notifications.",
            "Industrial KPI & incident management with multi-role RBAC",
        ],
        techStack: ["Next.js", "FastAPI", "MongoDB", "Redis"],
        image: ["https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762378/Screenshot_2025-09-01_at_2.31.13_PM_degmoj.png","https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762379/Screenshot_2025-09-01_at_2.32.41_PM_iiqlvi.png","https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762379/Screenshot_2025-09-01_at_2.31.23_PM_djcjap.png"]
    },
    {
        title: "AI Interview Platform with Autogen",
        shortTitle: "AI Interviewer",
        type: "prototype",
        description: [
            "Automated technical interview platform powered by Autogen and LLMs.",
            "Dynamic question generation, real-time candidate evaluation, and feedback.",
            "Multi-turn conversational flow with context-aware follow-ups.",
            "Admin dashboard for interview management and analytics.",
            "Supports code execution and scoring for coding rounds."
        ],
        techStack: ["Next.js", "FastAPI", "Autogen", "MongoDB"],
        image: ["data:image/jpeg;base64,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", "data:image/jpeg;base64,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"]
    },
    {
        title: "Bwisher E-commerce Platform",
        shortTitle: "Bwisher",
        type: "production",
        description: [
            "Full-featured e-commerce platform for fashion and lifestyle products.",
            "Multi-vendor support, product catalog, cart, checkout, and order tracking.",
            "Integrated payment gateways, inventory management, and analytics dashboard.",
            "Mobile-first responsive UI with optimized performance.",
            "Admin panel for vendor onboarding, product uploads, and sales insights."
        ],
        techStack: ["Next.js", "Node.js", "MongoDB", "Stripe"],
        image: ["https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762378/Screenshot_2025-09-01_at_1.32.14_PM_ssxp1g.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760200/l3_xtghtv.png"],
        demoUrl: "https://bwisher.com",
        repoUrl: "https://github.com/Harshksaw/bwisher-ecommerce"
    }
];

// Helper function to determine if project is mobile app
const isMobileProject = (title: string) => {
    const mobileKeywords = ['LMS', 'StudyEkaant', 'Learning Management System', 'Full-Stack Room Booking System'];
    return mobileKeywords.some(keyword => title.includes(keyword));
};

function MobileProject({ project }: { project: Project }) {
    const isProjectMobile = isMobileProject(project.title);
    
    return (
        <div>
            <div className="flex justify-center mb-8 px-4">
                {isProjectMobile ? (
                    <Mobile3DMockup
                        images={project.image}
                        title={project.title}
                        className="transform scale-90 sm:scale-100"
                    />
                ) : (
                    <Desktop3DMockup
                        images={project.image}
                        title={project.title}
                        className="w-full max-w-full"
                    />
                )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-4">
                {project.title}
            </h2>
            <div className="max-w-2xl mx-auto px-6 py-4 rounded-2xl glass-effect">
                <ul className="relative list-disc ml-4 mt-4 space-y-2.5 text-white">
                    {project.description.map((desc: string, idx: number) => (
                        <li key={idx}>{desc}</li>
                    ))}
                </ul>
                
                {/* Project Links */}
                {(project.demoUrl || project.repoUrl) && (
                    <div className="flex gap-3 mt-4 justify-center">
                        {project.demoUrl && (
                            <motion.a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-main hover:bg-primary-light text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Live Demo
                            </motion.a>
                        )}
                        
                        {project.repoUrl && (
                            <motion.a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-violet hover:bg-primary-violet-light text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                </svg>
                                GitHub
                            </motion.a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
        },
    },
    exit: {
        opacity: 0,
        y: 30,
        transition: { duration: 0.3, ease: "easeInOut" },
    },
};

export default function Projects() {
    const [activeIndex, setActiveIndex] = useState(2); // Start with 3rd item (index 2)

    // The card to show
    const displayedIndex = activeIndex;

    const scrollToIndex = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className="h-[540px] md:flex relative mt-16 md:mt-24 hidden">
                {/* Card container */}
                <div className="h-full w-full relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={displayedIndex}
                            className="absolute inset-0 rounded-3xl bg-gradient-to-tr gap-6 flex flex-col"
                            variants={cardVariants as any}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <section className="flex gap-8 relative items-start">
                                {isMobileProject(projects[displayedIndex].title) ? (
                                    // Mobile Project Layout - Single mockup
                                    <div className="flex-1 flex justify-center">
                                        <Mobile3DMockup 
                                            images={projects[displayedIndex].image}
                                            title={projects[displayedIndex].title}
                                            className="transform scale-90"
                                        />
                                    </div>
                                ) : (
                                    // Desktop Project Layout - Single mockup
                                    <div className="flex-1">
                                        <Desktop3DMockup 
                                            images={projects[displayedIndex].image}
                                            title={projects[displayedIndex].title}
                                            className="transform scale-90 origin-left"
                                        />
                                    </div>
                                )}
                                <div className="mt-2 -ml-12 z-10">
                                    <h3 className="text-4xl font-bold text-white">
                                        {projects[displayedIndex].title}
                                    </h3>
                                    <ul className="list-disc ml-4 mt-4 text-white text-base max-w-2xl font-medium">
                                        {projects[displayedIndex].description.map((desc: string, idx: number) => (
                                            <li key={idx}>{desc}</li>
                                        ))}
                                    </ul>
                                    
                                    {/* Project Links */}
                                    {(projects[displayedIndex].demoUrl || projects[displayedIndex].repoUrl) && (
                                        <div className="flex gap-4 mt-6 ml-4">
                                            {projects[displayedIndex].demoUrl && (
                                                <motion.a
                                                    href={projects[displayedIndex].demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-main hover:bg-primary-light text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Live Demo
                                                </motion.a>
                                            )}
                                            
                                            {projects[displayedIndex].repoUrl && (
                                                <motion.a
                                                    href={projects[displayedIndex].repoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-violet hover:bg-primary-violet-light text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                                    </svg>
                                                    GitHub
                                                </motion.a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </section>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* SemiCircular Dial Navigation */}
                <SemiCircularDial
                    projects={projects}
                    initialIndex={2}
                    onChange={(idx) => scrollToIndex(idx)}
                />
            </div>
            <div className="space-y-16 mt-16 z-10 relative md:hidden block">
                {projects.map((project: Project, idx: number) => (
                    <MobileProject key={idx} project={project} />
                ))}

            </div>

        </>
    );
}



{/* <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                {projects.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => scrollToIndex(idx)}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-black scale-125" : "bg-neutral-400"
                            }`}
                    />
                ))}
            </div> */}
