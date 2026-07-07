/*
 * A quiet, always-visible reassurance of the privacy model. Hidden from
 * print (bingo cards don't need it).
 */
export default function Footer() {
  return (
    <footer className="print-hidden border-t-4 border-ink/10 bg-paper/70 px-4 py-6">
      <div className="mx-auto max-w-6xl text-center text-sm font-semibold text-ink-soft">
        <p>
          🔒 Runs entirely in your browser. Student names, scores, and
          recordings stay on this device — nothing is uploaded or sent to any
          server.
        </p>
        <p className="mt-1 text-xs">
          LingoLaunch · a self-contained classroom tool · no accounts, no
          tracking, no external network requests
        </p>
      </div>
    </footer>
  );
}
