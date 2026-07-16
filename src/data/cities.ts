export type CityStory = {
  badge: string;
  title: string;
  location: string;
  details: string;
};

export type City = {
  slug: string;
  name: string;
  formName: string;
  cityFieldValue: string;
  badgeIcon: string;
  badgeText: string;
  h1Html: string;
  heroIntro: string;
  storiesTitle: string;
  storiesSubtitle: string;
  stories: CityStory[];
  servingTitle: string;
};

export const cities: City[] = [
  {
    slug: "madison",
    name: "Madison",
    formName: "contact-madison",
    cityFieldValue: "Madison",
    badgeIcon: "bucky-badger.png",
    badgeText: "Proud to Serve Badger Country",
    h1Html: "We Buy Houses in Madison",
    heroIntro: "Get a fair cash offer fast. We Buy As-Is, no repairs, no cleaning, take what you want and we will take care of the rest. Save with no realtor fees. Sell your house on the day you chose or in as quick as 3 days.",
    storiesTitle: "Recent Madison Area Success Stories",
    storiesSubtitle: "Real houses, real people, Hassle-free fast closings",
    stories: [
      {
        badge: "Closed in 6 Days",
        title: "East Side Madison",
        location: "3 bed, 2 bath",
        details: "Owner needed to relocate for work. We bought the house with deferred maintenance and closed in 6 days.",
      },
      {
        badge: "Closed Fast",
        title: "Fitchburg Home",
        location: "4 bed, 2.5 bath",
        details: "Inherited property with major repairs needed. We bought it as-is and handled everything.",
      },
      {
        badge: "Closed Fast",
        title: "Monona Property",
        location: "2 bed, 1 bath",
        details: "Rental property with tenant issues. Fast cash sale allowed owner to move on stress-free.",
      },
      {
        badge: "Closed Fast",
        title: "Sun Prairie House",
        location: "3 bed, 2 bath",
        details: "Needed quick sale during divorce. We provided fair offer and closed on their timeline.",
      },
    ],
    servingTitle: "Serving Madison and Surrounding Cities",
  },
  {
    slug: "sun-prairie",
    name: "Sun Prairie",
    formName: "contact-sun-prairie",
    cityFieldValue: "",
    badgeIcon: "sun_prairie-icon.png",
    badgeText: "Proud to Serve Sun Prairie",
    h1Html: "We Buy Houses in Sun Prairie",
    heroIntro: "Need to sell your Sun Prairie house fast? We buy houses in any condition for cash. No repairs, no fees, no hassle. Get a fair offer today.",
    storiesTitle: "Recent Sun Prairie Area Success Stories",
    storiesSubtitle: "Real houses, real people, Hassle-free fast closings",
    stories: [
      {
        badge: "Closed in 5 Days",
        title: "Downtown Sun Prairie",
        location: "3 bed, 1.5 bath",
        details: "Owner was behind on payments and facing foreclosure. We made a cash offer and closed in 5 days, saving their credit.",
      },
      {
        badge: "Closed in 8 Days",
        title: "Near Angell Park",
        location: "4 bed, 2 bath",
        details: "Elderly couple needed to move to assisted living quickly. We bought their home as-is and let them take their time moving out.",
      },
      {
        badge: "Closed Fast",
        title: "West Sun Prairie",
        location: "2 bed, 1 bath",
        details: "Inherited property needed major repairs. We bought it as-is, no inspections, no repair requests.",
      },
      {
        badge: "Closed in 6 Days",
        title: "Prairie Lakes Area",
        location: "3 bed, 2.5 bath",
        details: "Job relocation meant the family needed to sell fast. We closed in 6 days so they could start their new life.",
      },
    ],
    servingTitle: "Serving Sun Prairie and Surrounding Cities",
  },
  {
    slug: "lake-mills",
    name: "Lake Mills",
    formName: "contact-lake-mills",
    cityFieldValue: "Lake Mills",
    badgeIcon: "lake_mills-icon.png",
    badgeText: "Proud to Serve Lake Mills",
    h1Html: "We Buy Houses in Lake Mills",
    heroIntro: "Get a fair cash offer fast. We Buy As-Is, no repairs, no cleaning, take what you want and we will take care of the rest. Save with no realtor fees. Sell your house on the day you chose or in as quick as 3 days.",
    storiesTitle: "Recent Lake Mills Area Success Stories",
    storiesSubtitle: "Real houses, real people, Hassle-free fast closings",
    stories: [
      {
        badge: "Closed in 6 Days",
        title: "Downtown Lake Mills",
        location: "3 bed, 1.5 bath",
        details: "Owner inherited the home and lived out of state. We closed fast so she didn't have to travel back and forth.",
      },
      {
        badge: "Closed Fast",
        title: "Near Rock Lake",
        location: "2 bed, 1 bath",
        details: "Cottage needed major repairs the owner couldn't afford. We bought it as-is, no inspection required.",
      },
      {
        badge: "Closed Fast",
        title: "Jefferson County Home",
        location: "4 bed, 2 bath",
        details: "Divorce required a quick, clean sale. We made a fair offer and closed on their timeline.",
      },
      {
        badge: "Closed Fast",
        title: "Near the Square",
        location: "3 bed, 1 bath",
        details: "Landlord was tired of dealing with tenant issues. Sold the rental as-is and walked away stress-free.",
      },
    ],
    servingTitle: "Serving Lake Mills and Surrounding Cities",
  },
  {
    slug: "watertown",
    name: "Watertown",
    formName: "contact-watertown",
    cityFieldValue: "Watertown",
    badgeIcon: "watertown-icon.png",
    badgeText: "Proud to Serve Watertown",
    h1Html: "We Buy Houses in Watertown",
    heroIntro: "Get a fair cash offer fast. We Buy As-Is, no repairs, no cleaning, take what you want and we will take care of the rest. Save with no realtor fees. Sell your house on the day you chose or in as quick as 3 days.",
    storiesTitle: "Recent Watertown Area Success Stories",
    storiesSubtitle: "Real houses, real people, Hassle-free fast closings",
    stories: [
      {
        badge: "Closed in 7 Days",
        title: "Watertown",
        location: "3 bed, 1 bath",
        details: "Family moving out of state. We made a fair offer and closed before their relocation date.",
      },
      {
        badge: "Closed Fast",
        title: "Near Rock River",
        location: "2 bed, 2 bath",
        details: "Older home with outdated systems. Sold as-is with no repairs or inspections required.",
      },
      {
        badge: "Closed Fast",
        title: "Dodge County Home",
        location: "4 bed, 1.5 bath",
        details: "Job loss made payments difficult. We bought the house and helped owner avoid late fees.",
      },
      {
        badge: "Closed Fast",
        title: "Johnson Creek",
        location: "3 bed, 2 bath",
        details: "Health issues required nursing home move. Quick cash sale allowed family to focus on care.",
      },
    ],
    servingTitle: "Serving Watertown and Surrounding Cities",
  },
  {
    slug: "fort-atkinson",
    name: "Fort Atkinson",
    formName: "contact-fort-atkinson",
    cityFieldValue: "Fort Atkinson",
    badgeIcon: "fort_atkinson-icon.png",
    badgeText: "Proud to Serve Fort Atkinson",
    h1Html: "We Buy Houses in Fort Atkinson",
    heroIntro: "Get a fair cash offer fast. We Buy As-Is, no repairs, no cleaning, take what you want and we will take care of the rest. Save with no realtor fees. Sell your house on the day you chose or in as quick as 3 days.",
    storiesTitle: "Recent Fort Atkinson Area Success Stories",
    storiesSubtitle: "Real houses, real people, Hassle-free fast closings",
    stories: [
      {
        badge: "Closed in 7 Days",
        title: "Downtown Fort Atkinson",
        location: "2 bed, 1 bath",
        details: "Stopped foreclosure auction with 7-day closing. We handled all paperwork and closed before the deadline.",
      },
      {
        badge: "Closed Fast",
        title: "Near Rock River",
        location: "3 bed, 1.5 bath",
        details: "Homeowner downsizing after retirement. Simple process, fair price, and flexible closing date.",
      },
      {
        badge: "Closed Fast",
        title: "Jefferson County Property",
        location: "4 bed, 2 bath",
        details: "Behind on payments and facing foreclosure. We paid off the mortgage and helped owner avoid bankruptcy.",
      },
      {
        badge: "Closed Fast",
        title: "Koshkonong Area",
        location: "3 bed, 2 bath",
        details: "Fire damage made property unlivable. We bought it in current condition and owner walked away with cash.",
      },
    ],
    servingTitle: "Serving Fort Atkinson and Surrounding Cities",
  },
  {
    slug: "stoughton",
    name: "Stoughton",
    formName: "contact-stoughton",
    cityFieldValue: "Stoughton",
    badgeIcon: "stoughton-icon.png",
    badgeText: "Proud to Serve Stoughton",
    h1Html: "We Buy Houses in Stoughton",
    heroIntro: "Need to sell your Stoughton house fast? We buy houses in any condition for cash. No repairs, no fees, no hassle. Get a fair offer today.",
    storiesTitle: "Recent Stoughton Area Success Stories",
    storiesSubtitle: "Real houses, real people, Hassle-free fast closings",
    stories: [
      {
        badge: "Closed in 6 Days",
        title: "Downtown Stoughton",
        location: "3 bed, 1.5 bath",
        details: "Historic home needed major updates. Owner didn't want the hassle of renovating. We bought it as-is and closed fast.",
      },
      {
        badge: "Closed in 9 Days",
        title: "Near Yahara River",
        location: "4 bed, 2 bath",
        details: "Family inherited property and siblings couldn't agree on what to do. Our cash offer solved the problem for everyone.",
      },
      {
        badge: "Closed Fast",
        title: "Stoughton Area",
        location: "2 bed, 1 bath",
        details: "Owner was behind on taxes and facing a lien. We paid off the taxes and closed quickly to avoid further penalties.",
      },
      {
        badge: "Closed in 7 Days",
        title: "Dane County",
        location: "3 bed, 2 bath",
        details: "Senior couple moving to assisted living needed cash for care costs. We closed on their timeline and let them take what they needed.",
      },
    ],
    servingTitle: "Serving Stoughton and Surrounding Cities",
  },
  {
    slug: "oconomowoc",
    name: "Oconomowoc",
    formName: "contact-oconomowoc",
    cityFieldValue: "Oconomowoc",
    badgeIcon: "oconomowoc-icon.png",
    badgeText: "Proud to Serve Oconomowoc",
    h1Html: "We Buy Houses in Oconomowoc",
    heroIntro: "Need to sell your Oconomowoc house fast? We buy houses in any condition for cash. No repairs, no fees, no hassle. Get a fair offer today.",
    storiesTitle: "Recent Oconomowoc Area Success Stories",
    storiesSubtitle: "Real houses, real people, Hassle-free fast closings",
    stories: [
      {
        badge: "Closed in 17 Days",
        title: "Near Lac La Belle",
        location: "4 bed, 2.5 bath",
        details: "Lakefront property needed seawall repairs. We bought it as-is and closed in 17 days.",
      },
      {
        badge: "Closed in 10 Days",
        title: "Downtown Oconomowoc",
        location: "3 bed, 1.5 bath",
        details: "Divorced couple needed to split assets quickly. We provided a fair cash offer so both parties could move on.",
      },
      {
        badge: "Closed Fast",
        title: "Fowler Lake Area",
        location: "2 bed, 1 bath",
        details: "Out-of-state owner inherited property and didn't want to manage it remotely. We handled everything.",
      },
      {
        badge: "Closed in 5 Days",
        title: "Waukesha County",
        location: "3 bed, 2 bath",
        details: "Burned-out landlord with problem tenants. We bought the property with tenants in place - no eviction needed.",
      },
    ],
    servingTitle: "Serving Oconomowoc and Surrounding Cities",
  },
  {
    slug: "beaver-dam",
    name: "Beaver Dam",
    formName: "contact-beaver-dam",
    cityFieldValue: "Beaver Dam",
    badgeIcon: "beaver_dam-icon.png",
    badgeText: "Proud to Serve Beaver Dam",
    h1Html: "We Buy Houses in Beaver Dam",
    heroIntro: "Need to sell your Beaver Dam house fast? We buy houses in any condition for cash. No repairs, no fees, no hassle. Get a fair offer today.",
    storiesTitle: "Recent Beaver Dam Area Success Stories",
    storiesSubtitle: "Real houses, real people, Hassle-free fast closings",
    stories: [
      {
        badge: "Closed in 6 Days",
        title: "Near Beaver Dam Lake",
        location: "3 bed, 2 bath",
        details: "Lakefront property with dock issues. Traditional buyers wanted repairs - we bought it as-is.",
      },
      {
        badge: "Closed in 8 Days",
        title: "Downtown Beaver Dam",
        location: "4 bed, 1.5 bath",
        details: "Owner behind on property taxes facing a lien. We paid off the taxes and closed quickly.",
      },
      {
        badge: "Closed Fast",
        title: "Dodge County",
        location: "2 bed, 1 bath",
        details: "Elderly owner moving to nursing home needed funds for care. We closed on her timeline.",
      },
      {
        badge: "Closed in 5 Days",
        title: "Fox Lake Area",
        location: "3 bed, 2 bath",
        details: "Inherited property with multiple heirs. Our cash offer made the division simple for everyone.",
      },
    ],
    servingTitle: "Serving Beaver Dam and Surrounding Cities",
  },
  {
    slug: "deforest",
    name: "DeForest",
    formName: "contact-deforest",
    cityFieldValue: "DeForest",
    badgeIcon: "deforest-icon.png",
    badgeText: "Proud to Serve DeForest",
    h1Html: "We Buy Houses in DeForest",
    heroIntro: "Need to sell your DeForest house fast? We buy houses in any condition for cash. No repairs, no fees, no hassle. Get a fair offer today.",
    storiesTitle: "Recent DeForest Area Success Stories",
    storiesSubtitle: "Real houses, real people, Hassle-free fast closings",
    stories: [
      {
        badge: "Closed in 6 Days",
        title: "Downtown DeForest",
        location: "3 bed, 2 bath",
        details: "Owner relocated for work and needed to sell quickly. We made a fair offer and closed on their timeline.",
      },
      {
        badge: "Closed in 10 Days",
        title: "Windsor Area",
        location: "4 bed, 2.5 bath",
        details: "Family dealing with estate after parent passed. We handled everything so they could focus on what matters.",
      },
      {
        badge: "Closed Fast",
        title: "Near I-90/94",
        location: "2 bed, 1 bath",
        details: "Property had foundation issues that scared off traditional buyers. We bought it as-is with no inspection contingencies.",
      },
      {
        badge: "Closed in 7 Days",
        title: "Dane County",
        location: "3 bed, 1.5 bath",
        details: "Burned-out landlord wanted out of the rental business. We bought the property and took over the tenant situation.",
      },
    ],
    servingTitle: "Serving DeForest and Surrounding Cities",
  },
  {
    slug: "waunakee",
    name: "Waunakee",
    formName: "contact-waunakee",
    cityFieldValue: "Waunakee",
    badgeIcon: "waunakee-icon.png",
    badgeText: "Proud to Serve Waunakee",
    h1Html: "We Buy Houses in Waunakee",
    heroIntro: "Need to sell your Waunakee house fast? We buy houses in any condition for cash. No repairs, no fees, no hassle. Get a fair offer today.",
    storiesTitle: "Recent Waunakee Area Success Stories",
    storiesSubtitle: "Real houses, real people, Hassle-free fast closings",
    stories: [
      {
        badge: "Closed in 7 Days",
        title: "Downtown Waunakee",
        location: "3 bed, 2 bath",
        details: "Family relocating for job couldn't wait for traditional sale. We closed fast so they could move on time.",
      },
      {
        badge: "Closed in 9 Days",
        title: "Near Westport",
        location: "4 bed, 2.5 bath",
        details: "Inherited home with outdated systems. We bought it as-is - no repairs, no inspections.",
      },
      {
        badge: "Closed Fast",
        title: "Dane County",
        location: "2 bed, 1 bath",
        details: "Owner facing financial hardship needed to avoid foreclosure. Our quick close saved their credit.",
      },
      {
        badge: "Closed in 6 Days",
        title: "Waunakee Area",
        location: "3 bed, 1.5 bath",
        details: "Divorce situation required quick sale. We helped both parties move forward with fair cash offer.",
      },
    ],
    servingTitle: "Serving Waunakee and Surrounding Cities",
  },
  {
    slug: "whitewater",
    name: "Whitewater",
    formName: "contact-whitewater",
    cityFieldValue: "Whitewater",
    badgeIcon: "whitewater-icon.png",
    badgeText: "Proud to Serve Whitewater",
    h1Html: "We Buy Houses in Whitewater",
    heroIntro: "Need to sell your Whitewater house fast? We buy houses in any condition for cash. No repairs, no fees, no hassle. Get a fair offer today.",
    storiesTitle: "Recent Whitewater Area Success Stories",
    storiesSubtitle: "Real houses, real people, Hassle-free fast closings",
    stories: [
      {
        badge: "Closed in 7 Days",
        title: "Near UW-Whitewater",
        location: "4 bed, 2 bath",
        details: "Landlord tired of managing college rental property. We bought it with tenants in place - no eviction needed.",
      },
      {
        badge: "Closed in 5 Days",
        title: "Downtown Whitewater",
        location: "3 bed, 1.5 bath",
        details: "Owner facing foreclosure needed to sell fast. We closed in 5 days and saved their credit.",
      },
      {
        badge: "Closed Fast",
        title: "Walworth County",
        location: "2 bed, 1 bath",
        details: "Inherited property needed complete renovation. We bought it as-is, no inspections required.",
      },
      {
        badge: "Closed in 8 Days",
        title: "Whitewater Lake Area",
        location: "3 bed, 2 bath",
        details: "Divorce required quick asset division. Our cash offer let both parties move on quickly.",
      },
    ],
    servingTitle: "Serving Whitewater and Surrounding Cities",
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
