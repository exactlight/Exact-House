/** The live site's 7 benefit chips shown in the hero. */
const benefits = [
  "We Buy When Others Can't or Won't",
  "Save on Moving and Storage, Take Only What You Want",
  "Owe Too Much? We Can Help",
  "We Buy Mobile Homes Too",
  "Think You Can't Sell It? We Have a Solution",
  "Have Other Debts? We Can Roll It In",
  "We Pride Ourselves on Solving Tough Real Estate Problems",
];

export default function HeroBenefits() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {benefits.map((b, i) => (
        <div
          key={b}
          className={`flex items-center gap-3 rounded-[10px] bg-white/10 p-3 text-[0.95rem] backdrop-blur ${
            i === benefits.length - 1 ? "sm:col-span-2" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 fill-accent-500"
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
