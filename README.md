# Scheikunde Quiz (Chemistry Quiz)

Een interactieve quiz applicatie voor het leren van scheikunde concepten. Deze app is ontworpen voor leerlingen en bevat quizvragen en flashcards om het leren te ondersteunen.

## Project Structuur

Het project heeft de volgende structuur:

```
chemistry-quiz/
├── src/                      # Broncode van de React/Next.js app
│   ├── app/                  # Next.js app router structuur
│   │   ├── quiz/             # Quiz pagina
│   │   ├── flashcards/       # Flashcards pagina
│   │   ├── globals.css       # Globale stijlen
│   │   ├── layout.tsx        # Layout component
│   │   └── page.tsx          # Homepage
│   ├── components/           # React componenten
│   │   ├── ui/               # UI componenten (shadcn/ui)
│   │   ├── Flashcard.tsx     # Flashcard component
│   │   ├── QuestionCard.tsx  # Vraag component
│   │   └── QuizSection.tsx   # Quiz sectie component
│   ├── data/                 # Data voor de quiz en flashcards
│   │   ├── flashcardData.ts  # Flashcard gegevens
│   │   └── quizData.ts       # Quiz vragen en antwoorden
│   └── lib/                  # Hulpprogramma's en configuratie
└── tools/                    # Hulpprogramma's voor het project
    ├── input_pdf/            # PDF bestanden met studiemateriaal
    ├── output_images/        # Gegenereerde afbeeldingen uit PDF's
    ├── pdf_to_images.py      # Script om PDF's naar afbeeldingen te converteren
    └── scheikunde_pages.json # Geëxtraheerde inhoud uit de PDF's

```

## Kenmerken

- **Quiz met meerkeuze vragen**: Test je kennis van scheikunde concepten
- **Interactieve flashcards**: Leer belangrijke concepten met interactieve kaarten
- **Toegankelijkheid**: De applicatie bevat functies voor verbeterde leesbaarheid
- **Voortgang bijhouden**: Je voortgang wordt opgeslagen zodat je later kunt verdergaan
- **PDF conversie tools**: Hulpmiddelen om studiemateriaal te digitaliseren

## Installatie

1. Kloon deze repository
2. Installeer dependencies met `npm install`
3. Start de ontwikkelserver met `npm run dev`

## PDF Conversie Tools

In de `tools` directory vind je hulpmiddelen voor het verwerken van de studiematerialen:

- `pdf_to_images.py`: Converteert PDF bestanden naar PNG afbeeldingen
- Plaats PDF bestanden in de `tools/input_pdf` directory
- Run het script met `python tools/pdf_to_images.py`
- Gegenereerde afbeeldingen worden opgeslagen in `tools/output_images`

## Technologieën

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui componenten
- Framer Motion voor animaties

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
