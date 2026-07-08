import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { UserRoleProvider } from './context/UserRoleContext';
import { SettingsProvider } from './context/SettingsContext';
import { Layout } from './components/Layout';

// Lazy load pages for code splitting and bundle size optimization
const LandingPage = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const FanDashboard = lazy(() => import('./pages/FanDashboard').then(m => ({ default: m.FanDashboard })));
const VolunteerDashboard = lazy(() => import('./pages/VolunteerDashboard').then(m => ({ default: m.VolunteerDashboard })));
const OrganizerDashboard = lazy(() => import('./pages/OrganizerDashboard').then(m => ({ default: m.OrganizerDashboard })));
const AIAssistant = lazy(() => import('./pages/AIAssistant').then(m => ({ default: m.AIAssistant })));
const IndoorNavigation = lazy(() => import('./pages/IndoorNavigation').then(m => ({ default: m.IndoorNavigation })));
const QueuePrediction = lazy(() => import('./pages/QueuePrediction').then(m => ({ default: m.QueuePrediction })));
const LostAndFound = lazy(() => import('./pages/LostAndFound').then(m => ({ default: m.LostAndFound })));
const EmergencyCenter = lazy(() => import('./pages/EmergencyCenter').then(m => ({ default: m.EmergencyCenter })));
const FoodRecommendations = lazy(() => import('./pages/FoodRecommendations').then(m => ({ default: m.FoodRecommendations })));
const TransportSuggestions = lazy(() => import('./pages/TransportSuggestions').then(m => ({ default: m.TransportSuggestions })));
const AccessibilityMode = lazy(() => import('./pages/AccessibilityMode').then(m => ({ default: m.AccessibilityMode })));
const EcoAssistant = lazy(() => import('./pages/EcoAssistant').then(m => ({ default: m.EcoAssistant })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));

const App: React.FC = () => {
  return (
    <AccessibilityProvider>
      <UserRoleProvider>
        <SettingsProvider>
          <Router>
            <Layout>
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-[60vh] select-none text-xs font-bold uppercase tracking-wider text-slate-400">
                  <div className="flex flex-col items-center gap-3">
                    <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span>Loading Operations Console...</span>
                  </div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/fan-dashboard" element={<FanDashboard />} />
                  <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
                  <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="/indoor-navigation" element={<IndoorNavigation />} />
                  <Route path="/queue-prediction" element={<QueuePrediction />} />
                  <Route path="/lost-and-found" element={<LostAndFound />} />
                  <Route path="/emergency-center" element={<EmergencyCenter />} />
                  <Route path="/food-recommendations" element={<FoodRecommendations />} />
                  <Route path="/transport-suggestions" element={<TransportSuggestions />} />
                  <Route path="/accessibility-mode" element={<AccessibilityMode />} />
                  <Route path="/eco-assistant" element={<EcoAssistant />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* Fallback routing */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
        </SettingsProvider>
      </UserRoleProvider>
    </AccessibilityProvider>
  );
};

export default App;
