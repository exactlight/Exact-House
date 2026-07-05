/** The live site's 3-step section: white cards, orange icon circles. */
const steps = [
  {
    icon: (
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
    ),
    title: "Contact Us",
    body: "Fill out the form or call us. It takes less than 2 minutes.",
  },
  {
    icon: (
      <path d="M22 9h-4.79l-4.38-6.56c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM12 4.8L14.8 9H9.2L12 4.8zM18.5 19l-12.99.01L3.31 11H20.7l-2.2 8zM12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    ),
    title: "Find a Solution",
    body: "We'll work with you to understand your situation and create a solution that works for you.",
  },
  {
    icon: (
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
    ),
    title: "Close & Get Paid",
    body: "Choose your closing date - as quick as 3 days or on your timeline. Walk away with cash in hand. We handle all the paperwork and pay all closing costs.",
  },
];

export default function HowItWorksSteps() {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {steps.map((s) => (
        <div
          key={s.title}
          className="rounded-[15px] bg-white p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-500 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-full w-full fill-white">
              {s.icon}
            </svg>
          </div>
          <h3 className="mb-3 text-2xl font-semibold text-brand-800">{s.title}</h3>
          <p className="text-[#666]">{s.body}</p>
        </div>
      ))}
    </div>
  );
}
