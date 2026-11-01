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
  hill: {
    id: '1755210345899-0d22f72680e7',
    alt: 'Groene berghelling in Aso, Japan, onder een wolkendek met zacht licht',
    by: 'Gaku Suyama',
    profile: 'https://unsplash.com/@gakusuyama',
    page: 'https://unsplash.com/photos/lush-green-hillside-under-a-cloudy-sky-d7aTQFj3qhY',
    focus: '50% 70%'
  },
  studio: {
    id: '1755520795091-adf1f3f307e0',
    alt: 'Zonnige atelierruimte met een lange werktafel, een oranje bureaustoel en een groot raam',
    by: 'Clay Banks',
    profile: 'https://unsplash.com/@claybanks',
    page: 'https://unsplash.com/photos/artists-studio-with-desk-chair-and-large-window-fybrevHYvWc',
    focus: '50% 50%'
  },
  /* Japanse achtergrond en sfeer */
  fujisky: {
    id: '1747572495922-3a290b4ab14e',
    alt: 'De besneeuwde Fuji onder een heldere blauwe lucht met een wolk links',
    by: 'sun hung',
    profile: 'https://unsplash.com/@sunhung',
    page: 'https://unsplash.com/photos/mount-fuji-japan-under-a-bright-blue-sky-IliUebaF7wE',
    focus: '50% 40%'
  },
  torii: {
    id: '1763092806297-b2ea9763f118',
    alt: 'Houten torii-poort in dichte mist op een zwart lavaveld bij de Fuji',
    by: 'Sudhan Chitgopkar',
    profile: 'https://unsplash.com/@chitgopkar',
    page: 'https://unsplash.com/photos/wooden-torii-gate-in-a-foggy-forest-setting-VCqbCEUzIYM',
    focus: '50% 50%'
  },
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

export const nav = [
  { label: 'Merkidee', href: '#idee' },
  { label: 'Werk', href: '#werk' },
  { label: 'Diensten', href: '#diensten' }
];

export const cta = {
  header: { label: 'Plan een kennismaking', href: '#contact' },
  primary: { label: 'Bekijk het werk', href: '#werk' },
  secondary: { label: 'Plan een kennismaking', href: '#contact' }
};

/* ---------------------------------------------------------------------------
   Hero
   --------------------------------------------------------------------------- */
export const hero = {
  tagline: { before: 'Drie punten, één', em: 'licht', after: '.' },
  lead: 'Mitsu geeft merken een heldere kern en een website die dat licht vasthoudt. Kort, warm en zeker, van eerste gesprek tot lancering.',
  /* Naam van een foto uit `photos` voor een fotoachtergrond; leeg = alleen de blauwe lucht. */
  image: ''
};

/* ---------------------------------------------------------------------------
   01 Manifest
   --------------------------------------------------------------------------- */
export const manifest = {
  label: 'Wie we zijn',
  title: { strong: 'We maken merken die', em: 'licht', strongAfter: 'geven.' },
  ghost: 'En websites die dat licht vasthouden.',
  intro: 'Een goed merk is geen lawaai, maar een duidelijke keuze. Wij helpen je die te vinden en bouwen er je website rond.',
  highlight: 'Het draait om helderheid, richting en rust.',
  strip: ['fujisky', 'studio', 'torii', 'hill']
};

/* ---------------------------------------------------------------------------
   02 Merkidee: drie punten
   --------------------------------------------------------------------------- */
export const idea = {
  label: 'Merkidee',
  title: { before: 'Drie punten,', em: 'één', after: 'licht.' },
  ghost: 'één licht',
  points: [
    {
      n: '01',
      name: 'Richting',
      /* kaart en woordkleur: van donker naar licht */
      surface: 'paper',
      word: 'var(--ref-blue-600)',
      text: 'We beginnen bij wat je zeker weet. Eén duidelijke keuze maakt alle volgende keuzes lichter.'
    },
    {
      n: '02',
      name: 'Ruimte',
      surface: 'blue',
      word: 'var(--ref-blue-300)',
      text: 'Wat overbodig is, gaat eruit. Wat blijft, krijgt lucht, zodat je boodschap kan landen.'
    },
    {
      n: '03',
      name: 'Licht',
      surface: 'ink',
      word: 'var(--ref-blue-100)',
      text: 'Het geheel moet iets verhelderen. Voor je klant, voor je team en voor jezelf.'
    }
  ]
};

/* ---------------------------------------------------------------------------
   03 Geselecteerd werk — echte projecten
   --------------------------------------------------------------------------- */
export const work = {
  label: 'Geselecteerd werk',
  title: { before: 'Werk dat je', em: 'ziet', after: 'voordat je het leest.' },
  intro: 'Wat we als Mitsu bouwden.',
  /* Het eerste item staat groot; de rest compact onder `earlier`. `status` = badge, `href` = knop naar de site. */
  earlier: { label: 'Eerder werk van de makers' },
  items: [
    {
      id: 'foodplug',
      title: 'FoodPlug',
      kind: 'Website en bestellen',
      status: 'Live',
      href: 'https://www.foodplug.be/',
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
  title: { before: 'Wat we voor je', em: 'doen', after: '' },
  intro: 'Drie dingen, goed gedaan.',
  cta: { label: 'Vraag naar de werkwijze', href: '#contact' },
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
      text: 'We houden je site online, veilig en up-to-date, en passen kleine dingen aan als dat nodig is. Eén vast tarief, één aanspreekpunt.',
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
  title: { before: 'Laten we iets', em: 'helders', after: 'maken.' },
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
  submit: 'Verstuur bericht',
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
  blurb: 'Merk, web en beeld met één lichtpunt: helder, warm en zeker.',
  links: {
    title: 'Snel naar',
    items: [
      { label: 'Merkidee', href: '#idee' },
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