/* ============================================================================
   MITSU — centrale content
   Alles wat je wilt vervangen staat hier: copy, beeld-URL's, bronvermelding.
   Items met `demo: true` zijn voorbeeldcontent en worden zo in de UI getoond
   ("Voorbeeld"). Zet `demo` op false zodra je echte gegevens invult.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   Beeld — één plek voor de vaste Unsplash-parameters
   --------------------------------------------------------------------------- */
export const imageConfig = {
  base: 'https://images.unsplash.com',
  format: 'webp',
  quality: 70,
  fit: 'crop',
  /* srcset-breedtes; de browser kiest op basis van `sizes` */
  widths: [480, 800, 1200, 1800, 2400]
};

/**
 * Alle foto's komen van Unsplash (Unsplash License).
 * `id`    = het deel van de CDN-URL na "photo-"
 * `focus` = CSS object-position, zodat de crop op het onderwerp blijft
 */
export const photos = {
  /* eigen foto's en projectbeelden (public/): geen Unsplash, geen bronvermelding nodig */
  zayd: {
    src: '/makers/zayd.jpg',
    alt: 'Portret van Zayd: krullend haar, baard, lichte overhemd en gekruiste armen in een ruimte met planten',
    focus: '50% 22%'
  },
  haider: {
    src: '/makers/haider.jpg',
    alt: 'Portret van Haider: donker haar, snor en sik, zwart poloshirt tegen een grijze achtergrond',
    focus: '50% 30%'
  },
  amine: {
    src: '/makers/amine.jpg',
    alt: 'Amine in de boksring, in profiel, met een gouden hoofdband en zwart-oranje boksvest',
    focus: '38% 40%'
  },
  foodplug: {
    src: '/projects/foodplug.jpg',
    alt: 'De website van FoodPlug: “Eat & plug in”, een bakje cheesefries en de knop naar het menu',
    focus: '0% 50%'
  },
};

/* ---------------------------------------------------------------------------
   Merk en navigatie
   --------------------------------------------------------------------------- */
export const brand = {
  name: 'mitsu',
  kanji: '三つ',
  kanjiLight: '光',
  idea: 'Drie punten, één licht.',
  email: 'mitsu.site@outlook.com',
  /* sociale kanalen: naam zoals getoond + link */
  socials: [
    { id: 'instagram', label: 'Instagram', handle: 'mitsu.site', href: 'https://www.instagram.com/mitsu.site/' },
    { id: 'tiktok', label: 'TikTok', handle: 'mitsu.site', href: 'https://www.tiktok.com/@mitsu.site' }
  ]
};

/* zelfde volgorde als de secties op de pagina */
export const nav = [
  { label: 'Werkwijze', href: '#idee' },
  { label: 'Diensten', href: '#diensten' },
  { label: 'Werk', href: '#werk' }
];

export const cta = {
  header: { label: 'Plan een kennismaking', href: '#contact' },
  primary: { label: 'Bekijk ons werk', href: '#werk' },
  secondary: { label: 'Plan een kennismaking', href: '#contact' }
};

/* ---------------------------------------------------------------------------
   Hero
   --------------------------------------------------------------------------- */
export const hero = {
  tagline: { before: 'Drie punten, één', em: 'licht', after: '.' },
  lead: 'Bij Mitsu bouwen we websites die je zaak een heldere kern geven. Strak ontworpen en makkelijk te beheren.',
  /* Naam van een foto uit `photos` voor een fotoachtergrond; leeg = alleen de blauwe lucht. */
  image: ''
};

/* ---------------------------------------------------------------------------
   01 Manifest
   --------------------------------------------------------------------------- */
export const manifest = {
  label: 'Wie we zijn',
  title: { strong: 'Drie makers,', em: 'één', strongAfter: 'doel:' },
  ghost: 'een website die bij je zaak past.',
  intro: 'Je krijgt één aanspreekpunt, een duidelijke prijs en een site die op elk scherm goed werkt. Wij doen het ontwerp, de bouw en het onderhoud.',
  highlight: 'Zodat jij kan focussen op je zaak, terwijl je website klanten binnenbrengt.',
};

/* ---------------------------------------------------------------------------
   02 Werkwijze: drie stappen (sectie-id blijft #idee)
   --------------------------------------------------------------------------- */
export const idea = {
  label: 'Werkwijze',
  title: { before: 'Drie punten,', em: 'één', after: 'licht.' },
  ghost: 'één licht',
  points: [
    {
      n: '01',
      name: 'Kennismaken',
      /* kaart en woordkleur: van donker naar licht */
      surface: 'paper',
      word: 'var(--ref-blue-600)',
      text: 'We luisteren naar wat je zaak nodig heeft en maken een duidelijk voorstel.'
    },
    {
      n: '02',
      name: 'Ontwerpen & bouwen',
      surface: 'blue',
      word: 'var(--ref-blue-300)',
      text: 'Je kijkt mee terwijl je site vorm krijgt, en stuurt bij waar nodig.'
    },
    {
      n: '03',
      name: 'Lanceren',
      surface: 'ink',
      word: 'var(--ref-blue-100)',
      text: 'Je site gaat live, en we blijven betrokken bij wat volgt.'
    }
  ]
};

/* ---------------------------------------------------------------------------
   03 Geselecteerd werk — echte projecten
   --------------------------------------------------------------------------- */
export const work = {
  label: 'Geselecteerd werk',
  title: { before: 'Ons', em: 'werk', after: '' },
  intro: 'Wat we als Mitsu bouwden.',
  /* Het eerste item staat groot; de rest compact onder `earlier`. `status` = badge, `href` = knop naar de site. */
  earlier: { label: 'Eerder werk van de makers' },
  /* labels van de projectfiche */
  facts: { kind: 'Wat', tags: 'Onderdelen', status: 'Status' },
  items: [
    {
      id: 'foodplug',
      title: 'FoodPlug',
      kind: 'Website en bestellen',
      status: 'Live',
      href: 'https://www.foodplug.be/',
      cta: 'Bezoek foodplug.be',
      tags: ['Webdesign', 'Online bestellen', 'Afhalen'],
      text: 'Halal burgerzaak in Antwerpen. Website met menu, online bestellen en afhalen, gebouwd en gelanceerd door Mitsu.',
      image: 'foodplug',
      ratio: '16 / 9'
    },
  ]
};

/* ---------------------------------------------------------------------------
   04 Diensten
   --------------------------------------------------------------------------- */
export const services = {
  label: 'Diensten',
  title: { before: 'Wat we', em: 'doen', after: '' },
  intro: '',
  cta: { label: 'Bespreek je project', href: '#contact' },
  items: [
    {
      n: '01',
      title: 'Website',
      text: 'Een snelle, toegankelijke site die klopt op elk scherm. Jij levert tekst en foto’s, wij doen de rest: van ontwerp tot lancering.',
      tags: ['Ontwerp', 'Bouw', 'Mobiel', 'Toegankelijk']
    },
    {
      n: '02',
      title: 'Bestellen & webshop',
      text: 'Online bestellen, afhalen of leveren, betalen inbegrepen. Op maat gebouwd, zonder dure platformkosten per bestelling.',
      tags: ['Bestellen', 'Betalen', 'Menu', 'Webshop']
    },
    {
      n: '03',
      title: 'Onderhoud & hosting',
      text: 'We houden je site online, veilig en up-to-date, en passen kleine dingen aan als dat nodig is.',
      tags: ['Hosting', 'Updates', 'Domein', 'Support']
    }
  ]
};

/* ---------------------------------------------------------------------------
   05 Makers: wij zijn met z'n drieën — daarom ook de naam (三つ = drie)
   `photo`: sleutel uit `photos` (echte foto). De hero toont ter sfeer drie wazige silhouetten (`figure`).
   --------------------------------------------------------------------------- */
export const makers = {
  label: 'Makers',
  title: { before: 'Drie makers,', em: 'één', after: 'licht' },
  intro: 'Mitsu is drie in het Japans, en zo zijn we ook begonnen: met z’n drieën.',
  link: { label: 'Kom met ons werken', href: '#contact' },
  items: [
    { name: 'Amine', line: 'Eén van de drie punten.', figure: 'a', photo: 'amine' },
    { name: 'Zayd', line: 'Eén van de drie punten.', figure: 'b', photo: 'zayd' },
    { name: 'Haider', line: 'Eén van de drie punten.', figure: 'c', photo: 'haider' }
  ]
};

/* ---------------------------------------------------------------------------
   06 Verhalen: testimonials + kerncijfers (voorbeeldcontent)
   --------------------------------------------------------------------------- */
export const stories = {
  label: 'Verhalen',
  title: { before: 'Wat klanten', em: 'zeggen', after: '' },
  demoNote: 'Voorbeeldcitaten en -cijfers, bedoeld om de opmaak te tonen.',
  quotes: [
    {
      demo: true,
      text: 'Ze luisterden langer dan we gewend waren en stelden daarna precies één vraag. Die vraag veranderde ons hele plan.',
      who: 'Voorbeeldklant',
      role: 'Oprichter, creatieve studio'
    },
    {
      demo: true,
      text: 'De nieuwe site voelt rustig en snel. Onze bezoekers vinden wat ze zoeken zonder dat we iets hoeven uit te leggen.',
      who: 'Voorbeeldklant',
      role: 'Marketingverantwoordelijke, platform'
    },
    {
      demo: true,
      text: 'Eindelijk een bureau dat durft weg te laten. Het resultaat is kleiner dan we dachten en veel sterker.',
      who: 'Voorbeeldklant',
      role: 'Directeur, productbedrijf'
    }
  ],
  stats: [
    { value: 48, suffix: '%', decimals: 0, label: 'meer aanvragen na de lancering' },
    { value: 12, suffix: ' weken', decimals: 0, label: 'van eerste gesprek tot live' },
    { value: 9.4, suffix: '/10', decimals: 1, label: 'gemiddelde klantwaardering' }
  ]
};

/* ---------------------------------------------------------------------------
   07 Citaat
   --------------------------------------------------------------------------- */
export const quote = {
  label: 'Uitgangspunt',
  text: { before: 'Een merk hoeft niet harder te roepen. Het moet', em: 'helderder', after: 'schijnen.' },
  by: 'Het uitgangspunt van Mitsu'
};

/* ---------------------------------------------------------------------------
   Ronde carrousel: de merken en producten waaraan we bouwden
   Logo's staan in public/logos/ (PNG met transparante achtergrond).
   --------------------------------------------------------------------------- */
export const clients = {
  label: 'Projecten',
  title: 'Merken waar we aan bouwden',
  /* `shape`: 'mark' = (bijna) vierkant logo, 'wide' = breed woordmerk. `invert`: wit logo dat zwart getoond wordt. */
  items: [
    { name: 'FoodPlug', logo: '/logos/foodplug.png', shape: 'wide' },
    { name: 'Holy Prep', logo: '/logos/holyprep.png', shape: 'mark' },
    { name: 'ATS', logo: '/logos/ats.png', shape: 'mark' },
    { name: 'Champions Gym', logo: '/logos/champions-gym.png', shape: 'mark' },
    { name: 'Little Sun', logo: '/logos/little-sun.png', shape: 'wide' }
  ]
};

/* ---------------------------------------------------------------------------
   08 Contact
   --------------------------------------------------------------------------- */
export const contact = {
  label: 'Contact',
  title: { before: 'Laten we', em: 'praten', after: '.' },
  text: 'Vertel kort waar je mee bezig bent. We lezen elk bericht zelf en sturen je snel een eerlijk antwoord.',
  /* Laat leeg voor demo-modus. Vul een URL in om het formulier echt te versturen (POST, JSON). */
  endpoint: '',
  topics: ['Website', 'Bestellen', 'Onderhoud', 'Iets anders'],
  fields: {
    name: 'Naam',
    email: 'E-mailadres',
    topic: 'Waarover gaat het?',
    message: 'Je bericht'
  },
  submit: 'Stuur je aanvraag',
  privacy: 'We gebruiken je gegevens alleen om te antwoorden.',
  success: {
    live: 'Bedankt, je bericht is verstuurd. We komen er snel op terug.',
    demo: 'Bedankt! Dit is een voorbeeldformulier: er is niets verstuurd. Koppel je eigen endpoint in src/content/site.js.'
  },
  errors: {
    name: 'Vul je naam in.',
    email: 'Vul een geldig e-mailadres in.',
    message: 'Vertel kort waar het over gaat.'
  }
};

/* ---------------------------------------------------------------------------
   Footer
   --------------------------------------------------------------------------- */
export const footer = {
  blurb: '',
  links: {
    title: 'Snel naar',
    items: [
      { label: 'Werkwijze', href: '#idee' },
      { label: 'Diensten', href: '#diensten' },
      { label: 'Werk', href: '#werk' },
      { label: 'Contact', href: '#contact' }
    ]
  },
  contactTitle: 'Contact',
  creditsTitle: 'Fotoverantwoording',
  creditsText: 'Foto’s via Unsplash, onder de Unsplash License. Met dank aan:',
  themeLabel: 'Thema',
  copyright: 'Mitsu. Alle rechten voorbehouden.'
};