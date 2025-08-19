import React, { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  PlayCircle,
  Camera,
  Users,
  FileText,
  Award,
  Star,
  Film,
  Globe,
  Lightbulb,
  Heart,
  Eye,
  MessageCircle,
  Quote,
  Calendar,
  Mail,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  GalleryHorizontal,
  Megaphone,
  Sparkles,
  Clock,
  Flame,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/********************
 * DATA
 ********************/
const finalists = [
  {
    title: "Finalist 1",
    description:
      "A gripping short film exploring depression, anxiety, and the quiet strength that carries us through.",
    url: "https://youtu.be/xBCC5RpWKHA",
    blog:
      "This powerful short film takes viewers on an emotional journey through depression, anxiety, and the search for inner strength. The jury praised its “sensitive yet striking visual storytelling” and the way it “captures both the fragility and resilience of the human spirit.” With intense character portrayals and a carefully crafted atmosphere, the film conveys the inner struggle, moments of despair, and subtle sparks of hope that guide one forward. “Kornblume” is a courageous, moving, and inspiring work that leaves a lasting impression.",
  },
  {
    title: "Finalist 2",
    description:
      "A relatable short film exploring the stress, pressures, and resilience of school life.",
    url: "https://youtu.be/na9N-YT1l90",
    blog:
      "This insightful short film delves into the pressures and challenges of school life, capturing the stress, expectations, and emotional ups and downs that students face daily. The jury praised its “relatable storytelling and authentic portrayal of youth experiences,” noting how it “balances humor, tension, and empathy with remarkable sensitivity.” Through its vivid characters and engaging narrative, the film highlights both the struggles and the resilience of young people navigating academic and social pressures.",
  },
  {
    title: "Finalist 3",
    description:
      "A visually and sonically stunning short film where exceptional cinematography and immersive sound design turn a minimal crime story into a gripping cinematic experience.",
    url: "https://youtu.be/J36aYNW6RaI",
    blog:
      "While the narrative centers on three criminals and the tense interrogation of one by another, the jury, particularly Fatih Akin, was captivated by the film’s sound design and immersive auditory landscape. Combined with its striking cinematography, meticulous scene composition, and dynamic camera work, the film creates an intense and gripping atmosphere that elevates even a minimal plot. This short film demonstrates how masterful visuals and sound can transform a simple story into a compelling cinematic experience.",
  },
 {
    title: "Finalist 4",
    description:
      "A poetic, dialogue-free short film that uses only music and imagery to portray the emotions of adolescence.",
    url: "https://youtu.be/e26knO5D-mk",
    blog:
      "Told without dialogue, this short film relies entirely on music and imagery to capture the emotions, struggles, and dreams of adolescence. The jury highlighted its “remarkable ability to communicate complex feelings with pure visual and musical language,” praising its poetic flow and authenticity. Through carefully composed scenes and an evocative soundtrack, the film immerses viewers in the raw and unfiltered perspective of a teenager navigating the journey of growing up.",
  },

];

const pastWinners = [
  {
    year: 2017,
    title: "Ruby",
    url: "https://youtu.be/WBC2MukULcE",
    blog:
      "This unforgettable story combined beautiful cinematography with a heartfelt narrative that stayed with audiences long after the credits rolled.",
  },
  {
    year: 2018,
    title: "Die Klausur",
    url: "https://youtu.be/yFE9RVDhN_8",
    blog:
      "A bold and daring film that redefined youth cinema, tackling complex themes with grace and power.",
  },
  {
    year: 2020,
    title: "Hasenjagd",
    url: "https://youtu.be/wopWYOaq-hM",
    blog:
      "A breathtaking mix of realism and artistry, showing the resilience of youth in uncertain times.",
  },
 {
    year: 2023,
    title: "The pen",
    url: "https://youtu.be/y4jUy9yGP48",
    blog:
      "I was in tears as I watched this excellent short film. Education is in crisis in almost all parts of the world and desperately many children are falling victim to pointless requirements.",
  },
 {
    year: 2024,
    title: "Static",
    url: "https://youtu.be/xYnVUz-Wy0c",
    blog:
      "A visually striking short film where cinematic craft takes center stage, turning business into pure atmosphere.",
  },



];

const jury = [
  {
    name: "Tom Tykwer",
    role: "Director",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/MKr350743_Tom_Tykwer_%28NRW-Empfang%2C_Berlinale_2024%29.jpg/250px-MKr350743_Tom_Tykwer_%28NRW-Empfang%2C_Berlinale_2024%29.jpg",
    bio:
      "We are pleased to welcome Tom Tykwer, the acclaimed German filmmaker and producer, as a member of our jury. Tykwer is known for his innovative work on films such as Run Lola Run, Perfume: The Story of a Murderer, and Cloud Atlas. With a career spanning both directing and producing, he brings a unique creative vision and a deep understanding of the filmmaking process. As a jury member, Tom Tykwer contributes his extensive industry experience, artistic insight, and passion for storytelling, ensuring a thoughtful and informed evaluation of this year’s cinematic selections.",
  },
  {
    name: "Daniel Brühl",
    role: "Cinematographer",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MJK_68238_Daniel_Br%C3%BChl_%28Berlinale_2020%29.jpg/1200px-MJK_68238_Daniel_Br%C3%BChl_%28Berlinale_2020%29.jpg",
    bio:
      "We are delighted to welcome Daniel Brühl, the renowned German-Spanish actor, as a member of our jury. Brühl has captivated international audiences with his versatile performances in films such as Kafka, Rush, and The Bourne Ultimatum. Known for his nuanced acting and ability to portray complex characters, he brings both depth and charisma to the screen. As a jury member, Daniel Brühl contributes his extensive experience in the film industry, his artistic sensibility, and his keen understanding of performance, ensuring a thoughtful and insightful evaluation of this year’s cinematic entries.",
  },
  {
    name: "Fatih Akin",
    role: "Screenwriter",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQXNfqOJucEVShSM3T8J6osgQPDuXsFT2WDiVvPqzLhFn_PG9l1ZXDeuOjGPTv7Ze18_wfOXnqUkVvjXEOzHRUfVI1bfbN11YDVfM-xS4w",
    bio:
      "We are thrilled to welcome Fatih Akin, the acclaimed German filmmaker, as a distinguished member of our jury. Known for his powerful storytelling and distinctive cinematic style, Akin has captivated audiences worldwide with films such as Head-On, The Edge of Heaven, and In the Fade. His work often explores themes of identity, migration, and human relationships, blending emotional depth with compelling narratives. As a jury member, Fatih Akin brings a wealth of experience, artistic insight, and a keen eye for storytelling that transcends borders. We are honored to have him help shape the selection of this year’s most outstanding films.",
  },
];
const criteria = [
  {
    icon: Lightbulb,
    title: "Originality of Concept",
    text:
      "We look for fresh, daring ideas that push boundaries and challenge convention — a voice that feels unmistakably yours.",
    example:
      "Example: A micro-budget thriller using a single, unbroken take to explore the anxieties of digital life.",
  
  },
  {
    icon: Eye,
    title: "Visual Mastery",
    text:
      "From framing to color, the image should captivate. We love confident camera language and purposeful design.",
    example:
      "Example: Natural light transformed into a narrative tool that mirrors the protagonist's inner world.",
     },
  {
    icon: MessageCircle,
    title: "Narrative Impact",
    text:
      "Stories that engage, surprise, and resonate long after the credits. Structure serves emotion — not the other way around.",
    example:
      "Example: A non-linear short that reveals its twist through sound design rather than dialogue.",
    },
  {
    icon: Heart,
    title: "Performance Power",
    text:
      "Authentic, lived-in performances make characters unforgettable. Casting and directing are everything.",
    example:
      "Example: Street-cast newcomers whose chemistry carries the film's emotional weight.",
   },
  {
    icon: Film,
    title: "Youth Relevance",
    text:
      "Themes and perspectives that speak to the dreams, doubts, and courage of young audiences worldwide.",
    example:
      "Example: A hybrid docu-fiction about climate grief and collective action in high school.",
     },
  {
    icon: Sparkles,
    title: "Innovation",
    text:
      "Surprise us. Try new formats, blend genres, embrace constraints as creative fuel.",
    example:
      "Example: A phone-vertical musical that uses push notifications as chorus.",
      },
];

const testimonials = [
  {
    quote:
      "The Munich Online Film Festival changed my career. The feedback from the jury was insightful and practical.",
    name: "Maya R.",
    title: "Director of 'Static Hearts'",
  },
  {
    quote:
      "A global community and a stage big enough for bold ideas — it's rare and essential.",
    name: "Arjun P.",
    title: "Animator",
  },
  {
    quote:
      "Streaming made our film accessible worldwide. We connected with mentors we never thought possible.",
    name: "Sofia L.",
    title: "Producer",
  },
];

const gallery = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

const sponsors = [
  { name: "CineTech", logo: "" },
  { name: "VisionLab", logo: "" },
  { name: "FrameForge", logo: "" },
  { name: "SoundWave", logo: "" },
  { name: "CloudStream", logo: "" },
];

/********************
 * FESTIVAL DATES / COUNTDOWN
 ********************/
// Choose a big target date. Adjust as needed.
const FESTIVAL_NAME = "Munich Online Film Festival";
const FESTIVAL_START = new Date("2025-08-19T18:00:00+02:00"); // CET/CEST Munich time

function useTimeLeft(targetDate) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, targetDate.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const done = diff === 0;
  return { days, hours, minutes, seconds, done };
}

const TimeBlock = ({ label, value }) => (
  <div className="text-center">
    <motion.div
      key={String(value)}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-w-[5.5rem] px-4 py-3 rounded-2xl bg-black/70 border border-yellow-500/30 shadow-[0_0_60px_rgba(234,179,8,0.15)]"
    >
      <div className="font-black tabular-nums text-4xl md:text-6xl leading-none">{String(value).padStart(2, "0")}</div>
      <div className="uppercase text-[0.65rem] md:text-xs tracking-widest text-yellow-300/80 mt-2">{label}</div>
    </motion.div>
  </div>
);

function Countdown({ target = FESTIVAL_START }) {
  const { days, hours, minutes, seconds, done } = useTimeLeft(target);
  return (
    <div className="w-full">
      {done ? (
        <div className="flex items-center justify-center gap-3 text-2xl md:text-4xl">
          <Flame className="h-7 w-7 md:h-10 md:w-10 text-yellow-400" />
          <span className="font-extrabold">We are LIVE now!</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <TimeBlock label="Days" value={days} />
          <TimeBlock label="Hours" value={hours} />
          <TimeBlock label="Minutes" value={minutes} />
          <TimeBlock label="Seconds" value={seconds} />
        </div>
      )}
      <div className="text-center text-xs md:text-sm text-gray-300 mt-3">
        Festival start: {FESTIVAL_START.toLocaleString()}
      </div>
    </div>
  );
}

/********************
 * ANIMATION HELPERS
 ********************/
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const sweep = {
  initial: { x: "-120%", opacity: 0 },
  animate: {
    x: "120%",
    opacity: 1,
    transition: { duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 6 },
  },
};

/********************
 * SMALL COMPONENTS
 ********************/
const WordCycler = ({ words }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <div className="h-12 relative overflow-hidden inline-flex align-middle ml-3">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-yellow-400 font-extrabold text-3xl md:text-5xl drop-shadow-[0_0_30px_rgba(234,179,8,0.35)]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const VideoCard = ({ item, isWinner, onReadMore }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-gray-900 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(234,179,8,0.15)] hover:shadow-[0_0_80px_rgba(234,179,8,0.35)] transition-shadow"
  >
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="group relative block">
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors z-10 flex items-center justify-center">
        <PlayCircle className="h-14 w-14 text-white" />
      </div>
      <img
        src={`https://img.youtube.com/vi/${item.url.split("v=")[1] || item.url.split("be/")[1]}/0.jpg`}
        alt={item.title}
        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </a>
    <div className="p-8">
      <h3 className="text-2xl font-extrabold mb-3 tracking-wide">
        {isWinner ? `${item.year}: ${item.title}` : item.title}
      </h3>
      <p className="text-gray-400 text-base mb-6">{item.description}</p>
      <button
        onClick={() => onReadMore && onReadMore(item.blog)}
        className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-base font-bold"
      >
        <FileText className="h-5 w-5" /> Read more
      </button>
    </div>
  </motion.div>
);

const SponsorsMarquee = () => (
  <div className="overflow-hidden py-8 border-t border-gray-800">
    <motion.div
      className="flex gap-10 whitespace-nowrap"
      animate={{ x: [0, -600] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {[...sponsors, ...sponsors].map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-900/80 border border-gray-800"
        >
          <span className="text-3xl">{s.logo}</span>
          <span className="text-gray-300 font-semibold">{s.name}</span>
        </div>
      ))}
    </motion.div>
  </div>
);

const ParticleBackground = () => {
  const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => i), []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((i) => (
        <motion.span
          key={i}
          className="absolute block rounded-full bg-yellow-500/10"
          style={{ width: 6 + (i % 5) * 2, height: 6 + (i % 5) * 2, left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.85, 0.2] }}
          transition={{ duration: 3 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
        />
      ))}
    </div>
  );
};

const LightSweep = () => (
  <motion.div
    variants={sweep}
    initial="initial"
    animate="animate"
    className="pointer-events-none absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
  />
);

const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

/********************
 * PAGES
 ********************/
const HomePage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div ref={ref} className="relative">
      {/* HERO with Parallax */}
      <section className="relative h-[100vh] overflow-hidden">
        <motion.img
          style={{ y: yBack }}
          src="https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=2400&q=80"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Festival background"
        />
        <motion.div style={{ y: yMid }} className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/95" />
        <ParticleBackground />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="relative max-w-7xl mx-auto">
            <LightSweep />
            <div className="mb-6 flex flex-col items-center gap-3">
              <Badge className="tracking-widest uppercase bg-yellow-500 text-black text-base px-4 py-2">Since 2010</Badge>
              <div className="flex items-center gap-3 text-yellow-300 text-sm md:text-base">
                <Calendar className="h-5 w-5" />
                <span>19 august 2025 · Online • Munich</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl xl:text-9xl font-extrabold mb-6 leading-[0.95] drop-shadow-[0_10px_60px_rgba(234,179,8,0.2)]">
              {FESTIVAL_NAME}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Where stories come alive and the next generation of filmmakers shines under a global digital spotlight
              <WordCycler words={["Innovation", "Diversity", "Vision", "Fearlessness"]} />
            </p>

            {/* COUNTDOWN */}
            <div className="mt-10">
              <Countdown />
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                               <Link to="/finalists" className="border border-yellow-500/50 text-yellow-300 hover:text-black hover:bg-yellow-400 font-bold px-8 py-4 rounded-2xl inline-flex items-center gap-2 text-lg">
                  <PlayCircle className="h-5 w-5" /> Watch Finalists
                </Link>
              </div>
          </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <motion.section
        style={{ y: yFront }}
        className="py-28 bg-black text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Globe className="h-14 w-14 mx-auto mb-5 text-yellow-400" />
        <p className="max-w-6xl mx-auto text-gray-300 text-xl leading-relaxed">
          From Munich to the world — our festival breaks barriers and celebrates the vibrant creativity of youth cinema.
          Every year, we unite audiences from over 100 countries in a shared passion for storytelling, diversity, and
          innovation. Here, dreams find their stage, voices find their listeners, and cinema finds its future. We believe
          in fair access, mentorship, and the power of streaming to amplify unheard perspectives.
        </p>

        {/* Big Stats */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {[
            { k: "Countries", v: "100+" },
            { k: "Streams", v: "1M+" },
            { k: "Mentors", v: "60+" },
            { k: "Awards", v: "12" },
          ].map((s) => (
            <div key={s.k} className="rounded-3xl bg-gray-900/60 border border-gray-800 p-8">
              <div className="text-4xl md:text-6xl font-black text-yellow-400">{s.v}</div>
              <div className="uppercase tracking-widest text-gray-400 mt-2">{s.k}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* HIGHLIGHTS */}
      <motion.section
        className="py-28 max-w-7xl mx-auto px-4"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-3 gap-8">
          {["Global Premiere Hub", "Mentorship Sessions", "Interactive Q&As"].map((h, i) => (
            <motion.div key={h} variants={fadeInUp} className="bg-gray-900/70 p-10 rounded-3xl border border-gray-800">
              <h3 className="text-3xl font-extrabold mb-3 text-yellow-400">{h}</h3>
              <p className="text-gray-300 text-lg">
                {i === 0 &&
                  "Premiere online, reach worldwide audiences instantly, and measure impact with real-time engagement."}
                {i === 1 &&
                  "Connect with industry mentors across disciplines — from writing and directing to editing and distribution."}
                {i === 2 &&
                  "Host live Q&As with global viewers, gather feedback, and build communities around your stories."}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="py-28 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-extrabold mb-10 flex items-center gap-3">
            <Quote className="h-10 w-10 text-yellow-400" /> Voices from the Festival
          </h2>
          <Testimonials />
        </div>
      </section>

      {/* SPONSORS */}
      <SponsorsMarquee />

      {/* Sticky bottom bar with mini countdown */}
      <StickyCountdownBar />
    </div>
  );
};

const FinalistsPage = ({ onReadMore }) => (
  <div>
    <section className="py-24 max-w-7xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-extrabold mb-6 flex items-center gap-3"
      >
        <Camera className="h-10 w-10 text-yellow-400" /> Best Film Finalists 2025
      </motion.h2>
      <p className="text-gray-400 mb-10 max-w-4xl text-lg">
        These films represent the pinnacle of young cinematic talent in 2025 — each bringing a unique vision, style, and
        emotional depth that captured our jury's attention. From intimate dramas to bold experimental pieces, these
        finalists redefine what youth cinema can be. Dive into their trailers and read our extended jury notes.
      </p>
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-10">
        {finalists.map((f) => (
          <VideoCard key={f.title} item={f} onReadMore={onReadMore} />
        ))}
      </motion.div>
    </section>
  </div>
);

const WinnersPage = ({ onReadMore }) => (
  <div>
    <section className="py-24 max-w-7xl mx-auto px-4">
      <h2 className="text-5xl font-extrabold mb-6 flex items-center gap-3">
        <Award className="h-10 w-10 text-yellow-400" /> Past Winners
      </h2>
      <p className="text-gray-400 mb-10 max-w-4xl text-lg">
        Our winners are trailblazers, artists who have left a mark on audiences and inspired future filmmakers. Each
        title here represents not just cinematic excellence, but also the cultural and emotional heartbeat of its time.
      </p>
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-10">
        {pastWinners.map((w) => (
          <VideoCard key={w.title} item={w} isWinner onReadMore={onReadMore} />
        ))}
      </motion.div>
    </section>
  </div>
);

const JuryPage = () => (
  <div>
    <section className="py-24 max-w-7xl mx-auto px-4">
      <h2 className="text-5xl font-extrabold mb-6 flex items-center gap-3">
        <Users className="h-10 w-10 text-yellow-400" /> Meet the Jury
      </h2>
      <p className="text-gray-400 mb-10 max-w-5xl text-lg">
        Our esteemed panel brings together visionaries from across the film industry — acclaimed directors, master
        cinematographers, and award-winning screenwriters. Their collective expertise ensures every film is evaluated
        with both technical precision and artistic sensitivity. Beyond scores, the jury provides mentorship and detailed
        feedback to help projects grow.
      </p>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-3 gap-10"
      >
        {jury.map((j) => (
          <motion.div
            variants={fadeInUp}
            key={j.name}
            className="bg-gray-900 rounded-3xl p-8 shadow-[0_0_60px_rgba(234,179,8,0.15)] border border-gray-800 hover:shadow-[0_0_80px_rgba(234,179,8,0.35)] transition-shadow flex flex-col items-center text-center"
          >
            <img
              src={j.image}
              alt={j.name}
              className="w-32 h-32 object-cover rounded-full mb-6 border-4 border-yellow-400 shadow-lg"
            />
            <h3 className="text-2xl font-extrabold mb-1">{j.name}</h3>
            <p className="text-yellow-400 mb-2 text-base font-semibold">{j.role}</p>
            <p className="text-gray-400 text-base leading-relaxed">{j.bio}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  </div>
);
const CriteriaPage = () => (
  <div>
    <section className="py-24 max-w-7xl mx-auto px-4">
      <h2 className="text-5xl font-extrabold mb-6 flex items-center gap-3">
        <Star className="h-10 w-10 text-yellow-400" /> Judging Criteria
      </h2>
      <p className="text-gray-400 mb-12 max-w-5xl text-lg">
        Each film is assessed using a comprehensive set of criteria that reflect our commitment to artistic excellence,
        emotional resonance, and cultural relevance. Below, explore how we score — with examples and imagery for
        clarity.
      </p>
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
        {criteria.map((c) => (
          <motion.div key={c.title} variants={fadeInUp} className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800">
            <div className="h-48 w-full overflow-hidden">
              <img src={c.img} alt="criterion" className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-3">
                <c.icon className="h-9 w-9 text-yellow-400" />
                <h3 className="text-2xl font-extrabold">{c.title}</h3>
              </div>
              <p className="text-gray-300 text-base mb-3 leading-relaxed">{c.text}</p>
              <p className="text-gray-500 text-sm italic">{c.example}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  </div>
);

const AboutPage = () => (
  <div>
    <section className="py-24 max-w-6xl mx-auto px-4">
      <h2 className="text-5xl font-extrabold mb-6 flex items-center gap-3">
        <Megaphone className="h-10 w-10 text-yellow-400" /> About the Festival
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6 text-lg">
        The Munich Online Film Festival was founded with a simple belief: cinematic voices from every corner of the
        world deserve a global audience. Streaming-first from day one, we embrace experimentation, access, and impact.
        Our program blends premieres with masterclasses, networking lounges, and peer feedback labs.
      </p>
      <p className="text-gray-300 leading-relaxed text-lg">
        We champion sustainable production, fair crediting, and inclusive storytelling. Our partnerships with schools and
        media labs provide bursaries and hands-on mentorship for emerging artists.
      </p>
    </section>
  </div>
);

const HistoryPage = () => (
  <div>
    <section className="py-24 max-w-7xl mx-auto px-4">
      <h2 className="text-5xl font-extrabold mb-6 flex items-center gap-3">
        <Calendar className="h-10 w-10 text-yellow-400" /> History & Milestones
      </h2>
      <p className="text-gray-400 mb-12 max-w-4xl text-lg">
        From a small streaming experiment to Europe's largest online youth film showcase — explore our journey.
      </p>
      <Timeline />
    </section>
  </div>
);


const ParticipatePage = () => (
  <div id="submit">
    <section className="py-24 max-w-5xl mx-auto px-4">
      <h2 className="text-5xl font-extrabold mb-6 flex items-center gap-3">
        <Film className="h-10 w-10 text-yellow-400" /> Submit Your Film
      </h2>
      <p className="text-gray-300 mb-8 text-lg">
        Submissions are closed. The jury voting has begun. 
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thanks! We'll be in touch via email.");
        }}
        className="bg-gray-900 p-8 rounded-3xl border border-gray-800 space-y-5 shadow-[0_0_60px_rgba(234,179,8,0.15)]"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <input required placeholder="Your Name" className="bg-black border border-gray-800 rounded-2xl p-4 text-lg" />
          <input required type="email" placeholder="Email" className="bg-black border border-gray-800 rounded-2xl p-4 text-lg" />
          <input required placeholder="Film Title" className="bg-black border border-gray-800 rounded-2xl p-4 text-lg md:col-span-2" />
          <input required placeholder="Link to Screener (URL)" className="bg-black border border-gray-800 rounded-2xl p-4 text-lg md:col-span-2" />
        </div>
        <textarea rows={6} placeholder="Synopsis / Notes" className="w-full bg-black border border-gray-800 rounded-2xl p-4 text-lg" />
        <button className="inline-flex items-center gap-2 bg-yellow-500 text-black font-extrabold px-7 py-4 rounded-2xl hover:bg-yellow-400 text-lg">
          <ArrowRight className="h-5 w-5" /> Submit
        </button>
      </form>
    </section>
  </div>
);

/********************
 * COMPOSITES
 ********************/
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-10 overflow-hidden shadow-[0_0_60px_rgba(234,179,8,0.15)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-gray-200 text-2xl leading-relaxed mb-5">“{testimonials[i].quote}”</p>
          <div className="flex items-center gap-3 text-lg text-gray-400">
            <span className="font-semibold text-yellow-400">{testimonials[i].name}</span>
            <span>— {testimonials[i].title}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Timeline() {
  const items = [
    { year: 2010, text: "Festival founded. First online screenings with 12 films from 6 countries." },
    { year: 2014, text: "Launch of mentorship lab and first industry roundtables." },
    { year: 2018, text: "Audience surpassed 1 million cumulative streams." },
    { year: 2022, text: "Accessibility push: live captions and audio descriptions." },
    { year: 2025, text: "Record submissions from 72 countries; cross-continent jury panels." },
  ];
  return (
    <div className="relative pl-8">
      <div className="absolute left-2 top-0 bottom-0 w-1.5 bg-yellow-500/40 rounded-full" />
      <div className="space-y-12">
        {items.map((it) => (
          <motion.div key={it.year} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
            <div className="absolute -left-[12px] top-2 w-7 h-7 rounded-full bg-yellow-500 shadow-lg" />
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
              <div className="text-yellow-400 font-extrabold text-3xl mb-1">{it.year}</div>
              <p className="text-gray-300 text-lg">{it.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StickyCountdownBar() {
  const { days, hours, minutes, seconds } = useTimeLeft(FESTIVAL_START);
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="backdrop-blur bg-black/70 border border-yellow-500/30 rounded-3xl px-5 py-3 shadow-[0_0_60px_rgba(234,179,8,0.25)] flex items-center gap-5">
        <Clock className="h-6 w-6 text-yellow-400" />
        <div className="flex items-center gap-3 text-sm md:text-base">
          <span className="uppercase tracking-widest text-gray-400">Festival starts in</span>
          <span className="font-bold text-yellow-300 tabular-nums">{days}d {hours}h {minutes}m {seconds}s</span>
        </div>
        <Link to="/finalists" className="hidden sm:inline-flex items-center gap-2 bg-yellow-500 text-black font-extrabold px-4 py-2 rounded-xl hover:bg-yellow-400">
          <ArrowRight className="h-4 w-4" /> Winner
        </Link>
      </div>
    </div>
  );
}

/********************
 * APP SHELL
 ********************/
function Nav() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/finalists", label: "Finalists" },
    { to: "/winners", label: "Winners" },
    { to: "/jury", label: "Jury" },
    { to: "/criteria", label: "Criteria" },
    { to: "/about", label: "About" },
    { to: "/history", label: "History" },
    { to: "/participate", label: "Participate" },
  ];
  const location = useLocation();
  return (
    <nav className="bg-gray-900/70 backdrop-blur border-b border-gray-800 fixed w-full z-50">
      <div className="max-w-8xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="font-extrabold tracking-wider text-2xl md:text-3xl">MOFF</Link>
        <div className="hidden md:flex gap-6 text-sm uppercase tracking-widest">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={`hover:text-yellow-400 transition-colors ${location.pathname === l.to ? "text-yellow-400" : "text-gray-300"}`}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link to="/participate" className="hidden md:inline-flex items-center gap-2 bg-yellow-500 text-black font-extrabold px-5 py-2.5 rounded-xl hover:bg-yellow-400">
          <ArrowRight className="h-4 w-4" /> Submit
        </Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-800">
      <div className="max-w-8xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <h4 className="font-extrabold mb-3 text-xl">About</h4>
          <p className="text-gray-400 text-base leading-relaxed">
            Munich Online Film Festival celebrates youth cinema with a global streaming-first approach. We foster new
            voices through mentorship, access, and community.
          </p>
        </div>
        <div>
          <h4 className="font-extrabold mb-3 text-xl">Newsletter</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed! Check your inbox.");
            }}
            className="flex gap-2"
          >
            <input type="email" placeholder="your@email" className="bg-black border border-gray-800 rounded-xl p-3 flex-1" />
            <button className="bg-yellow-500 text-black font-semibold px-4 rounded-xl flex items-center gap-2">
              <Mail className="h-4 w-4" /> Join
            </button>
          </form>
        </div>
        <div>
          <h4 className="font-extrabold mb-3 text-xl">Follow</h4>
          <div className="flex gap-3 text-gray-400">
            <span className="px-3 py-1 bg-gray-900 rounded-lg border border-gray-800">@moff_festival</span>
            <span className="px-3 py-1 bg-gray-900 rounded-lg border border-gray-800">#MOFF2025</span>
          </div>
        </div>
      </div>
      <SponsorsMarquee />
      <div className="py-8 text-center text-gray-500 text-sm">© {new Date().getFullYear()} Munich Online Film Festival. All rights reserved.</div>
    </footer>
  );
}

export default function MunichOnlineFilmFestival() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-serif">
        <Nav />
        <div className="pt-20">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/winner" element={<FinalistsPage onReadMore={setSelectedBlog} />} />
              <Route path="/winners" element={<WinnersPage onReadMore={setSelectedBlog} />} />
              <Route path="/jury" element={<JuryPage />} />
              <Route path="/criteria" element={<CriteriaPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/history" element={<HistoryPage />} />
                            <Route path="/participate" element={<ParticipatePage />} />
            </Routes>
          </AnimatePresence>
        </div>

        {/* Blog Modal */}
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="bg-gray-900 rounded-2xl max-w-2xl w-full p-8 relative">
              <button onClick={() => setSelectedBlog(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
              <h3 className="text-3xl font-extrabold mb-4 text-yellow-400">More about this film</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{selectedBlog}</p>
            </motion.div>
          </motion.div>
        )}

        <Footer />
      </div>
    </Router>
  );
}
