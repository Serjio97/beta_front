import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CMSService, Popup } from '@/data/cmsData';
import { X } from 'lucide-react';

const WelcomePopup = () => {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const popupData = await CMSService.getPopup();
        
        if (popupData && popupData.isActive) {
          setPopup(popupData);
          
          // Check if popup was already shown today
          const lastShown = localStorage.getItem('welcomePopupLastShown');
          const today = new Date().toDateString();
          
          if (lastShown !== today) {
            setIsOpen(true);
          }
        }
      } catch (error) {
        console.error('Error fetching popup:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopup();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Remember that popup was shown today
    localStorage.setItem('welcomePopupLastShown', new Date().toDateString());
  };

  const handleGetStarted = () => {
    if (popup?.link) {
      window.open(popup.link, '_blank');
    }
    handleClose();
  };

  if (loading || !popup) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden ">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10 bg-white/80 hover:bg-white/90"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={popup.image} 
              alt={popup.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <DialogHeader className="space-y-4 text-center">
              <DialogTitle className="text-3xl font-bold text-gray-900">
                {popup.title}
              </DialogTitle>
              <DialogDescription className="text-xl font-semibold text-primary">
                {popup.subject}
              </DialogDescription>
              <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto">
                {popup.description}
              </p>
            </DialogHeader>
            
            <div className="flex justify-center mt-8">
              <Button onClick={handleGetStarted} size="lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
