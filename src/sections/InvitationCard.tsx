import { motion, useReducedMotion } from 'framer-motion';
import { ASSETS } from '../data/assets';
import { INVITATION } from '../data/invitation';
import { Divider } from '../components/Ornament';
import { EASE_GENTLE } from '../components/Reveal';

/**
 * The invitation itself: everything a guest needs on one screen, laid over the
 * blank parchment card. Sizes use container units so the card scales as a
 * single piece on any phone.
 */
export function InvitationCard({ revealed }: { revealed: boolean }) {
  const reduce = useReducedMotion();
  const { invocation, event, hosts, date, schedule, venue } = INVITATION;

  const lines = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.17, delayChildren: 0.5 } },
  };
  const line = {
    hidden: { opacity: 0, y: reduce ? 0 : 8 },
    shown: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE_GENTLE } },
  };
  const state = revealed ? 'shown' : 'hidden';

  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-4 pb-6 pt-[4.5rem]">
      <motion.div
        className="invite-card"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 1.5, ease: EASE_GENTLE }}
      >
        <img src={ASSETS.images.invitationCard} alt="" className="absolute inset-0 h-full w-full" />

        <motion.div className="invite-content" variants={lines} initial="hidden" animate={state}>
          <motion.p variants={line} lang="gu" className="ic-invocation font-gujarati">
            {invocation}
          </motion.p>
          <motion.p variants={line} className="ic-eyebrow font-display">
            The {hosts.surname} family
          </motion.p>
          <motion.p variants={line} className="ic-invite font-serif">
            cordially invites you to the
          </motion.p>
          <motion.h1 variants={line} lang="gu" className="ic-title-gu font-gujarati">
            {event.title.gu}
          </motion.h1>
          <motion.p variants={line} className="ic-title-en font-display">
            {event.title.en}
          </motion.p>
          <motion.div variants={line} className="ic-divider">
            <Divider className="!w-full" />
          </motion.div>
          <motion.p variants={line} className="ic-date font-serif">
            {date.en}
          </motion.p>
          <motion.p variants={line} lang="gu" className="ic-date-gu font-gujarati">
            {date.gu}
          </motion.p>
          <motion.p variants={line} className="ic-times font-display">
            {schedule.map((item, i) => (
              <span key={item.id}>
                {i > 0 && <span className="ic-dot"> · </span>}
                {item.short} {item.time.en}
              </span>
            ))}
          </motion.p>
          <motion.p variants={line} className="ic-venue font-serif">
            {venue.line1}, {venue.line2}
          </motion.p>
          <motion.p variants={line} className="ic-hosts font-serif">
            {hosts.couples.join('  ·  ')}
          </motion.p>
        </motion.div>

        {revealed && !reduce && <div className="card-sheen" aria-hidden="true" />}
      </motion.div>

      <motion.div
        className="mt-5 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 1.2, delay: revealed ? 3.4 : 0 }}
        aria-hidden="true"
      >
        <span className="label">Scroll</span>
        <span className="scroll-line" />
      </motion.div>
    </section>
  );
}
