import Link from "next/link";

export default function Footer() {
  return (
    <footer className="print-hidden border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="font-semibold text-foreground">DealLens</p>
            <p className="mt-1">
              A free deal analyzer for new real estate investors. Everything runs in your
              browser — no account, and your numbers never leave your device.
            </p>
          </div>
          <nav className="flex gap-6">
            <Link href="/analyze" className="hover:text-foreground">Analyze</Link>
            <Link href="/deals" className="hover:text-foreground">My deals</Link>
            <Link href="/learn" className="hover:text-foreground">Learn</Link>
          </nav>
        </div>
        <p className="mt-6 text-xs text-faint">
          DealLens is an educational tool. Its outputs are estimates from your own inputs and
          standard formulas — not an appraisal, and not financial, legal, or investment advice.
          Verify every number (especially ARV and rehab costs) before making an offer.
        </p>
      </div>
    </footer>
  );
}
