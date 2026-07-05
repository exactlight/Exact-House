const steps = [
  {
    n: "1",
    title: "Tell Us About the House",
    body: "Fill out the short form or call us. A few basics about the property is all we need to get started.",
  },
  {
    n: "2",
    title: "Get Your Fair Cash Offer",
    body: "We'll look at the property, run our numbers, and make you a no-obligation cash offer — usually within 24 hours.",
  },
  {
    n: "3",
    title: "Close on Your Schedule",
    body: "Accept when you're ready. Pick the closing date that works for you and get paid — in as little as 7 days.",
  },
];

export default function HowItWorksSteps() {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {steps.map((s) => (
        <div key={s.n} className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-500 text-xl font-bold text-white">
            {s.n}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-brand-800">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-700/80">{s.body}</p>
        </div>
      ))}
    </div>
  );
}
