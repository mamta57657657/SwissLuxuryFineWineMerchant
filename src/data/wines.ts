import { WineProduct } from '../utils/wine-logic.ts';

export interface BoutiqueLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string;
  features: string[];
  image: string;
  description: string;
}

export const BOUTIQUES: BoutiqueLocation[] = [
  {
    id: 'melano',
    city: 'Melano',
    name: 'ARVI Headquarter & Cassaforte del Vino',
    address: 'Via Pedemonte di Sopra 1',
    postalCode: '6818 Melano (Ticino)',
    phone: '+41 91 649 68 88',
    email: 'melano@arvi.ch',
    hours: 'Lun - Ven: 08:30 - 18:00 (Su appuntamento)',
    features: ['Caveau ad alta sicurezza', 'Deposito doganale esente IVA', 'Degustazioni private', 'Ritiro ordini'],
    image: '/assets/images/cassaforte_wine_vault_1793186967559.jpg',
    description: 'Il cuore pulsante di ARVI: la nostra sede centrale ospita la celebre Cassaforte del Vino, un caveau blindato a 14°C costanti dove riposano oltre 1 milione di bottiglie pregiate.'
  },
  {
    id: 'lugano',
    city: 'Lugano',
    name: 'ARVI Boutique Lugano',
    address: 'Via Nassa / Piazza Dante',
    postalCode: '6900 Lugano',
    phone: '+41 91 649 68 80',
    email: 'lugano@arvi.ch',
    hours: 'Mar - Sab: 10:00 - 19:00',
    features: ['Sommelier dedicato in boutique', 'Selezione da asporto immediata', 'Enoteca di prestigio'],
    image: '/assets/images/arvi_luxury_boutique_1793186969082.jpg',
    description: 'Nel cuore della lussuosa via dello shopping di Lugano, un salotto raffinato per collezionisti ed appassionati dove scoprire le ultime novità e ritirare le allocazioni En Primeur.'
  },
  {
    id: 'zurigo',
    city: 'Zurigo',
    name: 'ARVI Wine Lounge & Store Zürich',
    address: 'Gotthardstrasse / Paradeplatz',
    postalCode: '8002 Zürich',
    phone: '+41 44 211 40 00',
    email: 'zuerich@arvi.ch',
    hours: 'Lun - Sab: 10:30 - 19:30',
    features: ['Wine Lounge esclusivo', 'Masterclass per collezionisti', 'Consulenza per investimenti in vino'],
    image: '/assets/images/arvi_luxury_boutique_1793186969082.jpg',
    description: 'A due passi da Paradeplatz, un elegante punto di riferimento a Zurigo per assaggiare calici rari, consultare i nostri wine advisor e pianificare le cantine private.'
  }
];

export const WINE_CATALOG: WineProduct[] = [
  // Champagne de Prestige (Real Studio Photography)
  {
    id: 'champagne-rose-barons-de-rothschild',
    name: 'Champagne Rosé',
    producer: 'Barons de Rothschild',
    vintage: 'NV',
    region: 'Champagne',
    country: 'France',
    appellation: 'Champagne AOC',
    type: 'Champagne',
    format: '75cl',
    priceCHF: 59.45,
    criticScores: [
      { critic: 'WS', score: 92 },
      { critic: 'RP', score: 91 }
    ],
    stock: 24,
    inVaultAvailable: true,
    image: '/assets/images/champagne_prestige_bottle_1793189053626.jpg',
    description: 'Raffinata espressione dello stile Rothschild. Blend dominante di Chardonnay Grand Cru con Pinot Noir vinificato in rosso, perlage finissimo e sfumature di petali di rosa.',
    tastingNotes: {
      nose: 'Fragoline di bosco, scorza di mandarino, brioche calda e pepe bianco.',
      palate: 'Attacco cremoso e rinfrescante con vibrante tensione minerale e note di ribes rosso.',
      finish: 'Persistente, pulito, delicatamente agrumato.',
      aging: 'Ideale ora fino al 2029',
      servingTemp: '8°C - 10°C',
      decantTime: 'Servire subito in calice ampio da Champagne'
    }
  },
  {
    id: 'pol-roger-brut-reserve-nv',
    name: 'Champagne Brut Réserve',
    producer: 'Pol Roger',
    vintage: 'NV',
    region: 'Champagne',
    country: 'France',
    appellation: 'Champagne AOC',
    type: 'Champagne',
    format: '75cl',
    priceCHF: 46.50,
    criticScores: [
      { critic: 'RP', score: 92 },
      { critic: 'WS', score: 91 }
    ],
    stock: 60,
    inVaultAvailable: true,
    image: '/assets/images/champagne_prestige_bottle_1793189053626.jpg',
    description: 'Lo Champagne preferito di Sir Winston Churchill. Perfetto equilibrio tra Chardonnay, Pinot Noir e Pinot Meunier con almeno 3 anni di affinamento sui lieviti nelle storiche cantine di Épernay.',
    tastingNotes: {
      nose: 'Note eleganti di pera matura, albicocca secca, vaniglia e crosta di pane dorata.',
      palate: 'Gusto pieno ed armonico, perlage carezzevole con una freschezza vivace e complessa.',
      finish: 'Finale lungo con riverberi di gelsomino e pasticceria fine.',
      aging: 'Pronto da bere, si conserva ottimamente fino a 5 anni',
      servingTemp: '9°C',
      decantTime: 'Nessuna decantazione necessaria'
    }
  },
  {
    id: 'philipponnat-royale-reserve-brut-nv',
    name: 'Champagne Royale Réserve Brut',
    producer: 'Philipponnat',
    vintage: 'NV',
    region: 'Champagne',
    country: 'France',
    appellation: 'Champagne AOC',
    type: 'Champagne',
    format: '75cl',
    priceCHF: 40.00,
    criticScores: [
      { critic: 'RP', score: 92 },
      { critic: 'JS', score: 92 }
    ],
    stock: 36,
    inVaultAvailable: true,
    image: '/assets/images/champagne_prestige_bottle_1793189053626.jpg',
    description: 'Cuvee identitaria della storica maison di Mareuil-sur-Aÿ. Include vini di riserva affinati in botte di rovere secondo il metodo solera perpetuo della famiglia.',
    tastingNotes: {
      nose: 'Fiori di tiglio, mela renetta cotta, miele d’acacia e sfumature tostate.',
      palate: 'Generoso, corposo con una trama sapida data dall’origine Premier e Grand Cru.',
      finish: 'Asciutto, aristocratico e salino.',
      aging: '2024 - 2030',
      servingTemp: '8°C - 10°C',
      decantTime: 'Nessuna'
    }
  },
  {
    id: 'maison-ruinart-brut-rose-nv',
    name: 'Champagne Brut Rosé',
    producer: 'Maison Ruinart',
    vintage: 'NV',
    region: 'Champagne',
    country: 'France',
    appellation: 'Champagne AOC',
    type: 'Champagne',
    format: '75cl',
    priceCHF: 85.40,
    criticScores: [
      { critic: 'WS', score: 93 },
      { critic: 'RP', score: 92 }
    ],
    stock: 18,
    inVaultAvailable: true,
    image: '/assets/images/champagne_prestige_bottle_1793189053626.jpg',
    description: 'Il celebre rosé della più antica maison de Champagne, fondata nel 1729. Una golosa tavolozza aromatica ottenuta con maestria tra Chardonnay luminoso e Pinot Noir fruttato.',
    tastingNotes: {
      nose: 'Melograno, lampone fresco, ciliegia moretta e scorza di pompelmo rosa.',
      palate: 'Ingresso setoso, rotondo con acidità scolpita che regala sublime equilibrio.',
      finish: 'Prolungato con ritorni di mentuccia e spezie fini.',
      aging: 'Pronto, magnifico per i prossimi 4-6 anni',
      servingTemp: '9°C - 11°C',
      decantTime: 'Servire fresco'
    }
  },
  {
    id: 'dom-perignon-vintage-2013',
    name: 'Dom Pérignon Vintage',
    producer: 'Moët & Chandon / Dom Pérignon',
    vintage: 2013,
    region: 'Champagne',
    country: 'France',
    appellation: 'Champagne Grand Cru AOC',
    type: 'Champagne',
    format: '75cl',
    priceCHF: 245.00,
    criticScores: [
      { critic: 'RP', score: 96 },
      { critic: 'JS', score: 98 }
    ],
    stock: 15,
    inVaultAvailable: true,
    image: '/assets/images/champagne_prestige_bottle_1793189053626.jpg',
    description: 'Un’annata di grazia e precisione scultorea. Frutto di un millesimo tardivo che ha regalato tensione minerale eccezionale e profondità straordinaria.',
    tastingNotes: {
      nose: 'Eucalipto, menta piperita, susina mirabelle, cardamomo e fumo nobile.',
      palate: 'Struttura atletica, perlage microscopico, progressione iodata e aristocratica.',
      finish: 'Estremamente salino e persistente con una purezza cristallina.',
      aging: '2024 - 2045+',
      servingTemp: '10°C - 12°C',
      decantTime: 'Consigliati 15 minuti di apertura'
    }
  },
  {
    id: 'dom-perignon-p2-2004',
    name: 'Dom Pérignon P2 Plénitude',
    producer: 'Dom Pérignon',
    vintage: 2004,
    region: 'Champagne',
    country: 'France',
    appellation: 'Champagne Grand Cru AOC',
    type: 'Champagne',
    format: '75cl',
    priceCHF: 495.00,
    criticScores: [
      { critic: 'RP', score: 97 },
      { critic: 'JS', score: 98 }
    ],
    stock: 8,
    inVaultAvailable: true,
    image: '/assets/images/champagne_prestige_bottle_1793189053626.jpg',
    description: 'La Seconda Plénitude di Dom Pérignon: 16 anni di lenta maturazione sui lieviti nelle cantine storiche per un’energia vibrante e una tridimensionalità aromatica straordinaria.',
    tastingNotes: {
      nose: 'Pompelmo rosa, bergamotto, brioche tostata, polvere da sparo e nocciola tostata.',
      palate: 'Perlage cremoso e aristocratico con salinità persistente e freschezza scolpita.',
      finish: 'Lunghissimo, minerale e iodato.',
      aging: '2024 - 2045+',
      servingTemp: '10°C - 12°C',
      decantTime: 'Servire in calice ampio da Borgogna'
    }
  },
  {
    id: 'krug-grande-cuvee-171',
    name: 'Krug Grande Cuvée 171ème Édition',
    producer: 'Maison Krug',
    vintage: 'NV',
    region: 'Champagne',
    country: 'France',
    appellation: 'Champagne AOC',
    type: 'Champagne',
    format: '75cl',
    priceCHF: 260.00,
    criticScores: [
      { critic: 'WS', score: 96 },
      { critic: 'RP', score: 95 }
    ],
    stock: 20,
    inVaultAvailable: true,
    image: '/assets/images/champagne_prestige_bottle_1793189053626.jpg',
    description: 'Creata attorno alla vendemmia 2015, questa cuvée unisce 131 vini di 12 annate differenti. Oltre sette anni di affinamento sui lieviti nelle cantine di Reims.',
    tastingNotes: {
      nose: 'Fiori bianchi d’arancio, marzapane, pan di zenzero, mela cotogna e miele di castagno.',
      palate: 'Ampiezza e ricchezza monumentali bilanciate da un’acidità cristallina ed elegante.',
      finish: 'Complesso, vellutato e indimenticabile.',
      aging: '2024 - 2040',
      servingTemp: '10°C - 12°C',
      decantTime: 'Non decantare'
    }
  },

  // Iconic Fine Wines & Bordeaux Premier Grand Cru
  {
    id: 'chateau-ausone-1995-300cl',
    name: 'Ausone (Double Magnum 300cl)',
    producer: 'Château Ausone',
    vintage: 1995,
    region: 'Bordeaux',
    country: 'France',
    appellation: 'Saint-Émilion 1er Grand Cru Classé A',
    type: 'Red',
    format: '300cl',
    priceCHF: 2918.70,
    criticScores: [
      { critic: 'RG', score: 19 },
      { critic: 'RP', score: 95 }
    ],
    stock: 2,
    inVaultAvailable: true,
    image: '/assets/images/bordeaux_grand_cru_bottle_1793189053792.jpg',
    description: 'Rarissimo formato Double Magnum (300cl) proveniente direttamente da cantina privata climatizzata. Uno dei vertici assoluti della riva destra bordolese, su roccia calcarea pura.',
    tastingNotes: {
      nose: 'Tartufo nero pregiato, tabacco da pipa Havana, mora selvatica, grafite e cedro del Libano.',
      palate: 'Densità vellutata monumentale, tannini integrati come seta antica, opulenza contenuta da una spina dorsale fresca.',
      finish: 'Oltre un minuto di persistenza aromatica indimenticabile.',
      aging: 'All’apice perfetto, longevità garantita fino al 2050',
      servingTemp: '17°C',
      decantTime: 'Decantare 2 ore prima del servizio'
    }
  },
  {
    id: 'chateau-margaux-2015',
    name: 'Château Margaux (Bicentenario)',
    producer: 'Château Margaux',
    vintage: 2015,
    region: 'Bordeaux',
    country: 'France',
    appellation: 'Margaux 1er Grand Cru Classé',
    type: 'Red',
    format: '75cl',
    priceCHF: 1450.00,
    criticScores: [
      { critic: 'RP', score: 99 },
      { critic: 'JS', score: 100 }
    ],
    stock: 5,
    inVaultAvailable: true,
    image: '/assets/images/bordeaux_grand_cru_bottle_1793189053792.jpg',
    description: 'Annata storica del bicentenario della tenuta e tributo al leggendario direttore Paul Pontallier. Bottiglia speciale serigrafata in oro e nero.',
    tastingNotes: {
      nose: 'Profumo inebriante di petali di rosa, violette di Margaux, cedro, ciliegia nera e spezie fini.',
      palate: 'Tridimensionalità setosa ineguagliabile, potenza sublime senza spigoli.',
      finish: 'Persistenza eterea e infinita.',
      aging: '2025 - 2070+',
      servingTemp: '17°C',
      decantTime: '3 ore'
    }
  },
  {
    id: 'chateau-pavie-2010',
    name: 'Château Pavie',
    producer: 'Château Pavie',
    vintage: 2010,
    region: 'Bordeaux',
    country: 'France',
    appellation: 'Saint-Émilion 1er Grand Cru Classé A',
    type: 'Red',
    format: '75cl',
    priceCHF: 490.00,
    criticScores: [
      { critic: 'RP', score: 100 },
      { critic: 'WS', score: 98 }
    ],
    stock: 11,
    inVaultAvailable: true,
    image: '/assets/images/bordeaux_grand_cru_bottle_1793189053792.jpg',
    description: 'Voto 100/100 Robert Parker. Uno dei capolavori del millesimo 2010. Pendenza calcarea ideale esposta a pieno sud che dona concentrazione straordinaria.',
    tastingNotes: {
      nose: 'Liquirizia nera, more di rovo, grafite, tartufo estivo e sottili note tostate di rovere francese.',
      palate: 'Enorme densità estratta con precisione chirurgica. Struttura piramidale e setosa.',
      finish: 'Monumentale, monumentale e persistente.',
      aging: '2025 - 2060+',
      servingTemp: '17°C',
      decantTime: '2 ore e mezza'
    }
  },
  {
    id: 'chateau-pontet-canet-2016',
    name: 'Château Pontet-Canet',
    producer: 'Château Pontet-Canet',
    vintage: 2016,
    region: 'Bordeaux',
    country: 'France',
    appellation: 'Pauillac 5ème Grand Cru Classé',
    type: 'Red',
    format: '75cl',
    priceCHF: 142.00,
    criticScores: [
      { critic: 'RP', score: 98 },
      { critic: 'JS', score: 98 }
    ],
    stock: 42,
    inVaultAvailable: true,
    image: '/assets/images/bordeaux_grand_cru_bottle_1793189053792.jpg',
    description: 'Pioniere della biodinamica nei Grand Cru bordolesi. Cavalli nei vigneti e anfore di cemento danno vita a un Pauillac di purezza e densità mozzafiato.',
    tastingNotes: {
      nose: 'Prugna matura, grafite pura, violetta, cioccolato fondente 85% e scatola di sigari.',
      palate: 'Corpo maestoso, tannini a grana finissima con un’energia vibrante che riempie il palato.',
      finish: 'Coda minerale lunghissima e rinfrescante.',
      aging: '2026 - 2055',
      servingTemp: '17°C',
      decantTime: '2 ore'
    }
  },
  {
    id: 'cheval-blanc-1967',
    name: 'Cheval Blanc',
    producer: 'Château Cheval Blanc',
    vintage: 1967,
    region: 'Bordeaux',
    country: 'France',
    appellation: 'Saint-Émilion 1er Grand Cru Classé A',
    type: 'Red',
    format: '75cl',
    priceCHF: 551.30,
    criticScores: [
      { critic: 'RG', score: 15 },
      { critic: 'WS', score: 89 }
    ],
    stock: 3,
    inVaultAvailable: true,
    image: '/assets/images/bordeaux_grand_cru_bottle_1793189053792.jpg',
    description: 'Un pezzo di storia enologica millesimato 1967. Livello e capsula verificati con perizia ARVI nel nostro laboratorio di Melano prima dell’inserimento nel caveau.',
    tastingNotes: {
      nose: 'Fogliame autunnale bagnato, funghi porcini secchi, noce moscata e fichi macerati.',
      palate: 'Morbido, vellutato con eleganza crepuscolare e finezza tipica del Cabernet Franc maturo.',
      finish: 'Armonioso, sapido con una carezza di legno antico.',
      aging: 'Da bere subito con grande raccoglimento',
      servingTemp: '17°C',
      decantTime: 'Filtrare con cura e servire immediatamente'
    }
  },

  // Burgundy Grand Crus
  {
    id: 'romanee-conti-grand-cru-2017',
    name: 'Romanée-Conti Grand Cru',
    producer: 'Domaine de la Romanée-Conti',
    vintage: 2017,
    region: 'Burgundy',
    country: 'France',
    appellation: 'Romanée-Conti Grand Cru Monopole',
    type: 'Red',
    format: '75cl',
    priceCHF: 21500.00,
    criticScores: [
      { critic: 'RP', score: 98 },
      { critic: 'JS', score: 99 }
    ],
    stock: 1,
    inVaultAvailable: true,
    image: '/assets/images/burgundy_grand_cru_bottle_1793189054648.jpg',
    description: 'Il vertice incontrastato del collezionismo mondiale. Monopole di appena 1.81 ettari a Vosne-Romanée. Provenienza diretta e allocazione certificata con custodia continua a 14°C nel caveau ARVI.',
    tastingNotes: {
      nose: 'Rose appassite orientali, tè lapsang souchong, tartufo bianco, ciliegia amarena e incenso.',
      palate: 'Trascendente sensazione di levità e profondità abissale. Tannino invisibile e potenza senza peso.',
      finish: 'Eterno, spirituale.',
      aging: '2027 - 2075+',
      servingTemp: '16°C',
      decantTime: 'Stappare con rispetto assoluto 2 ore prima'
    }
  },
  {
    id: 'chambertin-2019-armand-rousseau',
    name: 'Chambertin Grand Cru',
    producer: 'Domaine Armand Rousseau',
    vintage: 2019,
    region: 'Burgundy',
    country: 'France',
    appellation: 'Chambertin Grand Cru',
    type: 'Red',
    format: '75cl',
    priceCHF: 2450.00,
    criticScores: [
      { critic: 'RP', score: 99 },
      { critic: 'JS', score: 100 }
    ],
    stock: 0,
    inVaultAvailable: false,
    image: '/assets/images/burgundy_grand_cru_bottle_1793189054648.jpg',
    description: 'Il Re dei vini di Borgogna secondo il maestro incontrastato Armand Rousseau. Attualmente esaurito sul mercato primario, disponibile solo su allocazione privata.',
    tastingNotes: {
      nose: 'Fragola selvatica di bosco, cassis purissimo, incenso, viola mammola e polvere di pietra focaia.',
      palate: 'Potenza senza peso, tannino scolpito a mano, grandiosità regale e aristocratica purezza.',
      finish: 'Sconfinato, eterno.',
      aging: '2030 - 2065',
      servingTemp: '16°C',
      decantTime: '3 ore minime consigliate'
    }
  },
  {
    id: 'bonnes-mares-1989-georges-de-vogue',
    name: 'Bonnes Mares',
    producer: 'Domaine Comte Georges de Vogüé',
    vintage: 1989,
    region: 'Burgundy',
    country: 'France',
    appellation: 'Bonnes-Mares Grand Cru',
    type: 'Red',
    format: '75cl',
    priceCHF: 972.90,
    criticScores: [
      { critic: 'RP', score: 96 },
      { critic: 'WS', score: 94 }
    ],
    stock: 4,
    inVaultAvailable: true,
    image: '/assets/images/burgundy_grand_cru_bottle_1793189054648.jpg',
    description: 'Icona immortale della Côte de Nuits. Vigneti storici nel comune di Chambolle-Musigny, vinificazione tradizionale per un Pinot Noir di austera e ipnotica sensualità.',
    tastingNotes: {
      nose: 'Sottobosco autunnale, mirtilli macerati, pot-pourri di rose appassite, tè nero Keemun e cuoio di Russia.',
      palate: 'Tridimensionale al palato, setoso con un nucleo profondo di ciliegia amarena e note ferrose minerali.',
      finish: 'Lungo, etereo, commovente.',
      aging: 'Momento d’oro di beva, fino al 2038',
      servingTemp: '16°C',
      decantTime: 'Stappare con delicatezza 1 ora prima'
    }
  },
  {
    id: 'chavy-chouet-puligny-montrachet-2022',
    name: 'Puligny-Montrachet Les Enseignères',
    producer: 'Domaine Chavy-Chouet',
    vintage: 2022,
    region: 'Burgundy',
    country: 'France',
    appellation: 'Puligny-Montrachet AOC',
    type: 'White',
    format: '75cl',
    priceCHF: 115.00,
    criticScores: [
      { critic: 'RP', score: 94 },
      { critic: 'JS', score: 95 }
    ],
    stock: 18,
    inVaultAvailable: true,
    image: '/assets/images/burgundy_grand_cru_bottle_1793189054648.jpg',
    description: 'Espressione magistrale di Romaric Chavy a Puligny-Montrachet. Vecchie vigne adiacenti a Bâtard-Montrachet: tensione minerale, agrumi canditi, nocciola tostata e purezza cristallina.',
    tastingNotes: {
      nose: 'Fiori bianchi di biancospino, pietra focaia, scorza di limone d’Amalfi, burro fresco e gesso.',
      palate: 'Attacco tagliente ed energetico, polpa ricca di pera Williams sostenuta da una vibrante vena acida calcarea.',
      finish: 'Salino, fresco e persistente.',
      aging: '2024 - 2038',
      servingTemp: '11°C - 12°C',
      decantTime: 'Servire fresco dopo 20 minuti di apertura'
    }
  },

  // Tuscany & Switzerland
  {
    id: 'sassicaia-2019-tenuta-san-guido',
    name: 'Sassicaia',
    producer: 'Tenuta San Guido',
    vintage: 2019,
    region: 'Tuscany',
    country: 'Italy',
    appellation: 'Bolgheri Sassicaia DOC',
    type: 'Red',
    format: '75cl',
    priceCHF: 285.00,
    criticScores: [
      { critic: 'RP', score: 98 },
      { critic: 'WS', score: 98 }
    ],
    stock: 30,
    inVaultAvailable: true,
    image: '/assets/images/tuscany_icon_bottle_1793199142012.jpg',
    description: 'L’annata capolavoro del mito di Bolgheri. 85% Cabernet Sauvignon e 15% Cabernet Franc dai terreni sassosi di Castiglioncello e San Martino.',
    tastingNotes: {
      nose: 'Cassis, rosmarino toscano, macchia mediterranea, grafite e tostatura nobile.',
      palate: 'Equilibrio impeccabile tra vigore tannico aristocratrico e freschezza balsamina.',
      finish: 'Austero, profondo e lunghissimo.',
      aging: '2025 - 2055',
      servingTemp: '17°C',
      decantTime: '2 ore'
    }
  },
  {
    id: 'masseto-2018-ornellaia',
    name: 'Masseto',
    producer: "Tenuta dell'Ornellaia",
    vintage: 2018,
    region: 'Tuscany',
    country: 'Italy',
    appellation: 'Toscana IGT',
    type: 'Red',
    format: '75cl',
    priceCHF: 890.00,
    criticScores: [
      { critic: 'JS', score: 99 },
      { critic: 'RP', score: 98 }
    ],
    stock: 7,
    inVaultAvailable: true,
    image: '/assets/images/tuscany_icon_bottle_1793199142012.jpg',
    description: 'Il più grande Merlot italiano, nato sulla collina di argilla blu pliocenica di Bolgheri. Un vino di leggendaria densità e setosità vellutata.',
    tastingNotes: {
      nose: 'Cioccolato fondente amaro, mora di rovo, violetta candita, vaniglia e tartufo nero.',
      palate: 'Opulenza maestosa controllata da tannini finissimi e un’avvolgenza principesca.',
      finish: 'Sconfinato e setoso.',
      aging: '2026 - 2060',
      servingTemp: '17°C',
      decantTime: '2 ore e mezza'
    }
  },
  {
    id: 'gantenbein-pinot-noir-2020-switzerland',
    name: 'Gantenbein Pinot Noir',
    producer: 'Daniel & Martha Gantenbein',
    vintage: 2020,
    region: 'Switzerland',
    country: 'Switzerland',
    appellation: 'Bündner Herrschaft (Grigioni)',
    type: 'Red',
    format: '75cl',
    priceCHF: 220.00,
    criticScores: [
      { critic: 'RP', score: 96 },
      { critic: 'RG', score: 19 }
    ],
    stock: 12,
    inVaultAvailable: true,
    image: '/assets/images/swiss_icon_bottle_1793199142931.jpg',
    description: 'Il vertice assoluto della viticoltura svizzera a Fläsch nei Grigioni. Un Pinot Noir di classe mondiale vinificato per gravità ed elevato in rovere francese di Borgogna.',
    tastingNotes: {
      nose: 'Lampone alpino, grafite, chiodi di garofano, corteccia umida e noce moscata.',
      palate: 'Tensione minerale vibrante, freschezza alpina e trama tannica di seta purissima.',
      finish: 'Salino, fresco e interminabile.',
      aging: '2024 - 2042',
      servingTemp: '16°C',
      decantTime: '1 ora'
    }
  },

  // Collector Wooden Cases (OWC)
  {
    id: 'arvi-20th-anniversary-case',
    name: 'ARVI 20th Anniversary Case (Ducru-Beaucaillou 6x 75cl)',
    producer: 'ARVI Private Cellar Selection',
    vintage: 'NV',
    region: 'Bordeaux',
    country: 'France',
    appellation: 'Saint-Julien Grand Cru Classé',
    type: 'Red',
    format: 'Case (6x75cl)',
    priceCHF: 3297.05,
    criticScores: [
      { critic: 'RP', score: 98 },
      { critic: 'WS', score: 97 }
    ],
    stock: 5,
    inVaultAvailable: true,
    image: '/assets/images/collector_wooden_case_1793189054859.jpg',
    description: 'Cofanetto celebrativo per il ventesimo anniversario di ARVI SA. Racchiude 6 annate storiche leggendarie di Château Ducru-Beaucaillou (2004, 2008, 2010, 2014, 2016, 2020) in cassa in legno numerata.',
    tastingNotes: {
      nose: 'Evoluzione verticale dal frutto giovane alla complessità terziaria di tabacco e tartufo.',
      palate: 'Un compendio magistrale dello stile Saint-Julien: aristocrazia, finezza e longevità.',
      finish: 'Polifonico ed elegante.',
      aging: '2024 - 2060',
      servingTemp: '17°C',
      decantTime: 'A seconda dell’annata scelta'
    }
  },
  {
    id: 'coffret-decennie-angelus-6bts',
    name: "Coffret Décennie Château L'Angélus (6x 75cl)",
    producer: "Château L'Angélus",
    vintage: 'NV',
    region: 'Bordeaux',
    country: 'France',
    appellation: 'Saint-Émilion 1er Grand Cru Classé A',
    type: 'Red',
    format: 'Case (6x75cl)',
    priceCHF: 2156.60,
    criticScores: [
      { critic: 'RP', score: 99 },
      { critic: 'JS', score: 99 }
    ],
    stock: 3,
    inVaultAvailable: true,
    image: '/assets/images/collector_wooden_case_1793189054859.jpg',
    description: 'Una decade di perfezione con Château L’Angélus: 2012, 2014, 2016, 2018, 2020, 2022. Consegnato in splendido cofanetto laccato nero con certificato di autenticità della proprietà.',
    tastingNotes: {
      nose: 'Frutti neri intensi, campane di spezie, caffè tostato, cedro e mirtillo.',
      palate: 'La setosità sublime del Merlot sposata alla razza minerale del Cabernet Franc.',
      finish: 'Grandioso e armonioso.',
      aging: '2024 - 2055',
      servingTemp: '17°C',
      decantTime: '2 ore'
    }
  },
  {
    id: 'bibi-graetz-balocchi-di-colore-6bts',
    name: 'Bibi Graetz Balocchi di Colore (6x 75cl Case)',
    producer: 'Bibi Graetz',
    vintage: 'NV',
    region: 'Tuscany',
    country: 'Italy',
    appellation: 'Toscana IGT',
    type: 'Red',
    format: 'Case (6x75cl)',
    priceCHF: 1351.25,
    criticScores: [
      { critic: 'RP', score: 97 },
      { critic: 'JS', score: 98 }
    ],
    stock: 6,
    inVaultAvailable: true,
    image: '/assets/images/collector_wooden_case_1793189054859.jpg',
    description: 'Edizione limitata creata dall’artista e vignaiolo toscano Bibi Graetz. Un viaggio sensoriale attraverso le singole parcelle storiche che compongono il leggendario vino Colore.',
    tastingNotes: {
      nose: 'Arancia rossa sanguinella, rosmarino selvatico, lampone e polvere di roccia vulcanica.',
      palate: 'Elettrico, puro, dinamico con un tannino trasparente ed un’anima toscana indomita.',
      finish: 'Fresco e sapido.',
      aging: '2024 - 2045',
      servingTemp: '16°C',
      decantTime: '1 ora'
    }
  },
  {
    id: 'duclot-9-bottles-bordeaux-collection',
    name: 'Duclot Bordeaux Collection Case (9x 75cl)',
    producer: 'Assortment Bordeaux Grand Cru Classé',
    vintage: 2019,
    region: 'Bordeaux',
    country: 'France',
    appellation: 'Bordeaux Prestigious Collection',
    type: 'Red',
    format: 'Case (9x75cl)',
    priceCHF: 8972.30,
    criticScores: [
      { critic: 'RP', score: 100 },
      { critic: 'JS', score: 100 }
    ],
    stock: 2,
    inVaultAvailable: true,
    image: '/assets/images/collector_wooden_case_1793189054859.jpg',
    description: 'Il cofanetto più ambito al mondo dai grandi collezionisti. Contiene le 9 perle di Bordeaux dell’annata stellare 2019: Ausone, Cheval Blanc, Haut-Brion, Lafite Rothschild, Mouton Rothschild, Margaux, La Mission Haut-Brion, Petrus e Château d’Yquem.',
    tastingNotes: {
      nose: 'L’Olimpo dei profumi bordolesi in 9 declinazioni uniche.',
      palate: 'Incomparabile densità, purezza nobiliare e potenza controllata.',
      finish: 'Scolpito nel marmo del tempo.',
      aging: '2030 - 2080+',
      servingTemp: '17°C',
      decantTime: 'Per intenditori e collezionisti'
    }
  }
];
