import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { quizData } from "@/data/quizData";
import { flashcardData } from "@/data/flashcardData";

export default function Home() {
  const totalQuestions = quizData.reduce(
    (sum, section) => sum + section.questions.length,
    0
  );
  
  const totalFlashcards = flashcardData.reduce(
    (sum, section) => sum + section.cards.length,
    0
  );

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Card className="border-2 shadow-lg mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Scheikunde Quiz</CardTitle>
            <CardDescription className="text-lg mt-2">
              Test je kennis over faseovergangen, mengsels en meer!
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h2 className="font-medium mb-2">Quiz</h2>
                <div className="text-sm text-slate-600 mb-4">
                  <p>Test je kennis met meerkeuzevragen over alle onderwerpen.</p>
                  <p className="mt-2">{totalQuestions} vragen in {quizData.length} categorieën</p>
                </div>
                <Button asChild className="w-full">
                  <Link href="/quiz">Start Quiz</Link>
                </Button>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <h2 className="font-medium mb-2">Flashcards</h2>
                <div className="text-sm text-slate-600 mb-4">
                  <p>Leer en herhaal met flashcards over belangrijke begrippen.</p>
                  <p className="mt-2">{totalFlashcards} kaarten in {flashcardData.length} categorieën</p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/flashcards">Leren met Flashcards</Link>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="font-medium">Onderdelen:</h2>
              <ul className="space-y-1">
                {quizData.map((section) => (
                  <li key={section.section} className="flex justify-between items-center">
                    <span className="text-sm">{section.section}</span>
                    <span className="text-xs text-slate-500">
                      {section.questions.length} vragen
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-medium">Instructies:</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Beantwoord elke vraag door het juiste antwoord te kiezen</li>
                <li>Na elk antwoord krijg je direct te zien of het goed of fout was</li>
                <li>Bij elk antwoord krijg je een uitleg om de stof beter te begrijpen</li>
                <li>Je kunt je voortgang pauzeren en later verdergaan</li>
                <li>Aan het einde van de quiz zie je je score per onderwerp</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            Deze quiz is gebaseerd op het studiemateriaal over het suikerfabriek curriculum.
          </p>
        </div>
      </div>
    </main>
  );
} 