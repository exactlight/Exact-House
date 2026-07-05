export type SituationProblem = { title: string; body: string; solution: string };
export type SituationStep = { title: string; body: string };

export type Situation = {
  slug: string;
  name: string;
  formName: string;
  situationFieldValue: string;
  pageTitle: string;
  h1: string;
  heroIntro: string;
  highlight: { title: string; body: string } | null;
  problemsTitle: string;
  problemsSubtitle: string;
  problems: SituationProblem[];
  stepsTitle: string;
  steps: SituationStep[];
  ctaHeading: string;
  ctaBody: string;
};

export const situations: Situation[] = [
  {
    slug: "foreclosure",
    name: "Facing Foreclosure",
    formName: "contact-foreclosure",
    situationFieldValue: "Foreclosure",
    pageTitle: "Stop Foreclosure, Keep Your Equity | Forward Home Buyer",
    h1: "The Auction Doesn't Have to Happen",
    heroIntro:
      "If a sheriff's sale is on the horizon, you still have a real option: sell to us for cash before the auction, pay off the bank, and walk away with the equity you've earned.",
    highlight: {
      title: "You Haven't Lost the House Yet",
      body: "Until the gavel falls at the sheriff's sale, the home is still yours to sell — and selling it yourself almost always beats letting the bank auction it. We move fast enough to make that possible, even late in the process.",
    },
    problemsTitle: "What Foreclosure Really Costs You",
    problemsSubtitle:
      "The auction isn't just losing the house — here's what's actually at stake, and how a fast sale changes it",
    problems: [
      {
        title: "The Sheriff's Sale Wipes Out Your Equity",
        body: "At auction, the bank only cares about recovering what it's owed. Bidders show up looking for a bargain, not a fair price. Years of payments and appreciation — the equity that should be yours — can vanish in a single morning on the courthouse steps.",
        solution:
          "We buy the house before it ever reaches auction. We pay off the mortgage at closing, and the difference between our fair cash offer and what you owe goes to you — not to a courthouse bidder.",
      },
      {
        title: "A Completed Foreclosure Follows You for Years",
        body: "A foreclosure on your record makes it harder to rent an apartment, buy your next home, or borrow at a decent rate. Long after you've moved on, it keeps showing up at the worst moments.",
        solution:
          "A sale is not a foreclosure. When we close before the auction, the loan is paid off and the foreclosure never completes — your record shows a house that sold, not a house that was taken.",
      },
      {
        title: "There's No Time for a Traditional Listing",
        body: "An agent listing means repairs, showings, a buyer's financing, and an appraisal — months of steps you don't have. If any link in that chain breaks, you're back at square one with the auction date even closer.",
        solution:
          "We make a fair cash offer within 24 hours and can close in as little as 3 days. No repairs, no showings, no lender to wait on — we handle the paperwork and work directly against your auction date.",
      },
    ],
    stepsTitle: "How We Help You Beat the Auction",
    steps: [
      {
        title: "Reach Out Now",
        body: "Call or text 920-397-2922 or send the form. Tell us where you are in the process — even if the sale date is close, talk to us before you assume it's too late.",
      },
      {
        title: "Get a Fair Cash Offer in 24 Hours",
        body: "We look at the house as-is and make a straight cash offer within a day. No fees, no commissions, nothing off the top.",
      },
      {
        title: "Close Before the Sale Date",
        body: "We can close in as little as 3 days. The mortgage gets paid off, the foreclosure stops, and any remaining equity is yours in cash.",
      },
    ],
    ctaHeading: "Every Week Matters Right Now",
    ctaBody:
      "The closer the auction gets, the fewer options you have. One call costs you nothing and could save your equity. Call or text 920-397-2922 — we'll tell you honestly whether we can help.",
  },
  {
    slug: "behind-on-payments",
    name: "Behind on Payments",
    formName: "contact-behind-on-payments",
    situationFieldValue: "Behind on Payments",
    pageTitle: "Behind on Mortgage Payments? Sell Fast | Forward Home Buyer",
    h1: "Behind on Payments? You Have More Options Than You Think",
    heroIntro:
      "Missing mortgage payments doesn't make you a failure — it makes you human. Acting early is what protects your credit and your equity, and a fast cash sale is one clean way out.",
    highlight: {
      title: "Early Is Your Advantage",
      body: "Right now, before the bank escalates, you're still in control. You can sell on your own timeline, protect your credit from deeper damage, and leave with money in your pocket. That window is worth using.",
    },
    problemsTitle: "The Hole That Gets Deeper Every Month",
    problemsSubtitle:
      "Falling behind creates its own momentum — here's how a fast sale stops it",
    problems: [
      {
        title: "Late Fees and Missed Payments Snowball",
        body: "Each missed payment adds late fees and interest on top of what you already owe, and catching up means finding several payments' worth of cash at once. The math gets harder every month, not easier.",
        solution:
          "Selling for cash stops the snowball at today's number. We pay off the loan — including the arrears — at closing, and you keep whatever equity is left instead of watching fees eat it.",
      },
      {
        title: "Your Credit Takes a New Hit Every 30 Days",
        body: "Every month you fall further behind is another mark on your credit report. The damage compounds — and if things eventually escalate to foreclosure, it gets far worse and lasts far longer.",
        solution:
          "A quick sale caps the damage where it is. Once the loan is paid off, the late payments stop accruing, and you avoid the much bigger hit of a foreclosure ever starting.",
      },
      {
        title: "The Stress of Waiting for the Bank's Next Letter",
        body: "Living payment-to-payment on a house you can't quite afford means dreading the mail, screening calls, and losing sleep. That constant pressure makes it hard to think clearly about what's next.",
        solution:
          "You set the timeline, not the bank. Fair cash offer in 24 hours, close in as little as 3 days or whenever suits you, $0 in fees or commissions, and we handle the paperwork. You get breathing room and a fresh start.",
      },
    ],
    stepsTitle: "How to Get Ahead of It in 3 Steps",
    steps: [
      {
        title: "Talk to Us — No Judgment",
        body: "Call or text 920-397-2922 or fill out the form. Tell us how far behind you are and what you'd like to happen. We've heard it all, and we're not here to lecture.",
      },
      {
        title: "See Your Number in 24 Hours",
        body: "We make a fair cash offer on the house as-is within a day. You'll know exactly what you'd walk away with after the loan is paid off — before you commit to anything.",
      },
      {
        title: "Close on Your Timeline",
        body: "In as little as 3 days, or a few weeks out if you need time to line up your next place. The loan gets paid, the pressure lifts, and you move forward.",
      },
    ],
    ctaHeading: "Deal With It While It's Still Small",
    ctaBody:
      "The best time to act is before the bank forces the issue. Get a no-obligation cash offer, see your options in black and white, and decide from a position of strength. Call or text 920-397-2922.",
  },
  {
    slug: "divorce",
    name: "Divorce",
    formName: "contact-divorce",
    situationFieldValue: "Divorce",
    pageTitle: "Selling the House in a Divorce | Forward Home Buyer",
    h1: "One Less Thing to Fight About",
    heroIntro:
      "When a marriage ends, the house is often the biggest thing left to untangle. A fast, fair cash sale turns it into a clean number you can split — and lets both of you move on.",
    highlight: {
      title: "Fair to Both Sides, by Design",
      body: "We make one straightforward cash offer with $0 in fees or commissions. There's no staging, no negotiating through showings, no wondering if the other person got a better deal — just a clear number both parties can see and divide.",
    },
    problemsTitle: "Why the House Makes Divorce Harder",
    problemsSubtitle:
      "The family home creates specific problems in a divorce — a fast sale solves most of them",
    problems: [
      {
        title: "A Months-Long Listing Keeps You Tied Together",
        body: "A traditional sale means months of coordinating repairs, showings, and price drops with someone you're trying to separate from. Every decision is a new negotiation, and the settlement can't finish until the house does.",
        solution:
          "We make a fair cash offer within 24 hours and can close in as little as 3 days — or on whatever date works with your attorneys' timeline. One decision, one closing, done. We handle the paperwork.",
      },
      {
        title: "Two Names on One Mortgage",
        body: "As long as you both own the home, you're both on the hook. If the spouse living there misses a payment, both credit scores take the hit — and neither of you can fully qualify for your next place with this mortgage hanging over you.",
        solution:
          "The mortgage is paid off in full at closing. Both names come off, both credit reports are protected, and each of you is free to start over without shared debt in the background.",
      },
      {
        title: "Neither of You Wants to Prep It for Sale",
        body: "Getting a house market-ready during a divorce — repairs, painting, decluttering years of shared life — is emotionally and financially exhausting, and it's rarely clear who should pay for or do the work.",
        solution:
          "We buy the house exactly as it stands. No repairs, no cleaning, no staging. Take what you each want and leave the rest — we'll deal with everything left behind.",
      },
    ],
    stepsTitle: "A Simple Path Through It",
    steps: [
      {
        title: "Either of You Can Start",
        body: "Call or text 920-397-2922, or have your attorney or mediator reach out. We're comfortable working with both spouses and their counsel.",
      },
      {
        title: "One Clear Offer in 24 Hours",
        body: "A fair cash number with no fees or commissions to muddy the split. Both parties see the same figure and know exactly what there is to divide.",
      },
      {
        title: "Close and Go Your Separate Ways",
        body: "We close on the timeline your settlement requires — fast or scheduled. The mortgage is paid, the proceeds are split, and the house is no longer between you.",
      },
    ],
    ctaHeading: "Ready to Take the House Off the Table?",
    ctaBody:
      "You can't finish this chapter while the house is still open. Get a fair cash offer both sides can work with — call or text 920-397-2922, no obligation.",
  },
  {
    slug: "inherited-property",
    name: "Inherited Property",
    formName: "contact-inherited-property",
    situationFieldValue: "Inherited Property",
    pageTitle: "Sell an Inherited House for Cash | Forward Home Buyer",
    h1: "You Inherited a House. You Didn't Inherit the Obligation to Keep It.",
    heroIntro:
      "A parent's or relative's home comes with taxes, upkeep, and decades of belongings — often while you're still grieving. We buy inherited houses as-is, on your timeline, with real respect for what the place meant.",
    highlight: {
      title: "Take the Memories, Leave the Rest",
      body: "Keep the photo albums, the workbench, whatever matters. Leave the furniture, the boxes in the basement, all of it — we'll handle everything that stays. You don't have to spend weekends emptying a house full of memories.",
    },
    problemsTitle: "The Weight an Inherited House Puts on You",
    problemsSubtitle:
      "These are the problems heirs actually face — and how a simple cash sale lifts them",
    problems: [
      {
        title: "It Costs Money Every Month It Sits",
        body: "Property taxes, insurance, utilities, lawn care, and winter heat to keep the pipes from freezing — an empty inherited house quietly drains the estate (or your own pocket) every month, whether anyone visits it or not.",
        solution:
          "We can close in as little as 3 days once the estate is ready, or hold to whatever schedule probate requires. The carrying costs stop, and the home becomes cash the family can actually use.",
      },
      {
        title: "You Live Too Far Away to Deal With It",
        body: "Managing a Wisconsin property from another city or state means trips you don't have time for, contractors you can't supervise, and a nagging worry about what's happening to the place between visits.",
        solution:
          "We buy the house as-is, sight-unseen problems and all. Most of the process can be handled remotely — we do the paperwork, and you never have to make another trip just to babysit the property.",
      },
      {
        title: "Multiple Heirs, Multiple Opinions",
        body: "When siblings co-own a house, someone wants to sell, someone wants to rent it out, and someone can't decide. The disagreement strains relationships while the house sits and costs everyone money.",
        solution:
          "One fair cash offer with $0 in fees gives every heir the same clear number. A fast, even split is often the cleanest way to settle the question and keep the family relationships intact.",
      },
    ],
    stepsTitle: "How Selling an Inherited House Works",
    steps: [
      {
        title: "Tell Us About the Property",
        body: "Call or text 920-397-2922 or use the form. We work with executors, personal representatives, and heirs, and we're happy to coordinate with the estate's attorney.",
      },
      {
        title: "Get a Fair Cash Offer in 24 Hours",
        body: "We make an as-is offer — no inspections to schedule, no repairs to argue over, no commissions coming out of the estate.",
      },
      {
        title: "Close When the Estate Is Ready",
        body: "In as little as 3 days, or aligned with the probate timeline. Take what you want from the house, leave the rest, and we handle it from there.",
      },
    ],
    ctaHeading: "Let the House Stop Being a Burden",
    ctaBody:
      "You're allowed to honor someone's memory without keeping their house. Get a no-pressure cash offer and see what's possible — call or text 920-397-2922.",
  },
  {
    slug: "tired-landlord",
    name: "Tired Landlord",
    formName: "contact-tired-landlord",
    situationFieldValue: "Tired Landlord",
    pageTitle: "Sell Your Rental Property for Cash | Forward Home Buyer",
    h1: "Done Being a Landlord? Cash Out and Get Your Life Back",
    heroIntro:
      "The 2 a.m. calls, the turnover costs, the tenant who's always a little behind — at some point the rent stops being worth it. We buy rentals as-is, tenants and all, so you can exit without one more headache.",
    highlight: {
      title: "You Don't Have to Empty It First",
      body: "Tenants in place? Month-to-month? Behind on rent? A unit that needs a full turn? We buy the property exactly as it operates today. No evictions to manage, no make-ready costs, no final round of landlord work before you're free.",
    },
    problemsTitle: "Why Rentals Stop Being Worth It",
    problemsSubtitle:
      "The reasons landlords burn out are real — here's how selling for cash resolves each one",
    problems: [
      {
        title: "The Numbers Quietly Went Negative",
        body: "Between rising taxes, insurance, maintenance on an aging building, and the occasional vacancy or unpaid month, plenty of rentals now lose money. You're working for the property instead of the other way around.",
        solution:
          "A fair cash offer within 24 hours, $0 in fees or commissions, lets you pull your equity out of a losing asset and put it somewhere that pays you — without spending another dime getting the property 'sale ready.'",
      },
      {
        title: "Selling the Usual Way Means Fighting Your Own Tenants",
        body: "Listing a tenant-occupied property is a nightmare: coordinating showings around renters who don't want strangers walking through, buyers who want it delivered vacant, and financing that stalls over the condition of a well-worn unit.",
        solution:
          "We buy with tenants in place and don't need showings, staging, or a bank's approval. One walkthrough, one offer, one closing — your tenants become our responsibility, not your problem.",
      },
      {
        title: "The Job Never Clocks Out",
        body: "A furnace failure on the coldest night of a Wisconsin winter, a leak while you're on vacation, a lease dispute at the worst time — being a landlord means never being fully off duty, and the mental load adds up over years.",
        solution:
          "Close in as little as 3 days and hang it up for good. We handle the paperwork; you hand over the keys and stop carrying a business in the back of your mind.",
      },
    ],
    stepsTitle: "Your Exit in 3 Steps",
    steps: [
      {
        title: "Tell Us About the Property",
        body: "Call or text 920-397-2922. Single-family rental, duplex, or a small portfolio — occupied or vacant, we want the details as they really are.",
      },
      {
        title: "Get Your Cash Offer in 24 Hours",
        body: "A fair as-is number with no commissions and no repair credits to negotiate. What we offer is what you get.",
      },
      {
        title: "Close and Retire From Landlording",
        body: "As fast as 3 days, or timed to your lease situation. Deposits and tenant matters transfer to us at closing — you walk away clean.",
      },
    ],
    ctaHeading: "The Easiest Property Decision You'll Make This Year",
    ctaBody:
      "You've earned an exit that doesn't require three more months of landlord work. Get your no-obligation cash offer — call or text 920-397-2922.",
  },
  {
    slug: "needs-repairs",
    name: "Needs Repairs",
    formName: "contact-needs-repairs",
    situationFieldValue: "Needs Repairs",
    pageTitle: "Sell a House That Needs Work, As-Is | Forward Home Buyer",
    h1: "Sell It Exactly As It Sits — We Mean Exactly",
    heroIntro:
      "Bad roof, wet basement, ancient furnace, foundation cracks — you don't have to fix any of it. We buy houses in any condition for cash, and the condition is our problem the moment we close.",
    highlight: {
      title: "\"As-Is\" Isn't a Slogan Here",
      body: "No punch list, no inspection negotiation, no cleaning. We've bought houses other buyers wouldn't walk through. Whatever you're embarrassed about, we've seen worse — and we'll still make you a fair offer.",
    },
    problemsTitle: "Why a House That Needs Work Feels Unsellable",
    problemsSubtitle:
      "The traditional market punishes homes with problems — we're built for them",
    problems: [
      {
        title: "The Repair Bill Is Money You Don't Have",
        body: "A roof, a furnace, a foundation fix — major repairs run into the tens of thousands, and there's no guarantee you'd get that money back at sale. Fixing a house just so you can leave it makes no sense.",
        solution:
          "We price the house with the repairs in mind and buy it as-is for cash. You spend $0 on the house, pay $0 in fees or commissions, and skip straight to the closing check.",
      },
      {
        title: "Regular Buyers' Financing Falls Apart on Houses Like Yours",
        body: "Buyers using typical home loans usually can't close on a house with major defects — lenders and appraisers flag the problems and the deal dies. You can list it, wait months, and still end up back where you started.",
        solution:
          "We pay cash, so there's no lender, no appraisal condition, and no inspection contingency to blow up the deal. When we say we're closing, we close — in as little as 3 days.",
      },
      {
        title: "The Problems Get Worse While You Wait",
        body: "A leaking roof becomes water damage; a damp basement becomes mold; a Wisconsin winter turns small issues into big ones. Every season you hold a deteriorating house, it's worth a little less.",
        solution:
          "A fair cash offer within 24 hours lets you get out before the next round of damage. Lock in today's value instead of watching it slide.",
      },
    ],
    stepsTitle: "From Problem House to Cash in 3 Steps",
    steps: [
      {
        title: "Tell Us What's Wrong With It",
        body: "Call or text 920-397-2922 and be blunt — roof, mold, fire damage, hoarding, unfinished projects. The honest version helps us give you an accurate offer fast.",
      },
      {
        title: "Get a Fair As-Is Offer in 24 Hours",
        body: "We factor in the work it needs and make a straight cash offer. No lowball games, no renegotiating after an inspection.",
      },
      {
        title: "Take What You Want, Leave the Rest",
        body: "Close in as little as 3 days or on your schedule. Don't clean, don't haul anything — grab what matters to you and hand us the keys.",
      },
    ],
    ctaHeading: "Stop Doing the Math on Repairs",
    ctaBody:
      "You don't need a contractor, a loan, or another season of putting it off. You need one fair number for the house as it sits. Call or text 920-397-2922 to get it.",
  },
  {
    slug: "relocating",
    name: "Relocating",
    formName: "contact-relocating",
    situationFieldValue: "Relocating",
    pageTitle: "Relocating? Sell Your WI House Fast | Forward Home Buyer",
    h1: "Your New Life Has a Start Date. Your House Sale Should Too.",
    heroIntro:
      "A new job, a family move, a fresh start somewhere else — whatever's pulling you forward, an unsold house in Wisconsin shouldn't hold you back. We buy it for cash on a date you pick.",
    highlight: {
      title: "A Closing Date You Can Plan Around",
      body: "Traditional sales close whenever the buyer's lender is ready. We close when you need to be gone — in as little as 3 days, or timed to your last day of work, the movers, or the school calendar. You pick the date; we hit it.",
    },
    problemsTitle: "What an Unsold House Does to a Move",
    problemsSubtitle:
      "Relocating on a deadline exposes everything slow about a normal sale — here's the fix",
    problems: [
      {
        title: "Two Housing Payments at Once",
        body: "Once you leave, every month the Wisconsin house doesn't sell is a month of double costs — the old mortgage, taxes, and utilities on top of rent or a new mortgage in your new city. It drains the savings you need for the move itself.",
        solution:
          "We close before you're stuck paying double — or within days of your departure if you've already left. One fair cash offer, $0 in fees, and the drain stops.",
      },
      {
        title: "You Can't Manage a Listing From 1,000 Miles Away",
        body: "Showings, lawn care, repair requests, and a house that has to look lived-in but empty — running a traditional sale from another state is a part-time job at the exact moment you're busiest.",
        solution:
          "No showings, no staging, no repair negotiations. We buy as-is, handle the paperwork, and can complete almost everything remotely after you've gone.",
      },
      {
        title: "Moving a Whole House Is Its Own Nightmare",
        body: "The stuff that isn't worth shipping — old furniture, garage clutter, the basement you never sorted — becomes a frantic problem in the final week. Junk hauling and storage costs pile onto an already expensive move.",
        solution:
          "Take what you want and leave the rest. Pack what's coming with you; whatever stays in the house is ours to deal with, not yours.",
      },
    ],
    stepsTitle: "Sell Before the Moving Truck Arrives",
    steps: [
      {
        title: "Tell Us Your Deadline",
        body: "Call or text 920-397-2922 with the house details and your move date. The timeline drives everything, so that's where we start.",
      },
      {
        title: "Get a Cash Offer in 24 Hours",
        body: "A fair as-is offer with no commissions coming out of it — so you know exactly what you're carrying into the new city.",
      },
      {
        title: "Close on Your Date and Go",
        body: "As little as 3 days, or the exact week that fits your move. Keys handed over, cash in hand, nothing left behind you.",
      },
    ],
    ctaHeading: "Leave Wisconsin Without a Loose End",
    ctaBody:
      "Start the next chapter with the house already handled. Get your no-obligation cash offer today — call or text 920-397-2922.",
  },
  {
    slug: "tax-liens",
    name: "Tax Liens",
    formName: "contact-tax-liens",
    situationFieldValue: "Tax Liens",
    pageTitle: "Sell a House With Tax Liens for Cash | Forward Home Buyer",
    h1: "A Tax Lien Doesn't Mean You Can't Sell",
    heroIntro:
      "Back property taxes, an IRS lien, a judgment on the title — liens complicate a sale, but they don't block it. We buy houses with liens, pay them off at closing, and get you whatever equity remains.",
    highlight: {
      title: "The Lien Gets Paid From the Sale — Not From Your Pocket",
      body: "You don't need cash on hand to clear a lien before selling. The title company pays it directly out of the proceeds at closing. You show up owing; you leave clear, with the rest of your equity in hand.",
    },
    problemsTitle: "How Liens Trap Homeowners",
    problemsSubtitle:
      "Tax debt on a house creates a squeeze that gets tighter with time — here's the way out",
    problems: [
      {
        title: "Interest and Penalties Grow Faster Than You Can Pay",
        body: "Tax debt doesn't sit still. Interest and penalties stack on top of the original balance month after month, so the amount standing between you and your equity keeps growing even when you're doing your best to chip at it.",
        solution:
          "Selling for cash freezes the problem at today's balance. We move from offer to closing in days, the lien is paid off before it grows further, and every dollar of remaining equity is yours.",
      },
      {
        title: "If the Taxing Authority Acts First, You Lose the Most",
        body: "When a county or the IRS eventually forces the issue, the process is built to collect the debt — not to get you a fair price for your home. Waiting until they act is the most expensive possible outcome.",
        solution:
          "Selling on your own terms, before it comes to that, means a fair cash offer instead of a forced process. You settle the debt and keep the difference, rather than losing the home and the equity together.",
      },
      {
        title: "Traditional Buyers Run From Title Problems",
        body: "Liens show up in the title search, and typical buyers — and their lenders — walk away or demand you clear everything before closing. That leaves you stuck: you can't sell without money, and you can't get money without selling.",
        solution:
          "We deal with lien payoffs all the time. Our title company works out the exact payoff figures, we handle the paperwork, and it's all resolved in one closing with $0 in fees or commissions from you.",
      },
    ],
    stepsTitle: "How We Clear the Lien and Close",
    steps: [
      {
        title: "Tell Us What's Owed",
        body: "Call or text 920-397-2922. Share what you know about the lien — county taxes, IRS, or a judgment. Rough numbers are fine; the title search confirms the rest.",
      },
      {
        title: "Get an Offer With the Payoff Mapped Out",
        body: "Within 24 hours you get a fair cash offer and a clear picture: what the liens absorb, and what lands in your pocket at closing.",
      },
      {
        title: "Close and Walk Away Clear",
        body: "In as little as 3 days, the liens are paid through closing, the debt is behind you, and the remaining equity is yours.",
      },
    ],
    ctaHeading: "Get Out From Under It",
    ctaBody:
      "The debt only grows while you wait, and your options only shrink. Find out today what you'd walk away with — call or text 920-397-2922 for a no-obligation offer.",
  },
  {
    slug: "vacant-property",
    name: "Vacant Property",
    formName: "contact-vacant-property",
    situationFieldValue: "Vacant Property",
    pageTitle: "Sell a Vacant House Fast for Cash | Forward Home Buyer",
    h1: "An Empty House Is a Liability With a Roof",
    heroIntro:
      "Whether it emptied out after a move, a tenant, or a family change, a vacant Wisconsin house costs money and collects risk every day it sits. We buy vacant properties as-is — fast, before the next thing goes wrong.",
    highlight: {
      title: "Wisconsin Winters Are Brutal on Empty Houses",
      body: "One cold snap with the heat off — or a furnace that quits with nobody home to notice — and a burst pipe can flood the place for days before anyone finds it. Every winter a vacant house sits is a roll of the dice.",
    },
    problemsTitle: "What a Vacant House Really Costs",
    problemsSubtitle:
      "Empty doesn't mean cheap — here's what the house is doing to you while it sits, and how to stop it",
    problems: [
      {
        title: "Carrying Costs With Nothing Coming Back",
        body: "Taxes, insurance, utilities kept on to protect the pipes, lawn mowing or snow clearing so it doesn't look abandoned — a vacant house bills you every month and gives you nothing in return.",
        solution:
          "We can close in as little as 3 days, and the meter stops. One fair cash offer, $0 in fees or commissions, and the monthly drain becomes money in your account instead.",
      },
      {
        title: "Insurance Gets Expensive — or Disappears",
        body: "Insurers treat vacant homes as high-risk. Many standard policies limit or exclude coverage once a house sits empty, and dedicated vacant-home coverage costs substantially more. You could be paying extra for thinner protection — or unknowingly not covered at all.",
        solution:
          "Selling fast ends the coverage puzzle entirely. From our cash offer to closing is days, not the months a listing takes — a short enough window that you're not financing and insuring an empty building all year.",
      },
      {
        title: "Empty Houses Attract Trouble",
        body: "Break-ins, stolen copper, vandalism, squatters, and code-violation letters from the city — an obviously empty house draws all of it. Each incident costs money and makes the property harder to sell.",
        solution:
          "We buy the house as-is, right now, whatever shape it's in — even if something has already happened to it. Take anything you still want from the property and leave the rest; it becomes our responsibility at closing.",
      },
    ],
    stepsTitle: "From Sitting Empty to Sold",
    steps: [
      {
        title: "Tell Us About the House",
        body: "Call or text 920-397-2922. It doesn't matter how long it's been empty or why — we just need the address and the basics.",
      },
      {
        title: "Get a Cash Offer in 24 Hours",
        body: "We make a fair as-is offer fast. No need to turn utilities back on, stage it, or make it presentable for showings.",
      },
      {
        title: "Close in Days, Not Seasons",
        body: "As little as 3 days, or whenever works for you. We handle the paperwork, the house stops costing you money, and the risk is off your plate.",
      },
    ],
    ctaHeading: "Don't Let It Sit Through Another Winter",
    ctaBody:
      "Every month empty is money out and risk up. Turn the vacant house into cash before the next repair bill or cold snap decides for you — call or text 920-397-2922.",
  },
];

export function getSituation(slug: string) {
  return situations.find((s) => s.slug === slug);
}
