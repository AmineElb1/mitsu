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
  mossrock: {
    id: '1683106185159-02271c70d15a',
    alt: 'Close-up van dik, helgroen mos met kleine stenen',
    by: 'engin akyurt',
    profile: 'https://unsplash.com/@enginakyurt',
    page: 'https://unsplash.com/photos/a-green-moss-covered-hillside-with-small-rocks-67k6x_Vr2_Y',
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
  holyprep: {
    src: '/projects/holyprep.jpg',
    alt: 'De website van Holy Prep met een bord curry, broccoli en rijst als hero-beeld',
    focus: '50% 30%'
  },
  mediahuis: {
    src: '/projects/mediahuis.jpg',
    alt: 'Raster van app-iconen van Mediahuis-nieuwsmerken op een roze achtergrond',
    focus: '50% 50%'
  },
  easy2move: {
    src: '/projects/easy2move.jpg',
    alt: 'De website van Easy2Move op een laptop en een telefoon',
    focus: '50% 50%'
  },
  ats: {
    src: '/projects/ats.jpg',
    alt: 'Het ATS-dashboard met een lijst van personen, rollen en acties',
    focus: '0% 0%'
  }
};

/* ---------------------------------------------------------------------------
   Merk en navigatie
   --------------------------------------------------------------------------- */
export const brand = {
  name: 'mitsu',
  kanji: '三つ',
  kanjiLight: '光',
  idea: 'Drie punten, één licht.',
  /* Voorbeeld-contactgegevens op een gereserveerd domein; vervang door de echte. */
  email: 'hallo@example.com',
  demoNotice:
    'Citaten en cijfers op deze site zijn voorbeeldcontent en vervangbaar in src/content/site.js.'
};

export const nav = [
  { label: 'Merkidee', href: '#idee' },
  { label: 'Werk', href: '#werk' },
  { label: 'Diensten', href: '#diensten' },
  { label: 'Makers', href: '#makers' },
  { label: 'Verhalen', href: '#verhalen' }
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
  intro:
    'Een goed merk is geen lawaai. Het is een duidelijke keuze, rustig herhaald. Wij helpen je die keuze te vinden, en bouwen er vervolgens alles omheen wat nodig is om haar zichtbaar te maken.',
  highlight: 'Het draait om helderheid, richting en rust.',
  body: 'We werken in kleine teams, met korte lijnen en weinig vergaderingen. Eén aanspreekpunt, één plan, één plek waar alles samenkomt. Zo houden we ruimte voor wat telt: goed kijken, goed kiezen en het goed afmaken.',
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
      colour: 'Diepblauw',
      token: 'var(--point-3)',
      text: 'We beginnen bij wat je zeker weet. Eén duidelijke keuze maakt alle volgende keuzes lichter.'
    },
    {
      n: '02',
      name: 'Ruimte',
      colour: 'Lichtblauw',
      token: 'var(--point-2)',
      text: 'Wat overbodig is, gaat eruit. Wat blijft, krijgt lucht, zodat je boodschap kan landen.'
    },
    {
      n: '03',
      name: 'Licht',
      colour: 'Wit licht',
      token: 'var(--point-1)',
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
  intro: 'Een selectie van projecten waar we aan hebben gewerkt.',
  items: [
    {
      id: 'holy-prep',
      title: 'Holy Prep',
      kind: 'Website en bestelfunctie',
      status: 'In ontwikkeling',
      tags: ['Webdesign', 'Webshop', 'Bestellen'],
      text: 'Een website voor een maaltijdbereider, inclusief bestelfunctie. Momenteel in ontwikkeling.',
      image: 'holyprep',
      ratio: '4 / 3'
    },
    {
      id: 'mediahuis',
      title: 'Mediahuis',
      kind: 'Apps',
      tags: ['Mobiele apps', 'Nieuws', 'Merken'],
      text: 'We werkten aan meer dan 25 nieuwsapps voor verschillende merken van Mediahuis.',
      image: 'mediahuis',
      ratio: '1 / 1'
    },
    {
      id: 'easy2move',
      title: 'Easy2Move',
      kind: 'Boekingssysteem',
      tags: ['Webdesign', 'Online boeken', 'Ontwikkeling'],
      text: 'Easy2Move verhuurt ladderliften voor verhuizingen in Antwerpen. Wij bouwden hun volledige online boekingssysteem.',
      image: 'easy2move',
      ratio: '3 / 2'
    },
    {
      id: 'ats',
      title: 'ATS',
      kind: 'Applicant Tracking System',
      tags: ['Webapplicatie', 'Dashboard', 'Ontwikkeling'],
      text: 'Een applicant tracking system om personen, vacatures en organisaties op één plek te beheren.',
      image: 'ats',
      ratio: '16 / 9'
    }
  ]
};

/* ---------------------------------------------------------------------------
   04 Diensten
   --------------------------------------------------------------------------- */
export const services = {
  label: 'Diensten',
  title: { before: 'Wat we voor je', em: 'doen', after: '' },
  intro:
    'Vier ambachten, één werkwijze. Je kiest één dienst of alle vier. Ze versterken elkaar, omdat ze vanuit hetzelfde punt vertrekken.',
  cta: { label: 'Vraag naar de werkwijze', href: '#contact' },
  items: [
    {
      n: '01',
      title: 'Merk & identiteit',
      text: 'Strategie, naam, logo en huisstijl. We zoeken de kern van wie je bent en geven die een vorm die je jaren vol kunt houden.',
      tags: ['Strategie', 'Logo', 'Huisstijl', 'Tone of voice']
    },
    {
      n: '02',
      title: 'Websites',
      text: 'Snelle, toegankelijke websites die kloppen op elk scherm. Ontworpen in componenten, zodat ze met je meegroeien.',
      tags: ['Webdesign', 'React', 'Toegankelijkheid', 'CMS-koppeling']
    },
    {
      n: '03',
      title: 'Productontwerp',
      text: 'Van eerste schets tot werkend prototype. We testen vroeg, laten weg wat niet nodig is en bouwen door op wat werkt.',
      tags: ['UX', 'UI', 'Prototype', 'Designsystemen']
    },
    {
      n: '04',
      title: 'Beeld & beweging',
      text: 'Fotografie-art-direction, motion en campagnebeeld. Eén visuele taal die over al je kanalen herkenbaar blijft.',
      tags: ['Art direction', 'Motion', 'Campagne', 'Social']
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
    { name: 'Mediahuis', logo: '/logos/mediahuis.png', shape: 'wide', invert: true },
    { name: 'Easy2Move', logo: '/logos/easy2move.png', shape: 'wide' },
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
  text: 'Vertel kort waar je mee bezig bent. We lezen alles zelf en reageren zo snel we kunnen, ook als het antwoord “nog niet” is.',
  /* Laat leeg voor demo-modus. Vul een URL in om het formulier echt te versturen (POST, JSON). */
  endpoint: '',
  topics: ['Merk', 'Website', 'Beeld', 'Iets anders'],
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
  columns: [
    {
      title: 'Ontdek',
      links: [
        { label: 'Merkidee', href: '#idee' },
        { label: 'Werk', href: '#werk' },
        { label: 'Diensten', href: '#diensten' },
        { label: 'Makers', href: '#makers' }
      ]
    },
    {
      title: 'Praat met ons',
      links: [
        { label: 'Contactformulier', href: '#contact' },
        { label: 'Naar boven', href: '#top' }
      ]
    }
  ],
  creditsTitle: 'Fotoverantwoording',
  creditsText: 'Alle foto’s via Unsplash, onder de Unsplash License. Met dank aan:'
};