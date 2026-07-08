import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAccessibility } from '../context/AccessibilityContext';
import { ShoppingBag, Leaf, Sparkles } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  price: string;
  concession: string;
  tags: string[];
  ecoPoints: number;
  img: string;
}

export const FoodRecommendations: React.FC = () => {
  const { speak } = useAccessibility();
  const [dietFilter, setDietFilter] = useState<'all' | 'vegan' | 'halal' | 'gf'>('all');
  const [cart, setCart] = useState<FoodItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);

  const menuItems: FoodItem[] = [
    { id: 1, name: 'Gourmet Organic Vegan Burger', price: '$14.50', concession: 'Concession Stand B', tags: ['vegan', 'eco'], ecoPoints: 40, img: '🍔' },
    { id: 2, name: 'Stadium Angus Beef Burger (Halal)', price: '$13.50', concession: 'Concession Stand A', tags: ['halal'], ecoPoints: 10, img: '🍔' },
    { id: 3, name: 'Gluten-Free Nachos Grande', price: '$11.00', concession: 'Concession Stand D', tags: ['gf', 'vegetarian'], ecoPoints: 20, img: '🌮' },
    { id: 4, name: 'Fresh Fruit Cup & Hydration Kit', price: '$8.50', concession: 'Concession Stand B', tags: ['vegan', 'gf', 'eco'], ecoPoints: 50, img: '🍇' },
    { id: 5, name: 'Fifa Gold Medal Pretzel', price: '$6.00', concession: 'Concession Stand C', tags: ['vegetarian'], ecoPoints: 15, img: '🥨' }
  ];

  const filteredMenu = dietFilter === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.tags.includes(dietFilter));

  const addToCart = (item: FoodItem) => {
    setCart([...cart, item]);
    speak(`Added ${item.name} to pre-order cart.`);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setOrderPlaced(true);
    setDeliveryStatus('Order Received');
    speak("Preorder checkout complete. Payment authorized. Food preparation started.");
    
    // Simulate delivery tracker
    setTimeout(() => {
      setDeliveryStatus('Preparing Food (Concession Stand B)');
      speak("Food preparation active at Concession Stand B.");
    }, 2000);
    
    setTimeout(() => {
      setDeliveryStatus(`Volunteer En Route to Section 104, Row M, Seat 18`);
      speak("Volunteer en route to your seat with food delivery.");
    }, 5000);

    setTimeout(() => {
      setDeliveryStatus('✅ Order Delivered - Enjoy the match!');
      speak("Food order successfully delivered to seat 18. Enjoy!");
    }, 9000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
          Gourmet Eats & Pre-Orders
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          In-seat dining recommendations, wait times, and ecological offsets
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Menu Listings */}
        <div className="lg:col-span-2 space-y-4">
          {/* Diet filters bar */}
          <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
            {[
              { id: 'all', label: 'All Delicacies' },
              { id: 'vegan', label: 'Vegan / Plant-Based' },
              { id: 'halal', label: 'Halal Certified' },
              { id: 'gf', label: 'Gluten-Free' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setDietFilter(f.id as any);
                  speak(`Filtering menu for ${f.label}`);
                }}
                className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                  dietFilter === f.id 
                    ? 'bg-primary text-white border-primary shadow-sm' 
                    : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="space-y-3.5">
            {filteredMenu.map((item) => (
              <Card key={item.id} className="hover:scale-[1.01] duration-200 border border-slate-100 shadow-sm">
                <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-semibold text-left">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl select-none" role="img" aria-hidden="true">{item.img}</span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-primary dark:text-white uppercase">{item.name}</span>
                        {item.tags.includes('eco') && (
                          <Badge variant="success" className="flex items-center gap-0.5 text-[8px] py-0 px-1.5">
                            <Leaf size={8} />
                            <span>Eco</span>
                          </Badge>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.concession}</p>
                      <p className="text-[10px] text-accent font-extrabold">+ {item.ecoPoints} Eco Points rewarded</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 ml-auto sm:ml-0 border-t sm:border-t-0 pt-2.5 sm:pt-0 w-full sm:w-auto justify-between sm:justify-start">
                    <span className="text-base font-extrabold text-primary dark:text-white font-display">{item.price}</span>
                    <Button 
                      onClick={() => addToCart(item)}
                      variant="primary"
                      size="sm"
                      className="text-[10px] uppercase font-bold tracking-wider"
                    >
                      Pre-order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Cart & Delivery Tracker */}
        <div className="space-y-6">
          <Card className="border border-slate-100 shadow-md">
            <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 flex justify-between items-center py-3">
              <CardTitle className="text-xs uppercase tracking-wider text-primary">
                <ShoppingBag size={16} className="text-secondary" />
                Pre-order Basket
              </CardTitle>
              <Badge variant="primary">{cart.length} Items</Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400 font-semibold select-none">
                  Your preorder basket is currently empty.
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2 max-h-36 overflow-y-auto">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs font-semibold p-2 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5">
                        <span className="truncate pr-2">{item.name}</span>
                        <span className="font-extrabold shrink-0">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 dark:border-white/10 pt-3 flex justify-between items-center text-xs font-bold">
                    <span>Total Cost:</span>
                    <span className="text-base text-primary dark:text-secondary font-display font-extrabold">
                      ${cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0).toFixed(2)}
                    </span>
                  </div>

                  {!orderPlaced ? (
                    <Button 
                      onClick={handleCheckout}
                      variant="secondary"
                      fullWidth
                      className="text-xs font-bold uppercase tracking-wider mt-2"
                    >
                      Authorize Pre-order Delivery
                    </Button>
                  ) : (
                    <Button 
                      disabled
                      variant="primary"
                      fullWidth
                      className="text-xs font-bold uppercase tracking-wider mt-2 opacity-50"
                    >
                      ORDER TRANSMITTED
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Tracker overlay */}
          {orderPlaced && deliveryStatus && (
            <Card className="border border-secondary/20 shadow-lg bg-primary text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-pitch-stripes opacity-5" />
              <CardHeader className="border-b border-white/10 py-3">
                <CardTitle className="text-xs uppercase tracking-wider text-secondary flex items-center gap-1.5">
                  <Sparkles size={14} className="animate-pulse" />
                  In-Seat Delivery Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 text-left space-y-4">
                <div className="space-y-2.5 text-xs font-semibold">
                  <div className="flex justify-between items-center">
                    <span>Target Seat:</span>
                    <span className="text-secondary font-bold font-display">Row M, Seat 18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Current Status:</span>
                    <span className="text-green-400 font-extrabold uppercase animate-pulse">{deliveryStatus}</span>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary animate-pulse" style={{ width: deliveryStatus.includes('Received') ? '20%' : deliveryStatus.includes('Preparing') ? '55%' : deliveryStatus.includes('Route') ? '85%' : '100%' }}></div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
};
