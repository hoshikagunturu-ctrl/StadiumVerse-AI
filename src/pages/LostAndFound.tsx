import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useAccessibility } from '../context/AccessibilityContext';
import { PlusCircle, MapPin, Tag } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const LostAndFound: React.FC = () => {
  const { speak } = useAccessibility();
  const { t } = useTranslation();
  const [items, setItems] = useState([
    { id: 'LF-12', name: 'Black iPhone 15 Pro', loc: 'Section 104 Row M', status: 'In Custody (East Depot)', date: 'Today, 17:30' },
    { id: 'LF-09', name: 'Brown Leather Wallet', loc: 'Gate G Entrance', status: 'Claimed', date: 'Today, 16:15' },
    { id: 'LF-05', name: 'Official FWC Scarf', loc: 'Concession Stand B', status: 'In Custody (North Depot)', date: 'Today, 15:45' }
  ]);
  const [itemName, setItemName] = useState('');
  const [itemLoc, setItemLoc] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim() || !itemLoc.trim()) return;

    const ref = `LF-REG-${Math.floor(Math.random() * 900) + 100}`;
    const newItem = {
      id: ref,
      name: itemName,
      loc: itemLoc,
      status: 'Reported Lost',
      date: 'Just Now'
    };
    setItems([newItem, ...items]);
    setSubmittedMessage(`${t("Report logged under reference")}: ${ref}. ${t("Dispatched to sector volunteers.")}`);
    speak(`Item report submitted for ${itemName} at ${itemLoc}. Reference number ${ref}`);
    setItemName('');
    setItemLoc('');
    setItemDesc('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
          {t("Lost & Found Registry")}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          {t("Log lost items and check stadium repository depots")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Report Lost Item Form */}
        <Card className="border border-slate-100 shadow-md h-fit">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-xs uppercase tracking-wider text-primary">
              <PlusCircle size={16} className="text-secondary" />
              {t("File Loss Incident")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <form onSubmit={handleSubmitReport} className="space-y-3.5">
              <Input 
                label={t("Item Name / Category")}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder={t("e.g. Car keys, Black backpack...")}
                required
              />
              <Input 
                label={t("Approximate Loss Location")}
                value={itemLoc}
                onChange={(e) => setItemLoc(e.target.value)}
                placeholder={t("e.g. Row M Seat 18, Concession B...")}
                required
              />
              <Input 
                label={t("Description & Contact info")}
                value={itemDesc}
                onChange={(e) => setItemDesc(e.target.value)}
                placeholder={t("e.g. Blue keychain, phone number...")}
              />
              
              <Button type="submit" variant="primary" fullWidth className="text-xs font-bold uppercase tracking-wider">
                {t("SUBMIT REPORT")}
              </Button>
            </form>

            {submittedMessage && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-xs font-bold leading-relaxed text-center">
                {submittedMessage}
              </div>
            )}
          </CardContent>
        </Card>

         {/* Found Items Logs */}
        <Card className="lg:col-span-2 border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <CardTitle className="text-sm uppercase tracking-wider text-primary">
              <Tag size={16} className="text-secondary" />
              {t("Active Depots Inventory")}
            </CardTitle>
            <Badge variant="primary" className="border-primary/20">{t("3 Items Logged Today")}</Badge>
          </CardHeader>
          
          <CardContent className="p-5">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="p-3 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl shadow-sm hover:scale-[1.01] duration-200 text-xs font-semibold text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-primary dark:text-white uppercase">{t(item.name)}</span>
                      <span className="text-[10px] text-slate-400 font-bold">({item.id})</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <MapPin size={12} className="text-secondary" />
                      <span>{t(item.loc)}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{t("Logged")}: {t(item.date)}</div>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-auto sm:ml-0">
                    <Badge variant={item.status.includes('Custody') ? 'warning' : item.status === 'Claimed' ? 'success' : 'info'}>
                      {t(item.status)}
                    </Badge>
                    {item.status.includes('Custody') && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          speak(`Claim verification code requested for ${item.name}`);
                          alert(`Verification code sent to your registered profile email. Please present this to security staff at ${item.status.split('(')[1].slice(0,-1)}.`);
                        }}
                        className="text-[10px] uppercase font-bold py-1 h-7"
                      >
                        {t("Claim")}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
