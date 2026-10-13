import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ASSETS } from './data/assets';
import { useSoundtrack } from './hooks/useSoundtrack';
import { MusicToggle } from './components/MusicToggle';
import { Opening } from './sections/Opening';
import { InvitationCard } from './sections/InvitationCard';
import { Welcome } from './sections/Welcome';
import { Schedule } from './sections/Schedule';
import { Venue } from './sections/Venue';
import { Closing } from './sections/Closing';

const THEME_GATE = '#160B07';
const THEME_PAGE = '#F4ECDD';

export default function App() {
  const [opened, setOpened] = useState(false);
  const [openingRun, setOpeningRun] = useState(0);
  const music = useSoundtrack(ASSETS.audio.soundtrack);

  // Match the browser chrome to what's on screen: dark gate, ivory page.
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', opened ? THEME_PAGE : THEME_GATE);
  }, [opened]);

  const replay = useCallback(() => {
    window.scrollTo({ top: 0 });
    setOpened(false);
    setOpeningRun((n) => n + 1);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!opened && <Opening key={openingRun} onOpen={music.start} onDone={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && <MusicToggle muted={music.muted || !music.started} onToggle={music.toggleMute} />}

      <main aria-hidden={!opened}>
        <InvitationCard revealed={opened} />
        <Welcome />
        <Schedule />
        <Venue />
        <Closing onReplay={replay} />
      </main>
    </>
  );
}
