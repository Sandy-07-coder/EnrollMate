import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { cn } from "../../libs/utils";
import { Clock, Github, Copy, Zap } from "lucide-react";

export default function ProfileCard({
    name = "Sandy",
    role = "Developer",
    email = "sandy@enrollmate.dev",
    avatarSrc = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    statusText = "Open Source Project",
    statusColor = "bg-[#4F7CFF]",
    glowText = "For Students. By Students.",
    githubUrl = "https://github.com/Sandy-07-Coder/EnrollMate",
    className,
}) {
    const [copied, setCopied] = useState(false);

    // Derive a local clock text
    const timeText = useMemo(() => {
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes().toString().padStart(2, "0");
        const hour12 = ((h + 11) % 12) + 1;
        const ampm = h >= 12 ? "PM" : "AM";
        return `${hour12}:${m}${ampm}`;
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch { }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn("relative w-full max-w-md mx-auto", className)}
        >
            {/* Glow effect */}
            <div className="pointer-events-none absolute inset-x-0 -bottom-10 top-[72%] rounded-[28px] bg-[#4F7CFF]/80 blur-xl shadow-[0_40px_80px_-16px_rgba(79,124,255,0.6)] z-0" />

            {/* Tagline below card */}
            <div className="absolute inset-x-0 -bottom-8 mx-auto w-full z-0">
                <div className="flex items-center justify-center gap-2 bg-transparent py-3 text-center text-sm font-medium text-[#1A2B4A]">
                    <Zap className="h-4 w-4 text-[#4F7CFF]" /> {glowText}
                </div>
            </div>

            <Card className="relative z-10 mx-auto w-full overflow-visible rounded-[28px] border-0 bg-[radial-gradient(120%_120%_at_30%_10%,#1a1a1a_0%,#0f0f10_60%,#0b0b0c_100%)] text-white shadow-2xl">
                <CardContent className="p-6 sm:p-8">
                    {/* Status bar */}
                    <div className="mb-6 flex items-center justify-between text-sm text-neutral-300">
                        <div className="flex items-center gap-2">
                            <span className={cn("inline-block h-2.5 w-2.5 rounded-full animate-pulse", statusColor)} />
                            <span className="select-none">{statusText}</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-80">
                            <Clock className="h-4 w-4" />
                            <span className="tabular-nums">{timeText}</span>
                        </div>
                    </div>

                    {/* Profile info */}
                    <div className="flex flex-wrap items-center gap-5">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10">
                            <img
                                src={avatarSrc}
                                alt={`${name} avatar`}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <h3 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
                                {name}
                            </h3>
                            <p className="mt-0.5 text-sm text-neutral-400">{role}</p>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Button
                            variant="secondary"
                            asChild
                            className="h-12 justify-center gap-3 rounded-2xl bg-white/10 text-white hover:bg-white/15 border-0"
                        >
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" /> View GitHub
                            </a>
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={handleCopy}
                            className="h-12 justify-center gap-3 rounded-2xl bg-white/10 text-white hover:bg-white/15 border-0"
                        >
                            <Copy className="h-4 w-4" /> {copied ? "Copied!" : "Copy Email"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
