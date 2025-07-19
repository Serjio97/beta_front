
import { useEffect,useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Fund {
  id: string;
  name: string;
  description: string;
  totalSize: string;
  currentRaise: string;
  targetCompanies: string;
  stage: string;
  sectors: string[];
  status: 'fundraising' | 'deployed' | 'closed';
}

interface FundFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fund: Omit<Fund, 'id'>) => void;
  fund?: Fund;
}

const FundForm: React.FC<FundFormProps> = ({ isOpen, onClose, onSubmit, fund }) => {
  const [formData, setFormData] = useState({
    name: fund?.name || '',
    description: fund?.description || '',
    totalSize: fund?.totalSize || '',
    currentRaise: fund?.currentRaise || '',
    targetCompanies: fund?.targetCompanies || '',
    stage: fund?.stage || '',
    sectors: fund?.sectors?.join(', ') || '',
    status: fund?.status || 'fundraising' as const
  });
  useEffect(() => {
      if (fund) {
        setFormData({
       name: fund?.name || '',
    description: fund?.description || '',
    totalSize: fund?.totalSize || '',
    currentRaise: fund?.currentRaise || '',
    targetCompanies: fund?.targetCompanies || '',
    stage: fund?.stage || '',
    sectors: fund?.sectors?.join(', ') || '',
    status: fund?.status || 'fundraising' as const
        });
      } else {
        // Reset form when adding new
        setFormData({
          name: '',
          description: '',
          totalSize: '',
          currentRaise: '',
          targetCompanies: '',
          stage: '',
          sectors: '',
          status: 'fundraising',
        });
      }
    }, [fund, isOpen]);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      sectors: formData.sectors.split(',').map(s => s.trim()).filter(s => s)
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{fund ? 'Edit Fund' : 'Add New Fund'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Fund Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalSize">Total Fund Size</Label>
              <Input
                id="totalSize"
                value={formData.totalSize}
                onChange={(e) => setFormData(prev => ({ ...prev, totalSize: e.target.value }))}
                placeholder="$50M"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentRaise">Current Raise</Label>
              <Input
                id="currentRaise"
                value={formData.currentRaise}
                onChange={(e) => setFormData(prev => ({ ...prev, currentRaise: e.target.value }))}
                placeholder="$35M"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetCompanies">Target Companies</Label>
              <Input
                id="targetCompanies"
                value={formData.targetCompanies}
                onChange={(e) => setFormData(prev => ({ ...prev, targetCompanies: e.target.value }))}
                placeholder="25-30"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">Investment Stage</Label>
              <Input
                id="stage"
                value={formData.stage}
                onChange={(e) => setFormData(prev => ({ ...prev, stage: e.target.value }))}
                placeholder="Pre-seed to Seed"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sectors">Sectors (comma-separated)</Label>
            <Input
              id="sectors"
              value={formData.sectors}
              onChange={(e) => setFormData(prev => ({ ...prev, sectors: e.target.value }))}
              placeholder="FinTech, HealthTech, AI/ML, SaaS"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fundraising">Fundraising</SelectItem>
                <SelectItem value="deployed">Deployed</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {fund ? 'Update Fund' : 'Add Fund'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FundForm;
