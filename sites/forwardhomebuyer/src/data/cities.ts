export type City = {
  slug: string;     // URL slug, e.g. "madison"
  name: string;     // display name, e.g. "Madison"
  county: string;   // e.g. "Dane County"
  formName: string; // "contact-" + slug
  intro: string;    // 2-3 sentence hero intro, unique per city, conversion-focused
  localNote: string; // 1-2 sentences of genuine local flavor/credibility
};

export const cities: City[] = [
  {
    slug: "madison",
    name: "Madison",
    county: "Dane County",
    formName: "contact-madison",
    intro:
      "Selling a Madison house doesn't have to mean months of showings, repair negotiations, and waiting on a buyer's financing. Get a fair cash offer within 24 hours, sell completely as-is, and pay $0 in fees or commissions. You pick the closing date — as soon as 3 days or whenever works for you.",
    localNote:
      "From near-east-side bungalows off Atwood to ranches on the west side and everything between the lakes, we buy houses in every Madison neighborhood and all across Dane County — no matter the condition.",
  },
  {
    slug: "milwaukee",
    name: "Milwaukee",
    county: "Milwaukee County",
    formName: "contact-milwaukee",
    intro:
      "Whether you own a duplex on the north side, a Bay View cottage, or a house that's seen better days, you can sell it for cash without fixing a thing. We make fair offers within 24 hours, charge zero fees or commissions, and close on your schedule — in as little as 3 days if you need it.",
    localNote:
      "Milwaukee's housing stock is some of the oldest in Wisconsin, and we're comfortable with all of it — century-old two-stories, converted duplexes, and homes that need serious work anywhere in Milwaukee County.",
  },
  {
    slug: "waukesha",
    name: "Waukesha",
    county: "Waukesha County",
    formName: "contact-waukesha",
    intro:
      "Skip the listing, the showings, and the repair requests. Tell us about your Waukesha property and you'll have a fair cash offer in hand within 24 hours — no fees, no commissions, and no obligation to accept. If the number works, we can close in as little as 3 days.",
    localNote:
      "From the historic homes near downtown and the Fox River to newer subdivisions on the edge of town, we buy houses throughout Waukesha and the surrounding county in any condition.",
  },
  {
    slug: "racine",
    name: "Racine",
    county: "Racine County",
    formName: "contact-racine",
    intro:
      "If your Racine house needs work you can't afford — or you simply don't want strangers walking through it for months — there's a simpler way. We buy houses as-is for cash, cover the closing costs, and never charge fees or commissions. Request your offer today and have it within 24 hours.",
    localNote:
      "Racine's older neighborhoods near Lake Michigan and the Root River are full of solid but aging homes, and that's exactly the kind of property we buy — as-is, throughout Racine County.",
  },
  {
    slug: "janesville",
    name: "Janesville",
    county: "Rock County",
    formName: "contact-janesville",
    intro:
      "You don't need to repaint, repair, or even clean out your Janesville house to sell it. We'll make you a fair cash offer within 24 hours, buy the property exactly as it sits, and let you choose the closing date — 3 days out or 3 months. No fees, no commissions, no showings.",
    localNote:
      "As a longtime hub along the Rock River, Janesville has plenty of hardworking older homes, and we buy them in any condition across Rock County.",
  },
  {
    slug: "beloit",
    name: "Beloit",
    county: "Rock County",
    formName: "contact-beloit",
    intro:
      "Need to sell a Beloit house fast — maybe one that's inherited, behind on payments, or just too much to maintain? Get a no-obligation cash offer within 24 hours and close in as little as 3 days. You pay nothing in fees or commissions, and you don't have to fix or clean anything.",
    localNote:
      "From the neighborhoods near downtown's riverfront to homes on either side of the stateline area, we buy Beloit and Rock County properties as-is.",
  },
  {
    slug: "brookfield",
    name: "Brookfield",
    county: "Waukesha County",
    formName: "contact-brookfield",
    intro:
      "Even in a sought-after suburb like Brookfield, listing a home means showings, inspections, and weeks of uncertainty. Selling to us means a fair cash offer within 24 hours, zero fees or commissions, and a closing date you control. Sell as-is and skip the prep work entirely.",
    localNote:
      "Many Brookfield homes are ranches and colonials from the 1960s and 70s that need updating — we buy them as they are, along the Bluemound corridor and throughout Waukesha County.",
  },
  {
    slug: "new-berlin",
    name: "New Berlin",
    county: "Waukesha County",
    formName: "contact-new-berlin",
    intro:
      "Your New Berlin house can be sold this week — without an agent, without repairs, and without a single showing. We make fair cash offers within 24 hours and close on your timeline, whether that's 3 days from now or after you've found your next place. You keep the full offer: $0 in fees or commissions.",
    localNote:
      "New Berlin's mix of established ranches on larger lots and newer subdivisions gives us plenty to work with — we buy in every part of the city and across Waukesha County.",
  },
  {
    slug: "menomonee-falls",
    name: "Menomonee Falls",
    county: "Waukesha County",
    formName: "contact-menomonee-falls",
    intro:
      "There's no reason to spend thousands preparing a Menomonee Falls home for market when a cash buyer will take it exactly as it is. Request an offer and hear back within 24 hours — no fees, no commissions, no cleaning, no showings. Close in as little as 3 days or pick a date that fits your plans.",
    localNote:
      "From older capes near the Village area to ranch homes in established neighborhoods, we buy houses throughout Menomonee Falls and the rest of Waukesha County in any condition.",
  },
  {
    slug: "muskego",
    name: "Muskego",
    county: "Waukesha County",
    formName: "contact-muskego",
    intro:
      "Selling a Muskego property shouldn't drag on for months. Send us the address and get a fair cash offer within 24 hours — then close in as few as 3 days if you're ready, or later if you're not. We buy as-is, and there are never any fees or commissions.",
    localNote:
      "Whether it's a home near Little Muskego Lake, an older lake cottage, or a house on acreage, we buy all types of Muskego and Waukesha County properties as they stand.",
  },
  {
    slug: "pewaukee",
    name: "Pewaukee",
    county: "Waukesha County",
    formName: "contact-pewaukee",
    intro:
      "A traditional sale in Pewaukee means staging, showings, and hoping a financed buyer doesn't fall through. A sale to us means a fair cash offer within 24 hours, an as-is purchase with nothing to repair or clean, and a closing in as little as 3 days. You pay $0 in fees or commissions either way it goes.",
    localNote:
      "Pewaukee Lake draws buyers from all over southeastern Wisconsin, but we buy more than lake homes — older village houses and dated properties across Waukesha County are welcome too.",
  },
  {
    slug: "sussex",
    name: "Sussex",
    county: "Waukesha County",
    formName: "contact-sussex",
    intro:
      "If you'd rather not deal with agents, open houses, or repair lists, selling your Sussex home for cash is the direct route. You'll have a fair, no-obligation offer within 24 hours and can close on the date you choose — even 3 days out. No fees or commissions come out of your pocket.",
    localNote:
      "Sussex has grown fast, but the village still has plenty of older homes near Main Street alongside its newer subdivisions — and we buy both, here and throughout Waukesha County.",
  },
  {
    slug: "elkhorn",
    name: "Elkhorn",
    county: "Walworth County",
    formName: "contact-elkhorn",
    intro:
      "Sell your Elkhorn house without lifting a paintbrush. We buy properties as-is for cash — no repairs, no cleaning, no showings — and we'll have a fair offer to you within 24 hours. Choose your own closing date, whether that's 3 days from now or next season.",
    localNote:
      "As the county seat of Walworth County, Elkhorn sits at the heart of an area we know well — from in-town homes near the square to properties out toward the lakes.",
  },
  {
    slug: "whitewater",
    name: "Whitewater",
    county: "Walworth County",
    formName: "contact-whitewater",
    intro:
      "Tired landlord? Inherited a property near campus? Whatever brings you here, we'll make a fair cash offer on your Whitewater house within 24 hours and buy it exactly as it sits — tenants, deferred maintenance, and all. No fees, no commissions, and a closing in as little as 3 days.",
    localNote:
      "With UW-Whitewater in town, many local properties are student rentals that have taken years of wear — we buy those regularly, along with single-family homes across Walworth County.",
  },
  {
    slug: "watertown",
    name: "Watertown",
    county: "Jefferson County",
    formName: "contact-watertown",
    intro:
      "Get a straightforward cash offer on your Watertown home within 24 hours — no listing, no showings, no waiting. We buy houses in any condition, cover the typical closing costs, and never charge fees or commissions. Close in as little as 3 days or on whatever timeline suits you.",
    localNote:
      "Watertown straddles the Rock River with a deep stock of older two-story homes, and we buy them as-is throughout the city and the surrounding Jefferson County area.",
  },
  {
    slug: "fort-atkinson",
    name: "Fort Atkinson",
    county: "Jefferson County",
    formName: "contact-fort-atkinson",
    intro:
      "When a Fort Atkinson house becomes a burden — too many repairs, too far away, or too tied up in a life change — selling for cash is the clean break. We'll give you a fair offer within 24 hours, buy as-is with $0 in fees or commissions, and close whenever you're ready, even in 3 days.",
    localNote:
      "From homes near the Rock River and downtown to properties on the edge of town, we buy houses in any condition across Fort Atkinson and Jefferson County.",
  },
  {
    slug: "oconomowoc",
    name: "Oconomowoc",
    county: "Waukesha County",
    formName: "contact-oconomowoc",
    intro:
      "You could spend the summer prepping and showing your Oconomowoc home — or you could have a fair cash offer by tomorrow. We buy as-is, charge no fees or commissions, and close on your schedule, in as little as 3 days. One conversation is all it takes to get your number.",
    localNote:
      "Oconomowoc's lake country setting — Lac La Belle, Fowler Lake, and the historic downtown between them — includes everything from vintage cottages to dated in-town homes, and we buy them all across Waukesha County.",
  },
  {
    slug: "beaver-dam",
    name: "Beaver Dam",
    county: "Dodge County",
    formName: "contact-beaver-dam",
    intro:
      "Selling a Beaver Dam house as-is for cash means no repairs, no cleaning, no open houses, and no agent commissions. Request an offer and we'll respond within 24 hours with a fair number and zero pressure. If you accept, closing can happen in as little as 3 days.",
    localNote:
      "Beaver Dam's older neighborhoods near the lake and downtown hold a lot of homes built generations ago — the kind we buy as-is all over Dodge County.",
  },
  {
    slug: "waupun",
    name: "Waupun",
    county: "Dodge County",
    formName: "contact-waupun",
    intro:
      "No agent, no repairs, no waiting — just a fair cash offer on your Waupun home within 24 hours. We buy houses in any condition and let you set the closing date, from 3 days out to whenever your next chapter starts. You'll never pay us a fee or commission.",
    localNote:
      "Sitting where Dodge County meets Fond du Lac County near the Horicon Marsh, Waupun has a solid core of older homes — and we buy them just as they are, on either side of the county line.",
  },
  {
    slug: "sun-prairie",
    name: "Sun Prairie",
    county: "Dane County",
    formName: "contact-sun-prairie",
    intro:
      "Sun Prairie moves fast, but a traditional sale still means weeks of showings and financing contingencies. We cut all of that out: a fair cash offer within 24 hours, an as-is purchase with nothing for you to fix, and a closing in as little as 3 days — with $0 in fees or commissions.",
    localNote:
      "One of Dane County's fastest-growing cities, Sun Prairie has older homes near its historic Main Street as well as newer subdivisions — we make offers on both.",
  },
  {
    slug: "fitchburg",
    name: "Fitchburg",
    county: "Dane County",
    formName: "contact-fitchburg",
    intro:
      "Sell your Fitchburg property without ever hosting a showing. Share a few details, get a fair cash offer within 24 hours, and close on the day you pick — even 3 days from now. We buy as-is and never charge fees or commissions, so the offer you accept is what you walk away with.",
    localNote:
      "Bordering Madison's south side, Fitchburg spans everything from established neighborhoods and condos to rural properties — and we buy across all of it in Dane County.",
  },
  {
    slug: "middleton",
    name: "Middleton",
    county: "Dane County",
    formName: "contact-middleton",
    intro:
      "Even in a market as strong as Middleton's, an outdated or hard-to-show home can sit. We solve that with a fair cash offer within 24 hours, an as-is purchase — no updates, no staging, no showings — and a closing timeline you control. Fees and commissions? Zero.",
    localNote:
      "Middleton's older ranches and split-levels near downtown and Pheasant Branch often need the kind of updating today's buyers avoid — we buy them as-is, here and throughout Dane County.",
  },
  {
    slug: "verona",
    name: "Verona",
    county: "Dane County",
    formName: "contact-verona",
    intro:
      "Relocating, downsizing, or settling an estate in Verona? Get a fair cash offer within 24 hours and close in as little as 3 days — or take months if that's what your situation needs. We buy houses as-is, so there's nothing to repair, clean, or show, and you'll never pay fees or commissions.",
    localNote:
      "Verona has boomed with Epic just outside town, but its older in-town homes tell a different story — and those are often exactly the Dane County properties we buy.",
  },
  {
    slug: "oregon",
    name: "Oregon",
    county: "Dane County",
    formName: "contact-oregon",
    intro:
      "Selling your Oregon home for cash takes one phone call, not one hundred showings. We'll make a fair, no-obligation offer within 24 hours, buy the house exactly as it stands, and close on your schedule — in as few as 3 days. No fees or commissions ever come out of your proceeds.",
    localNote:
      "The Village of Oregon blends a classic small-town core with newer growth south of Madison, and we buy homes of every age and condition here and across Dane County.",
  },
  {
    slug: "stoughton",
    name: "Stoughton",
    county: "Dane County",
    formName: "contact-stoughton",
    intro:
      "Whether your Stoughton house is move-in ready or hasn't been touched in decades, we'll buy it as-is for cash. Expect a fair offer within 24 hours, no fees or commissions, and a closing in as little as 3 days — or on the date that works best for your family.",
    localNote:
      "Known for its Norwegian heritage and historic Main Street along the Yahara River, Stoughton has many older homes that need real work — the kind we buy throughout Dane County.",
  },
  {
    slug: "deforest",
    name: "DeForest",
    county: "Dane County",
    formName: "contact-deforest",
    intro:
      "Skip the agent and sell your DeForest home directly for cash. You'll get a fair offer within 24 hours, keep every dollar of it — $0 in fees or commissions — and choose your own closing date, as soon as 3 days out. No repairs, no cleaning, no showings required.",
    localNote:
      "DeForest's spot along the interstate corridor north of Madison has fueled steady growth, but its older village homes are still common — and we buy them as-is across northern Dane County.",
  },
  {
    slug: "waunakee",
    name: "Waunakee",
    county: "Dane County",
    formName: "contact-waunakee",
    intro:
      "A fast, private sale of your Waunakee home is one form away. We respond with a fair cash offer within 24 hours, buy as-is so you never fix or clean a thing, and close in as little as 3 days or whenever you choose. There are no fees, no commissions, and no showings — ever.",
    localNote:
      "The only Waunakee in the world sits just north of Madison, and its mix of village-era homes and newer neighborhoods means we see all kinds of Dane County properties here.",
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
