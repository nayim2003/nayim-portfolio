import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/ui/Preloader';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ClientEffects from '@/components/ui/ClientEffects';
import Cursor from '@/components/ui/Cursor';
import ChatBot from '@/components/ui/ChatBot';
import CommandPalette from '@/components/ui/CommandPalette';
import SearchOverlay from '@/components/ui/SearchOverlay';
import ShortcutsPanel from '@/components/ui/ShortcutsPanel';
import AchievementsPanel from '@/components/ui/AchievementsPanel';
import ShareModal from '@/components/ui/ShareModal';

import Hero from '@/components/sections/Hero';
import VideoIntro from '@/components/sections/VideoIntro';
import About from '@/components/sections/About';
import NowBanner from '@/components/sections/NowBanner';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Education from '@/components/sections/Education';
import Certifications from '@/components/sections/Certifications';
import Labs from '@/components/sections/Labs';
import Playground from '@/components/sections/Playground';
import ABTest from '@/components/sections/ABTest';
import PythonPlayground from '@/components/sections/PythonPlayground';
import SQLPlayground from '@/components/sections/SQLPlayground';
import Gallery from '@/components/sections/Gallery';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <ClientEffects />
      <Cursor />

      <Navbar />

      <main>
        <Hero />
        <VideoIntro />
        <About />
        <NowBanner />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Labs />
        <Playground />
        <ABTest />
        <PythonPlayground />
        <SQLPlayground />
        <Gallery />
        <Contact />
      </main>

      <Footer />
      <ChatBot />
      <CommandPalette />
      <SearchOverlay />
      <ShortcutsPanel />
      <AchievementsPanel />
      <ShareModal />
      <button className="back-to-top" id="backToTop" aria-label="Back to top">↑</button>
    </>
  );
}
