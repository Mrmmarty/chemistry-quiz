export const quizData = [
  {
    section: "Faseovergangen",
    description: "Je moet de drie fasen; gas, vloeistof en vast kennen, plus alle overgangen.",
    questions: [
      {
        id: "fase-1",
        question: "Welke faseovergang vindt plaats als ijs direct verandert in waterdamp?",
        options: ["Smelten", "Verdampen", "Sublimeren", "Condenseren"],
        answer: "Sublimeren",
        explanation: "Bij sublimeren gaat een stof direct van vaste fase naar gas fase."
      },
      {
        id: "fase-2",
        question: "Bij welke faseovergang komt een stof van gasvormig naar vloeibaar?",
        options: ["Verdampen", "Condenseren", "Stollen", "Rijpen"],
        answer: "Condenseren",
        explanation: "Bij condenseren gaat een stof van gas fase naar vloeibare fase."
      },
      {
        id: "fase-3",
        question: "Wat gebeurt er tijdens het stollen?",
        options: ["Vloeistof wordt gas", "Vloeistof wordt vast", "Gas wordt vloeistof", "Vast wordt vloeistof"],
        answer: "Vloeistof wordt vast",
        explanation: "Bij stollen gaat een stof van vloeibare fase naar vaste fase."
      },
      {
        id: "fase-4",
        question: "Welke faseovergang vindt plaats bij het smelten?",
        options: ["Vast wordt vloeistof", "Vloeistof wordt gas", "Gas wordt vloeistof", "Vast wordt gas"],
        answer: "Vast wordt vloeistof",
        explanation: "Bij smelten gaat een stof van vaste fase naar vloeibare fase."
      },
      {
        id: "fase-5",
        question: "Wat is 'rijpen' in termen van faseovergangen?",
        options: ["Vast wordt vloeistof", "Vloeistof wordt vast", "Gas wordt vloeistof", "Gas wordt vast"],
        answer: "Gas wordt vast",
        explanation: "Bij rijpen (ook wel depositie genoemd) gaat een stof direct van gas fase naar vaste fase."
      }
    ]
  },
  {
    section: "Mengsels",
    description: "Je moet de mengsels kennen en weten welke fasen de stoffen hebben die erin zitten.",
    questions: [
      {
        id: "meng-1",
        question: "Welke fasen heeft een emulsie?",
        options: ["Vloeistof + Gas", "Vloeistof + Vloeistof", "Vaste stof + Vloeistof", "Gas + Vaste stof"],
        answer: "Vloeistof + Vloeistof",
        explanation: "Een emulsie bestaat uit vloeistof + vloeistof, zoals melk."
      },
      {
        id: "meng-2",
        question: "Alcohol in water is een voorbeeld van:",
        options: ["Suspensie", "Oplossing", "Emulsie", "Schuim"],
        answer: "Oplossing",
        explanation: "Alcohol in water is een oplossing (vloeistof + vloeistof)."
      },
      {
        id: "meng-3",
        question: "Wordt een mengsel van 'Vloeistof + Vloeistof' in de vorm van een emulsie gescheiden als je het laat staan?",
        options: ["Ja", "Nee"],
        answer: "Nee",
        explanation: "Een emulsie (vloeistof + vloeistof) scheidt niet als je het laat staan."
      },
      {
        id: "meng-4",
        question: "Welk mengsel bevat Gas + Vloeistof?",
        options: ["Schuim", "Rook", "Nevel", "Suspensie"],
        answer: "Nevel",
        explanation: "Nevel bestaat uit gas + vloeistof, zoals mist."
      },
      {
        id: "meng-5",
        question: "Chocolademelk is een voorbeeld van:",
        options: ["Oplossing", "Schuim", "Suspensie", "Emulsie"],
        answer: "Suspensie",
        explanation: "Chocolademelk is een suspensie (vaste stof + vloeistof)."
      },
      {
        id: "meng-6",
        question: "Slagroom is een voorbeeld van:",
        options: ["Oplossing", "Schuim", "Suspensie", "Emulsie"],
        answer: "Schuim",
        explanation: "Slagroom is een schuim (vloeistof + gas)."
      },
      {
        id: "meng-7",
        question: "Welke fasen heeft rook?",
        options: ["Vloeistof + Gas", "Vloeistof + Vloeistof", "Vaste stof + Vloeistof", "Gas + Vaste stof"],
        answer: "Gas + Vaste stof",
        explanation: "Rook bestaat uit gas + vaste stof."
      }
    ]
  },
  {
    section: "Scheidingsmethoden",
    description: "Overzicht van de verschillende scheidingsmethoden en hun toepassingen.",
    questions: [
      {
        id: "scheid-1",
        question: "Welke scheidingsmethode gebruik je bij een suspensie?",
        options: ["Destilleren", "Filtreren", "Chromatografie", "Indampen"],
        answer: "Filtreren",
        explanation: "Bij een suspensie gebruik je filtreren om de vaste stof van de vloeistof te scheiden."
      },
      {
        id: "scheid-2",
        question: "Bij welke scheidingsmethode voeg je een adsorptiemiddel toe aan een mengsel?",
        options: ["Adsorberen", "Extraheren", "Centrifugeren", "Filtreren"],
        answer: "Adsorberen",
        explanation: "Bij adsorberen voeg je een adsorptiemiddel (meestal norit) toe aan een mengsel."
      },
      {
        id: "scheid-3",
        question: "Bij destilleren verwarm je het mengsel in de kolf. Wat gebeurt er dan?",
        options: [
          "De stof die als eerste verdampt, stroomt de buis in", 
          "Alle stoffen verdampen tegelijk", 
          "De zwaarste stof verdampt eerst", 
          "Er vindt geen verdamping plaats"
        ],
        answer: "De stof die als eerste verdampt, stroomt de buis in",
        explanation: "Bij destilleren verdampt de stof met het laagste kookpunt eerst."
      },
      {
        id: "scheid-4",
        question: "Welke scheidingsmethode gebruikt dichtheid als stofeigenschap?",
        options: ["Destilleren", "Filtreren", "Centrifugeren", "Chromatografie"],
        answer: "Centrifugeren",
        explanation: "Centrifugeren maakt gebruik van het verschil in dichtheid om stoffen te scheiden."
      },
      {
        id: "scheid-5",
        question: "Wat noem je de vloeistof die door het filtreerpapiertje heen gaat bij filtreren?",
        options: ["Residu", "Destillaat", "Filtraat", "Extract"],
        answer: "Filtraat",
        explanation: "De vloeistof die door het papier heen gaat noemen we het filtraat."
      },
      {
        id: "scheid-6",
        question: "Wat blijft achter in de kolf bij destilleren?",
        options: ["Filtraat", "Residu", "Destillaat", "Extract"],
        answer: "Residu",
        explanation: "Wat er in de kolf achterblijft noemen we het residu."
      },
      {
        id: "scheid-7",
        question: "Welke stofeigenschap wordt gebruikt bij extraheren?",
        options: ["Kookpunt", "Deeltjesgrootte", "Oplosbaarheid", "Aanhechtingsvermogen"],
        answer: "Oplosbaarheid",
        explanation: "Bij extraheren wordt gebruik gemaakt van verschil in oplosbaarheid."
      },
      {
        id: "scheid-8",
        question: "Wat is het verschil tussen destilleren en indampen?",
        options: [
          "Er is geen verschil", 
          "Bij destilleren ben je geïnteresseerd in wat verdampt, bij indampen in wat achterblijft", 
          "Destilleren werkt alleen bij vloeistoffen, indampen bij alle stoffen", 
          "Destilleren is sneller dan indampen"
        ],
        answer: "Bij destilleren ben je geïnteresseerd in wat verdampt, bij indampen in wat achterblijft",
        explanation: "Indampen lijkt heel erg op destilleren, je bent alleen geïnteresseerd in het residu. De andere stof verdampt gewoon en gaat verloren."
      }
    ]
  },
  {
    section: "Dichtheid",
    description: "Met de dichtheid geven we aan hoe zwaar 1 ml of 1 cm³ van een stof is.",
    questions: [
      {
        id: "dicht-1",
        question: "Wat is de formule voor dichtheid?",
        options: ["ρ = V × m", "ρ = m : V", "ρ = m + V", "ρ = m - V"],
        answer: "ρ = m : V",
        explanation: "Dichtheid (ρ) = massa (m) : volume (V)"
      },
      {
        id: "dicht-2",
        question: "Een blok heeft een massa van 30g en een volume van 10cm³. Wat is de dichtheid?",
        options: ["0,33 g/cm³", "3 g/cm³", "300 g/cm³", "40 g/cm³"],
        answer: "3 g/cm³",
        explanation: "ρ = m : V = 30g : 10cm³ = 3 g/cm³"
      },
      {
        id: "dicht-3",
        question: "Een vloeistof heeft een dichtheid van 0,9 g/ml en een volume van 250 ml. Wat is de massa?",
        options: ["225 g", "277,8 g", "0,0036 g", "249,1 g"],
        answer: "225 g",
        explanation: "m = V × ρ = 250ml × 0,9g/ml = 225g"
      },
      {
        id: "dicht-4",
        question: "Een voorwerp heeft een massa van 56 g en een dichtheid van 7 g/cm³. Wat is het volume?",
        options: ["8 cm³", "49 cm³", "63 cm³", "392 cm³"],
        answer: "8 cm³",
        explanation: "V = m : ρ = 56g : 7g/cm³ = 8cm³"
      },
      {
        id: "dicht-5",
        question: "Hoe bereken je volume als je massa en dichtheid weet?",
        options: ["V = m + ρ", "V = m × ρ", "V = m : ρ", "V = ρ : m"],
        answer: "V = m : ρ",
        explanation: "Volume = massa : dichtheid of V = m : ρ"
      },
      {
        id: "dicht-6",
        question: "Welke eenheden zijn gelijk aan elkaar?",
        options: ["1 cm³ = 1 L", "1 ml = 1 L", "1 cm³ = 1 ml", "1 dm³ = 1 ml"],
        answer: "1 cm³ = 1 ml",
        explanation: "1 cm³ = 1 ml"
      },
      {
        id: "dicht-7",
        question: "Hoeveel milliliter is 1 μl?",
        options: ["0,01 ml", "0,001 ml", "0,1 ml", "0,0001 ml"],
        answer: "0,001 ml",
        explanation: "1 μl = 0,001 ml"
      }
    ]
  },
  {
    section: "Praktijklokaal regels",
    description: "Zie hieronder voor de regels in het lab en tijdens practica.",
    questions: [
      {
        id: "lab-1",
        question: "Wat moet je NIET doen in het lab?",
        options: ["Handschoenen dragen", "Concentreren op je werk", "Eten of drinken", "Handen wassen"],
        answer: "Eten of drinken",
        explanation: "Regel 5: Niet eten of drinken in het lab."
      },
      {
        id: "lab-2",
        question: "Hoe krijg je een ruisende blauwe vlam bij een brander?",
        options: ["Luchttoevoer dicht", "Luchttoevoer beetje open", "Luchttoevoer geheel open", "Zonder gas"],
        answer: "Luchttoevoer geheel open",
        explanation: "Bij een ruisende blauwe vlam is de luchttoevoer geheel open."
      },
      {
        id: "lab-3",
        question: "Wat is stap 1 bij het aanzetten van de brander?",
        options: [
          "Steek de lucifer aan", 
          "Draai de gaskraan open", 
          "Controleer de schoorsteen op verstoppingen", 
          "Sluit de gasslang aan"
        ],
        answer: "Controleer de schoorsteen op verstoppingen",
        explanation: "Stap 1 bij het aanzetten van de brander is het controleren van de schoorsteen op verstoppingen."
      },
      {
        id: "lab-4",
        question: "Wat moet je doen met lang haar in het lab?",
        options: ["Geen restricties", "Mooi laten hangen", "In een staart/knot doen", "Afknippen voor het practicum"],
        answer: "In een staart/knot doen",
        explanation: "Regel 6: Lang haar in een staart/knot."
      },
      {
        id: "lab-5",
        question: "Wat ontstaat bij onvolledige verbranding met een gele vlam?",
        options: [
          "Alleen koolstofdioxide", 
          "Alleen water", 
          "'Roet' (koolstof), koolstofmonoxide, koolstofdioxide en water", 
          "Alleen koolstofmonoxide"
        ],
        answer: "'Roet' (koolstof), koolstofmonoxide, koolstofdioxide en water",
        explanation: "Bij onvolledige verbranding (gele vlam) ontstaat 'roet' (koolstof), koolstofmonoxide (CO), koolstofdioxide (CO₂) en water (H₂O)."
      },
      {
        id: "lab-6",
        question: "Wanneer moet je je handen wassen in het lab?",
        options: ["Alleen voor het practicum", "Alleen na het practicum", "Voor én na een practicum", "Alleen als ze zichtbaar vies zijn"],
        answer: "Voor én na een practicum",
        explanation: "Regel 7: Voor én na een practicum altijd je handen wassen."
      },
      {
        id: "lab-7",
        question: "Wat is de juiste volgorde bij het aanzetten van de brander?",
        options: [
          "Controleer schoorsteen, draai gasknop open, steek lucifer aan, draai hoofdkraan open", 
          "Controleer schoorsteen, steek lucifer aan, draai hoofdkraan open, draai gasknop open", 
          "Draai hoofdkraan open, steek lucifer aan, controleer schoorsteen, draai gasknop open", 
          "Steek lucifer aan, controleer schoorsteen, draai hoofdkraan open, draai gasknop open"
        ],
        answer: "Controleer schoorsteen, steek lucifer aan, draai hoofdkraan open, draai gasknop open",
        explanation: "De juiste volgorde is: 1) Controleer schoorsteen, 2) Steek lucifer aan, 3) Draai hoofdkraan open, 4) Draai gasknop open."
      }
    ]
  },
  {
    section: "Blokschema maken",
    description: "Bij het maken van een blokschema is het belangrijk om goed te lezen welke stoffen je allemaal hebt.",
    questions: [
      {
        id: "blok-1",
        question: "Wat is een blokschema?",
        options: [
          "Een tekening van moleculen", 
          "Een schema met meerdere blokken waarin elke stap van een reactie wordt beschreven", 
          "Een grafiek met meetwaarden", 
          "Een verzameling formules"
        ],
        answer: "Een schema met meerdere blokken waarin elke stap van een reactie wordt beschreven",
        explanation: "Een blokschema heeft meerdere blokken waarin elke stap wordt beschreven."
      },
      {
        id: "blok-2",
        question: "Wat schrijf je in een blok van een blokschema?",
        options: [
          "De naam van de stof", 
          "Wat er gebeurt, bijvoorbeeld filteren of indampen", 
          "De chemische formule", 
          "De temperatuur"
        ],
        answer: "Wat er gebeurt, bijvoorbeeld filteren of indampen",
        explanation: "In elk blok schrijf je op wat er gebeurt, bijvoorbeeld filteren of indampen."
      },
      {
        id: "blok-3",
        question: "Welke termen gebruik je bij de pijlen tussen blokken in een blokschema?",
        options: [
          "Start en eind", 
          "Chemische formules", 
          "Beginstof, tussenstof, eindstof en gescheiden stof", 
          "Reactie 1, reactie 2, etc."
        ],
        answer: "Beginstof, tussenstof, eindstof en gescheiden stof",
        explanation: "Bij de pijlen tussen blokken gebruik je termen als beginstof, tussenstof, eindstof en gescheiden stof."
      }
    ]
  },
  {
    section: "Quantitatieve analyse",
    description: "Hoe teken je een ijkgrafiek?",
    questions: [
      {
        id: "quant-1",
        question: "Hoe ziet een correcte ijklijn eruit?",
        options: [
          "Een vloeiende lijn door alle punten", 
          "Een rechte lijn waarbij sommige punten boven en andere onder de lijn liggen", 
          "Een gekromde lijn die alle punten raakt", 
          "Meerdere rechte lijnen tussen elk punt"
        ],
        answer: "Een rechte lijn waarbij sommige punten boven en andere onder de lijn liggen",
        explanation: "Bij een ijkgrafiek teken je een rechte lijn zo precies mogelijk tussen de meetpunten."
      },
      {
        id: "quant-2",
        question: "Als je weet dat je suikeroplossing een dichtheid heeft van 1,015 g/mL, welke suikerconcentratie lees je af op de ijkgrafiek uit het studiemateriaal?",
        options: ["Ongeveer 35 g/L", "Ongeveer 50 g/L", "Ongeveer 20 g/L", "Ongeveer 40 g/L"],
        answer: "Ongeveer 35 g/L",
        explanation: "Bij een dichtheid van 1,015 g/mL lees je op de grafiek ongeveer 35 g/L af."
      },
      {
        id: "quant-3",
        question: "Wat betekent 'concentratie' bij een suikeroplossing?",
        options: [
          "Hoe goed je geconcentreerd bent", 
          "Hoeveel gram stof er opgelost is in 1 L vloeistof", 
          "De dichtheid van de oplossing", 
          "Het aantal suikerklontjes per kopje"
        ],
        answer: "Hoeveel gram stof er opgelost is in 1 L vloeistof",
        explanation: "Met de concentratie wordt bedoeld hoeveel gram stof er opgelost is in 1 L vloeistof (oplosmiddel, meestal water)."
      },
      {
        id: "quant-4",
        question: "Wat zijn de stappen om een ijkgrafiek te tekenen?",
        options: [
          "Teken eerst een vloeiende curve, dan de punten", 
          "Teken alleen de gemeten punten", 
          "Teken de punten in de grafiek, teken met een liniaal een rechte lijn zo precies mogelijk tussen de meetpunten", 
          "Verbind alle punten met rechte lijntjes"
        ],
        answer: "Teken de punten in de grafiek, teken met een liniaal een rechte lijn zo precies mogelijk tussen de meetpunten",
        explanation: "Stappen om een ijkgrafiek te tekenen: 1. Teken de punten in de grafiek. 2. Teken met behulp van een liniaal een rechte lijn, zo precies mogelijk tussen de meetpunten."
      },
      {
        id: "quant-5",
        question: "Waarom wordt een ijkgrafiek gebruikt bij het suikerbiet experiment?",
        options: [
          "Om de temperatuur te meten", 
          "Om later te kunnen aflezen wat de concentratie is van je suikeroplossing", 
          "Om te bepalen hoe groot de bieten zijn", 
          "Om de zuiverheid van water te testen"
        ],
        answer: "Om later te kunnen aflezen wat de concentratie is van je suikeroplossing",
        explanation: "Zo kunnen jullie later op jullie ijklijn goed aflezen wat de concentratie is van jullie suikeroplossing en dus ook hoeveel suiker er is in jullie suikerbiet!"
      }
    ]
  }
]; 