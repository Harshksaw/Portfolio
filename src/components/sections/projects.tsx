'use client'

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Mobile3DMockup from "../shared/Mobile3DMockup";
import Desktop3DMockup from "../shared/Desktop3DMockup";

import { projects, Project, ProjectCategory } from "@/data/projects";

const isMobileProject = (category: string) => {
    return category === 'Mobile';
};

const BackgroundBeams = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
            animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-violet/10 rounded-full blur-[100px]"
        />
        <motion.div
            animate={{
                y: [0, 30, 0],
                x: [0, -20, 0],
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.2, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-main/10 rounded-full blur-[120px]"
        />
        <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
    </div>
);

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: -20,
        transition: { duration: 0.2, ease: "easeInOut" },
    },
};

const buttonVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 }
};

const allCategories: ProjectCategory[] = ["AI", "Web", "Mobile", "Subjects"];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>("AI");
    const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);

    const filteredProjects = useMemo(() => {
        return projects.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    const activeProject = filteredProjects[activeProjectIndex];

    const handleCategoryChange = (cat: ProjectCategory) => {
        setActiveCategory(cat);
        setActiveProjectIndex(0);
    };

    return (
        <section className="relative min-h-[900px] pt-16 pb-24 overflow-hidden" id="projects">
            <BackgroundBeams />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
                        Featured Projects
                    </h2>

                    {/* Main Categories Tab */}
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
                        {allCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md relative ${activeCategory === cat
                                        ? "text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                                        : "text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10"
                                    }`}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeCategoryTab"
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-violet/80 to-primary-main/80 z-[-1]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div>

                    {/* Sub-projects Tab */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 min-h-[44px]">
                        <AnimatePresence mode="wait">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((proj, idx) => (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={proj.shortTitle}
                                        onClick={() => setActiveProjectIndex(idx)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-300 ${activeProjectIndex === idx
                                                ? "bg-white/10 text-white border border-white/20"
                                                : "text-neutral-500 hover:text-neutral-300 border border-transparent"
                                            }`}
                                    >
                                        {proj.shortTitle}
                                    </motion.button>
                                ))
                            ) : (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-neutral-500 text-sm py-2 italic"
                                >
                                    New {activeCategory} projects coming soon...
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Project Details Display */}
                <div className="w-full relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {activeProject && (
                            <motion.div
                                key={activeProject.title}
                                className="w-full rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm p-6 md:p-10 flex flex-col xl:flex-row gap-10 md:gap-16 items-center"
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {/* Media Mockup Section */}
                                <div className="w-full xl:w-1/2 flex justify-center items-center">
                                    {isMobileProject(activeProject.category) ? (
                                        <Mobile3DMockup
                                            images={activeProject.image}
                                            title={activeProject.title}
                                            className="transform scale-90 md:scale-100"
                                        />
                                    ) : (
                                        <Desktop3DMockup
                                            images={activeProject.image}
                                            title={activeProject.title}
                                            className="w-full max-w-2xl transform scale-95 md:scale-100 origin-center"
                                        />
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="w-full xl:w-1/2 flex flex-col gap-6">
                                    <div>
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="inline-block px-3 py-1 mb-4 rounded-full border border-primary-violet/30 bg-primary-violet/10 text-primary-violet-light text-xs font-semibold tracking-wider uppercase"
                                        >
                                            {activeProject.type}
                                        </motion.div>
                                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                            {activeProject.title}
                                        </h3>

                                        <div className="space-y-4">
                                            {activeProject.description.map((desc, idx) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                                    key={idx}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-main" />
                                                    <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                                                        {desc}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex flex-wrap gap-2 mt-4"
                                    >
                                        {activeProject.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-neutral-400"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </motion.div>

                                    {/* Action Links */}
                                    {(activeProject.demoUrl || activeProject.repoUrl) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10"
                                        >
                                            {activeProject.demoUrl && (
                                                <motion.a
                                                    href={activeProject.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-main to-primary-violet hover:from-primary-light hover:to-primary-violet-light text-white font-medium rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
                                                    variants={buttonVariants}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Live Demo
                                                </motion.a>
                                            )}

                                            {activeProject.repoUrl && (
                                                <motion.a
                                                    href={activeProject.repoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all duration-300"
                                                    variants={buttonVariants}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                                    </svg>
                                                    GitHub
                                                </motion.a>
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
