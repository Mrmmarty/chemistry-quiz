export const quizData = {
  sections: [
    {
      id: "faseovergangen",
      title: "Faseovergangen",
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
      id: "mengsels",
      title: "Mengsels",
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
      id: "scheidingsmethoden",
      title: "Scheidingsmethoden",
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
      id: "dichtheid",
      title: "Dichtheid",
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
        }
      ]
    },
    {
      id: "praktijklokaal",
      title: "Praktijklokaal regels",
      description: "Belangrijke veiligheidsregels voor in het lab.",
      questions: [
        {
          id: "lab-1",
          question: "Wat zijn de eerste drie labregels?",
          options: [
            "Jassen en tassen netjes weggelegd, labjas aan, veiligheidsbrillen op", 
            "Niet eten of drinken, handen wassen, rustig werken", 
            "Lang haar in een staart, niet rennen, geen open schoenen", 
            "Niet proeven van stoffen, voorzichtig ruiken, handschoenen aan"
          ],
          answer: "Jassen en tassen netjes weggelegd, labjas aan, veiligheidsbrillen op",
          explanation: "De eerste drie labregels zijn: 1. Jassen en tassen netjes weggelegd, 2. Labjas aan, veiligheidsbrillen op en handschoenen aan, 3. Proef nooit van een stof"
        },
        {
          id: "lab-2",
          question: "Hoe moet je aan een stof ruiken in het lab?",
          options: [
            "Direct aan de stof ruiken", 
            "Heel voorzichtig met wapperende hand", 
            "Nooit aan stoffen ruiken", 
            "Met een rietje de geur opzuigen"
          ],
          answer: "Heel voorzichtig met wapperende hand",
          explanation: "Je moet heel voorzichtig aan stoffen ruiken, niet direct maar met een wapperende hand om wat geur naar je toe te waaien."
        },
        {
          id: "lab-3",
          question: "Wat doe je met lang haar in het lab?",
          options: [
            "Niets, dat maakt niet uit", 
            "In een staart of knot dragen", 
            "Onder je labjas stoppen", 
            "Kort knippen voor je het lab ingaat"
          ],
          answer: "In een staart of knot dragen",
          explanation: "Lang haar moet in een staart/knot om te voorkomen dat het in contact komt met chemicaliën of vlam vat."
        },
        {
          id: "lab-4",
          question: "Hoe krijg je een ruisende blauwe vlam bij een brander?",
          options: [
            "Door de luchttoevoer geheel open te zetten", 
            "Door de luchttoevoer volledig te sluiten", 
            "Door meer gas toe te voegen", 
            "Door de brander schuin te houden"
          ],
          answer: "Door de luchttoevoer geheel open te zetten",
          explanation: "Door de luchttoevoer geheel open te zetten krijg je een ruisende blauwe vlam bij een brander."
        },
        {
          id: "lab-5",
          question: "Wat ontstaat bij onvolledige verbranding (gele vlam)?",
          options: [
            "Alleen water en zuurstof", 
            "Roet, koolstofmonoxide, koolstofdioxide en water", 
            "Alleen koolstofdioxide en water", 
            "Stikstofoxide en waterstof"
          ],
          answer: "Roet, koolstofmonoxide, koolstofdioxide en water",
          explanation: "Bij onvolledige verbranding (gele vlam) ontstaat roet (koolstof), koolstofmonoxide (CO), koolstofdioxide (CO₂) en water (H₂O)."
        },
        {
          id: "lab-6",
          question: "Wat is de juiste volgorde bij het aanzetten van de brander?",
          options: [
            "Draai de gasknop open, steek de lucifer aan, draai de hoofdkraan open", 
            "Steek de lucifer aan, draai de gasknop open, draai de hoofdkraan open", 
            "Controleer schoorsteen, steek lucifer aan, draai hoofdkraan open, draai gasknop open", 
            "Draai hoofdkraan open, draai gasknop open, steek lucifer aan"
          ],
          answer: "Controleer schoorsteen, steek lucifer aan, draai hoofdkraan open, draai gasknop open",
          explanation: "De juiste volgorde is: 1. Controleer schoorsteen op verstoppingen, 2. Steek de lucifer aan, 3. Draai de hoofdkraan open, 4. Draai de gasknop open."
        }
      ]
    },
    {
      id: "blokschema",
      title: "Blokschema maken",
      description: "Een schema met meerdere blokken waarin elke stap van een reactie wordt beschreven.",
      questions: [
        {
          id: "blok-1",
          question: "Wat is een blokschema?",
          options: [
            "Een tabel met elementen", 
            "Een schema met meerdere blokken waarin elke stap van een reactie wordt beschreven", 
            "Een tekening van moleculen", 
            "Een lijst met chemische formules"
          ],
          answer: "Een schema met meerdere blokken waarin elke stap van een reactie wordt beschreven",
          explanation: "Een blokschema is een schema met meerdere blokken waarin elke stap van een reactie wordt beschreven."
        },
        {
          id: "blok-2",
          question: "Wat schrijf je in een blok van een blokschema?",
          options: [
            "De naam van de stof", 
            "De chemische formule", 
            "Wat er gebeurt, bijvoorbeeld filteren of indampen", 
            "Het atoomnummer"
          ],
          answer: "Wat er gebeurt, bijvoorbeeld filteren of indampen",
          explanation: "In elk blok schrijf je op wat er gebeurt, bijvoorbeeld filteren of indampen."
        },
        {
          id: "blok-3",
          question: "Welke termen gebruik je bij de pijlen tussen blokken?",
          options: [
            "Beginstof, tussenstof, eindstof en gescheiden stof", 
            "Reactant en product", 
            "Atoom en molecuul", 
            "Element en verbinding"
          ],
          answer: "Beginstof, tussenstof, eindstof en gescheiden stof",
          explanation: "Bij de pijlen tussen blokken gebruik je termen als beginstof, tussenstof, eindstof en gescheiden stof."
        },
        {
          id: "blok-4",
          question: "In welke volgorde zet je de blokken in een blokschema?",
          options: [
            "Willekeurige volgorde", 
            "Van zwaarste naar lichtste stof", 
            "In volgorde van de stappen van het proces", 
            "Alfabetische volgorde"
          ],
          answer: "In volgorde van de stappen van het proces",
          explanation: "De blokken in een blokschema zet je in volgorde van de stappen van het proces, zodat het schema logisch te volgen is."
        }
      ]
    }
  ]
}; 