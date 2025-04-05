"use client";

import { useState } from 'react';
import { exportScores, importScores } from '@/lib/score-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Upload } from 'lucide-react';

export function ScoreBackup() {
  const [backupData, setBackupData] = useState('');
  const [importData, setImportData] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleExport = () => {
    try {
      const data = exportScores();
      setBackupData(data);
    } catch (error) {
      console.error('Export error:', error);
    }
  };
  
  const handleImport = () => {
    try {
      if (!importData.trim()) {
        setImportStatus('error');
        return;
      }
      
      const success = importScores(importData);
      setImportStatus(success ? 'success' : 'error');
      
      if (success) {
        // Clear import field on success
        setImportData('');
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setImportStatus('idle');
        }, 3000);
      }
    } catch (error) {
      console.error('Import error:', error);
      setImportStatus('error');
    }
  };
  
  const handleCopy = () => {
    if (backupData) {
      navigator.clipboard.writeText(backupData);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Resultaten Beheren</CardTitle>
        <CardDescription>
          Maak een backup van je quiz resultaten of herstel ze op een ander apparaat
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleExport}
              >
                <Download className="mr-2 h-4 w-4" />
                Exporteer Resultaten
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Resultaten Exporteren</DialogTitle>
                <DialogDescription>
                  Kopieer deze code en bewaar hem om je resultaten later te herstellen.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea 
                  value={backupData}
                  readOnly
                  className="h-40"
                />
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleCopy}>
                  Kopieer naar Klembord
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                Importeer Resultaten
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Resultaten Importeren</DialogTitle>
                <DialogDescription>
                  Plak de eerder geëxporteerde code om je resultaten te herstellen.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea 
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder="Plak hier je backup code..."
                  className="h-40"
                />
                
                {importStatus === 'success' && (
                  <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
                    <AlertDescription>
                      Resultaten succesvol geïmporteerd!
                    </AlertDescription>
                  </Alert>
                )}
                
                {importStatus === 'error' && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Er is een fout opgetreden. Controleer of de gegevens juist zijn.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleImport}>
                  Importeren
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
} 