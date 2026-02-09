'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import SemiCircularDial from "../HalfCircleDialList";
import Mobile3DMockup from "../shared/Mobile3DMockup";
import Desktop3DMockup from "../shared/Desktop3DMockup";

import { projects, Project } from "@/data/projects";

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
    const [activeIndex, setActiveIndex] = useState(0); // Start with Document Intelligence Platform

    // The card to show
    const displayedIndex = activeIndex;

    const scrollToIndex = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className="h-[750px] md:flex relative mt-16 md:mt-24 hidden">
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
                    initialIndex={0}
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
