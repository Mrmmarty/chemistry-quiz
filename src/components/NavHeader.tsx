"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ListChecks, Home, BarChart, Type } from "lucide-react";
import { FontSwitcher } from "@/components/FontSwitcher";
import { useState } from "react";

export default function NavHeader() {
  const pathname = usePathname();
  const [showMobileFontSwitcher, setShowMobileFontSwitcher] = useState(false);
  
  return (
    <>
      <Card className="mb-6 shadow-sm">
        <CardContent className="p-3 flex items-center justify-between">
          <Link href="/" className="no-underline">
            <Button variant="ghost" className="text-lg gap-2">
              <Home className="h-5 w-5" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="hidden md:block mr-2">
              <FontSwitcher />
            </div>
            
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
            
            <Link href="/scores" className="no-underline">
              <Button 
                variant={pathname === "/scores" ? "default" : "outline"}
                className="gap-2"
              >
                <BarChart className="h-5 w-5" />
                <span className="hidden sm:inline">Resultaten</span>
              </Button>
            </Link>
            
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileFontSwitcher(!showMobileFontSwitcher)}
            >
              <Type className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Mobile font switcher */}
      {showMobileFontSwitcher && (
        <div className="md:hidden flex justify-center mb-4">
          <FontSwitcher />
        </div>
      )}
    </>
  );
} 