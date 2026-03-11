"use client";

import { motion } from "framer-motion";

import Link from "next/link";

const PROJECTS = [
    {
        id: 1,
        title: "Books",
        category: "Authoring the doctrine — strategy, systems, and legacy in print.",
        link: "/books",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Blogs",
        category: "Short dispatches: ideas, frameworks, and build logs as they happen.",
        link: "/blog",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "GLÉNN",
        category: "Lifestyle brand: discipline, design, and dynasty.",
        link: "/glenn",
        image: "/things/Glenn.PNG",
    },
    {
        id: 4,
        title: "Nexus Health Kit",
        category: "Recovery and readiness coaching powered by physiology + AI.",
        link: "/nexushealthcare",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
    },
];

export default function Projects() {
    return (
        <section className="relative z-20 w-full bg-[#121212] py-32 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                        The Catalog
                    </h2>
                    <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
                        Books, blogs, brand, and Nexus Health Kit — built for creators and legacy.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        <Link
                            href="/legal"
                            data-analytics-cta="1"
                            data-analytics-label="Homepage Artist Legal"
                            data-analytics-destination="/legal"
                            data-analytics-context="homepage-routing"
                            className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
                        >
                            Artist Legal
                        </Link>
                        <Link
                            href="/royalties"
                            data-analytics-cta="1"
                            data-analytics-label="Homepage Royalty Recovery"
                            data-analytics-destination="/royalties"
                            data-analytics-context="homepage-routing"
                            className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
                        >
                            Royalty Recovery
                        </Link>
                        <Link
                            href="/nexushealthcare"
                            data-analytics-cta="1"
                            data-analytics-label="Homepage Nexus"
                            data-analytics-destination="/nexushealthcare"
                            data-analytics-context="homepage-routing"
                            className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
                        >
                            Nexus Health Kit
                        </Link>
                    </div>
                    <Link
                        href="/about"
                        className="mt-7 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
                    >
                        About Founder Glenn
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {PROJECTS.map((project, index) => (
                        <Link key={project.id} href={project.link} className="block w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                                className="group relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/5"
                            >
                                {/* Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-80"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                                        {project.title}
                                    </h3>

                                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-sm mb-6 opacity-90 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                                        {project.category}
                                    </p>

                                    {/* Button (Glassmorphism) */}
                                    <div className="overflow-hidden h-10">
                                        <motion.div
                                            className="flex items-center gap-2 transform translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                                        >
                                            <span className="text-sm font-semibold tracking-wide text-white uppercase">Explore {project.title}</span>
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
