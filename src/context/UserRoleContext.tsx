import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'fan' | 'volunteer' | 'organizer';

export interface UserProfile {
  name: string;
  role: UserRole;
  avatar: string;
  email: string;
  details: {
    ticketNumber?: string;
    gate?: string;
    section?: string;
    row?: string;
    seat?: string;
    assignedZone?: string;
    shiftTime?: string;
    volunteerId?: string;
    organizerRank?: string;
    department?: string;
  };
}

interface UserRoleContextType {
  user: UserProfile | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const defaultProfiles: Record<UserRole, UserProfile> = {
  fan: {
    name: 'Alex Gonzalez',
    role: 'fan',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
    email: 'alex.gonzalez@worldcup2026.com',
    details: {
      ticketNumber: 'WC-2026-F8902',
      gate: 'Gate G (North Gate)',
      section: 'Section 104',
      row: 'Row M',
      seat: 'Seat 18',
    }
  },
  volunteer: {
    name: 'Sophia Chen',
    role: 'volunteer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    email: 'sophia.c@volunteers.worldcup2026.com',
    details: {
      volunteerId: 'VOL-7712',
      assignedZone: 'Gate G Entrance (Mobility Assistance Team)',
      shiftTime: '17:00 - 23:00 (Matchday Operations)',
    }
  },
  organizer: {
    name: 'Director Jean-Pierre',
    role: 'organizer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120',
    email: 'jp.dubois@fifa.org',
    details: {
      organizerRank: 'Match Commissioner / Command Director',
      department: 'Stadium Control Room (SCR) Operations',
    }
  }
};

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('wc-user-role');
    if (saved && saved in defaultProfiles) {
      return defaultProfiles[saved as UserRole];
    }
    return defaultProfiles.fan; // Default to fan for previewing
  });

  const login = (role: UserRole) => {
    setUser(defaultProfiles[role]);
    localStorage.setItem('wc-user-role', role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wc-user-role');
  };

  return (
    <UserRoleContext.Provider value={{ user, login, logout }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
