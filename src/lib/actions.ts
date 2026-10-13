import { INVITATION } from '../data/invitation';

const { event, hosts, date, schedule, venue } = INVITATION;

const title = `${event.title.en} — ${hosts.surname} Family`;
const location = `${venue.line1}, ${venue.line2}`;
const details = schedule.map((item) => `${item.time.en} — ${item.title.en}`).join('\n');

/** 2026-10-24T09:00:00+05:30 → 20261024T033000Z */
const utcStamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

const escapeIcs = (text: string) => text.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');

function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${utcStamp(date.start)}/${utcStamp(date.end)}`,
    details,
    location,
    ctz: 'Asia/Kolkata',
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function downloadIcs() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Chhatbar Family//Griha Pravesh//EN',
    'BEGIN:VEVENT',
    `UID:griha-pravesh-${utcStamp(date.start)}@chhatbar`,
    `DTSTAMP:${utcStamp(new Date().toISOString())}`,
    `DTSTART:${utcStamp(date.start)}`,
    `DTEND:${utcStamp(date.end)}`,
    `SUMMARY:${escapeIcs(title)}`,
    `DESCRIPTION:${escapeIcs(details)}`,
    `LOCATION:${escapeIcs(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'vastu-pooja-griha-pravesh.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

/** Apple devices get an .ics file (opens Calendar); everyone else gets Google Calendar. */
export function addToCalendar() {
  const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
  if (isApple) {
    downloadIcs();
  } else {
    window.open(googleCalendarUrl(), '_blank', 'noopener');
  }
}
