"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp, Type } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Available font options
const fontOptions = [
  { id: "opentype", name: "OpenDyslexic", description: "Speciaal voor dyslexie" },
  { id: "comic", name: "Comic Sans", description: "Makkelijk leesbaar" },
  { id: "arial", name: "Arial", description: "Duidelijk en eenvoudig" },
  { id: "default", name: "Standaard", description: "Reguliere lettertype" },
];

export function FontSwitcher() {
  // Get the saved font preference or default to OpenDyslexic
  const [currentFont, setCurrentFont] = useState("opentype");
  const [isOpen, setIsOpen] = useState(false);
  
  // Load saved font preference
  useEffect(() => {
    const savedFont = localStorage.getItem("preferredFont");
    if (savedFont) {
      setCurrentFont(savedFont);
      document.documentElement.setAttribute("data-font", savedFont);
    } else {
      // Default to OpenDyslexic
      document.documentElement.setAttribute("data-font", "opentype");
    }
  }, []);
  
  // Update font when changed
  const changeFont = (fontId: string) => {
    setCurrentFont(fontId);
    document.documentElement.setAttribute("data-font", fontId);
    localStorage.setItem("preferredFont", fontId);
    setIsOpen(false);
  };
  
  // Get current font name
  const currentFontName = fontOptions.find(font => font.id === currentFont)?.name || "Lettertype";
  
  return (
    <div className="font-switcher">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span>{currentFontName}</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {fontOptions.map((font) => (
            <DropdownMenuItem
              key={font.id}
              className={`flex items-center justify-between gap-2 ${
                font.id === currentFont ? "bg-primary/10" : ""
              }`}
              onClick={() => changeFont(font.id)}
            >
              <div className="flex flex-col">
                <span className={`font-${font.id}`}>{font.name}</span>
                <span className="text-xs text-muted-foreground">{font.description}</span>
              </div>
              {font.id === currentFont && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 