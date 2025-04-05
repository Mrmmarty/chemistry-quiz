"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ListChecks, Home, ScrollText } from "lucide-react";

export default function NavHeader() {
  const pathname = usePathname();
  
  return (
    <Card className="mb-6 shadow-sm">
      <CardContent className="p-3 flex items-center justify-between">
        <Link href="/" className="no-underline">
          <Button variant="ghost" className="text-lg gap-2">
            <Home className="h-5 w-5" />
            <span className="hidden sm:inline">Home</span>
          </Button>
        </Link>
        
        <div className="flex gap-2">
          <Link href="/quiz" className="no-underline">
            <Button 
              variant={pathname === "/quiz" ? "default" : "outline"}
              className="gap-2"
            >
              <ListChecks className="h-5 w-5" />
              <span className="hidden sm:inline">Quiz</span>
            </Button>
          </Link>
          
          <Link href="/flashcards" className="no-underline">
            <Button 
              variant={pathname.includes("/flashcards") ? "default" : "outline"}
              className="gap-2"
            >
              <BookOpen className="h-5 w-5" />
              <span className="hidden sm:inline">Flashcards</span>
            </Button>
          </Link>
          
          <Link href="/flashcard-quiz" className="no-underline">
            <Button 
              variant={pathname === "/flashcard-quiz" ? "default" : "outline"}
              className="gap-2"
            >
              <ScrollText className="h-5 w-5" />
              <span className="hidden sm:inline">Flashcard Quiz</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
} 