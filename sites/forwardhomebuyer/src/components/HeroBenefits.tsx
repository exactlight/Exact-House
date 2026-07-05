/** Benefit chips shown in the hero. */
const benefits = [
  "No Fees or Commissions",
  "Close in as Little as 3 Days",
  "Any Condition, Any Situation",
  "Fair Cash Offer in 24 Hours",
  "No Showings, No Open Houses",
  "We Handle All the Paperwork",
];

export default function HeroBenefits() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {benefits.map((b) => (
        <div
          key={b}
          className="flex items-center gap-3 rounded-lg bg-white/10 p-3 text-[0.95rem] font-semibold backdrop-blur"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 fill-gold-400"
            aria-hidden
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <span>{b}</span>
        </div>
      ))}
    </div>
  );
}
