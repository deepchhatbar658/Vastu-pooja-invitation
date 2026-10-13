import { Fragment } from 'react';
import { CalendarPlus } from 'lucide-react';
import { INVITATION } from '../data/invitation';
import { ScheduleItem } from '../types/invitation';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/Ornament';
import { addToCalendar } from '../lib/actions';

function ScheduleCard({ item }: { item: ScheduleItem }) {
  return (
    <article className="paper-card flex min-h-[184px] overflow-hidden rounded-2xl">
      <div className="relative w-[36%] shrink-0">
        <img src={item.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-center px-5 py-5">
        <p className="font-serif text-[1.8rem] font-semibold leading-none text-maroon">
          {item.time.en}
          <span className="ml-1.5 text-sm font-normal italic text-ink-soft">onwards</span>
        </p>
        <p lang="gu" className="font-gujarati mt-1.5 text-[0.85rem] text-ink-soft">
          {item.time.gu}
        </p>
        <span className="my-3.5 block h-px w-10 bg-gold/50" aria-hidden="true" />
        <h3 lang="gu" className="font-gujarati text-[1.3rem] font-semibold leading-snug text-maroon-deep">
          {item.title.gu}
        </h3>
        <p className="label mt-1 !text-gold">{item.title.en}</p>
        <p className="font-serif mt-2 text-[1.05rem] italic leading-snug text-ink-soft">{item.note}</p>
      </div>
    </article>
  );
}

export function Schedule() {
  const { date, schedule } = INVITATION;

  return (
    <section className="section" aria-label="Date and schedule">
      <Reveal>
        <SectionHeading eyebrow="Save the date" gu="શુભ મુહૂર્ત" en={date.en}>
          <p lang="gu" className="font-gujarati mt-0.5 text-sm text-ink-soft">
            {date.gu}
          </p>
        </SectionHeading>
      </Reveal>

      <div className="mt-10">
        {schedule.map((item, i) => (
          <Fragment key={item.id}>
            {i > 0 && (
              <div className="flex flex-col items-center py-1.5" aria-hidden="true">
                <span className="h-6 w-px bg-gold/50" />
                <span className="my-1 h-1.5 w-1.5 rotate-45 border border-gold" />
                <span className="h-6 w-px bg-gold/50" />
              </div>
            )}
            <Reveal delay={0.1}>
              <ScheduleCard item={item} />
            </Reveal>
          </Fragment>
        ))}
      </div>

      <Reveal className="mt-10 flex justify-center">
        <button type="button" onClick={addToCalendar} className="btn-outline">
          <CalendarPlus size={17} strokeWidth={1.6} />
          Add to calendar
        </button>
      </Reveal>
    </section>
  );
}
