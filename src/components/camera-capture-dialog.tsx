'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, Camera, VideoOff } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';

interface CameraCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture: (dataUri: string) => void;
}

export default function CameraCaptureDialog({ open, onOpenChange, onCapture }: CameraCaptureDialogProps) {
  const { dictionary: t } = useLanguage();
  const T = t.cameraDialog;
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let stream: MediaStream | null = null;

    const getCameraPermission = async () => {
      if (!open) return;
      
      setHasCameraPermission(null);

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: T.accessDeniedTitle,
          description: T.accessDeniedDescription,
        });
      }
    };

    getCameraPermission();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };

  }, [open, toast, T]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      setIsCapturing(true);
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        onCapture(dataUri);
      }
      setIsCapturing(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{T.title}</DialogTitle>
        </DialogHeader>
        
        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
            {hasCameraPermission === null && (
                <div className="flex h-full flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="mt-2 text-muted-foreground">{T.requestingAccess}</p>
                </div>
            )}
            
            {hasCameraPermission === false && (
                <div className="flex h-full flex-col items-center justify-center p-4">
                    <VideoOff className="h-12 w-12 text-destructive" />
                    <p className="mt-4 text-center font-semibold text-destructive">{T.accessDeniedTitle}</p>
                    <p className="mt-1 text-center text-sm text-muted-foreground">
                      {T.accessDeniedDescription}
                    </p>
                </div>
            )}

            <video
                ref={videoRef}
                className={cn('h-full w-full object-cover', hasCameraPermission ? 'block' : 'hidden')}
                autoPlay
                playsInline
                muted
            />
            <canvas ref={canvasRef} className="hidden" />
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              {T.cancel}
            </Button>
          </DialogClose>
          <Button onClick={handleCapture} disabled={!hasCameraPermission || isCapturing}>
            {isCapturing ? <Loader2 className="h-4 w-4 animate-spin me-2" /> : <Camera className="h-4 w-4 me-2" />}
            {isCapturing ? T.capturing : T.capture}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
