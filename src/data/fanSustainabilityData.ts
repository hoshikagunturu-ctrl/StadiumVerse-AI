export interface FanInsight {
  id: string;
  title: string;
  status: string;
  score: string;
  trend: 'Up' | 'Down' | 'Stable';
  lastUpdated: string;
  recommendation: string;
}

export interface AccessibilityItem {
  id: string;
  title: string;
  status: string;
  availability: string;
  recommendation: string;
}

export interface SustainabilityMetric {
  id: string;
  title: string;
  currentValue: string;
  trend: string;
  recommendation: string;
}

export interface SmartNotification {
  id: string;
  message: string;
  timestamp: string;
  category: 'Eco' | 'Accessibility' | 'Fan Exp' | 'Infrastructure';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Info' | 'Success' | 'Warning' | 'Alert';
}

export const mockFanInsights: FanInsight[] = [
  {
    id: "fan-1",
    title: "Overall Fan Satisfaction",
    status: "Excellent",
    score: "92/100",
    trend: "Up",
    lastUpdated: "21:40",
    recommendation: "High sentiment verified. Maintain current light displays and ambient volume."
  },
  {
    id: "fan-2",
    title: "Queue Comfort Score",
    status: "Good",
    score: "85/100",
    trend: "Up",
    lastUpdated: "21:42",
    recommendation: "Gate 4 wait time drops to 6 minutes. Continue bypass routing to Gate 6."
  },
  {
    id: "fan-3",
    title: "Food Court Wait Time",
    status: "Congested",
    score: "14 Mins",
    trend: "Down",
    lastUpdated: "21:45",
    recommendation: "Food Court B queue peaks. Route fans to Food Court D stalls via app."
  },
  {
    id: "fan-4",
    title: "Restroom Availability",
    status: "Optimal",
    score: "95% Free",
    trend: "Stable",
    lastUpdated: "21:38",
    recommendation: "No blockages detected. Water flow logs indicate normal utilization."
  },
  {
    id: "fan-5",
    title: "Wi-Fi Network Health",
    status: "Heavy Load",
    score: "420 Mbps",
    trend: "Stable",
    lastUpdated: "21:44",
    recommendation: "Sector 108 high demand. Shift 50 MHz band buffers from VIP suite to Sector 108."
  },
  {
    id: "fan-6",
    title: "Merchandise Store",
    status: "Busy",
    score: "18 Mins",
    trend: "Up",
    lastUpdated: "21:35",
    recommendation: "Store C checkout queues overflow. Open mobile checkouts on concourse grid."
  }
];

export const mockAccessibilityItems: AccessibilityItem[] = [
  {
    id: "acc-1",
    title: "Wheelchair Route Status",
    status: "Clear Path",
    availability: "100%",
    recommendation: "Tactile guidance active. Stewards positioned at elevator intersections."
  },
  {
    id: "acc-2",
    title: "Elevator Availability",
    status: "Active Ops",
    availability: "11/12 Elevators",
    recommendation: "Elevator A maintenance completed. Returned to active fan routing."
  },
  {
    id: "acc-3",
    title: "Accessible Seating Occupancy",
    status: "Optimal Space",
    availability: "18% remaining",
    recommendation: "Ready to assign overflow accessible seats in Row F block if requested."
  },
  {
    id: "acc-4",
    title: "Sign Language Support",
    status: "Steward Standby",
    availability: "4 active interpreters",
    recommendation: "Live translations synced to accessibility helper displays at sector entry."
  },
  {
    id: "acc-5",
    title: "Hearing Assistance Devices",
    status: "Ready for Pickup",
    availability: "48 units",
    recommendation: "Charge levels verified at 100%. Distribution desk fully staffed."
  },
  {
    id: "acc-6",
    title: "Medical Assistance Requests",
    status: "Responding",
    availability: "2 active calls",
    recommendation: "EMT teams dispatched to Seat 104 and West Concourse corridor."
  }
];

export const mockSustainabilityMetrics: SustainabilityMetric[] = [
  {
    id: "eco-1",
    title: "Energy Consumption",
    currentValue: "1.42 MW",
    trend: "-5.2% vs baseline",
    recommendation: "Reduce lighting intensity in unoccupied VIP suites."
  },
  {
    id: "eco-2",
    title: "Renewable Energy Usage",
    currentValue: "78% utilized",
    trend: "Solar peak +12%",
    recommendation: "Battery storage active. Solar generation expected to rise until 2 PM."
  },
  {
    id: "eco-3",
    title: "Water Consumption",
    currentValue: "18.4 kL/h",
    trend: "Normal flow",
    recommendation: "Smart irrigation loops offline during match clock runtime."
  },
  {
    id: "eco-4",
    title: "Waste Recycling Rate",
    currentValue: "81% sorted",
    trend: "+3.4% recycle bin",
    recommendation: "Activate sorting assist cams at Gate 2 collection corridor."
  },
  {
    id: "eco-5",
    title: "Carbon Footprint",
    currentValue: "2.4 tCO2e",
    trend: "Offset active",
    recommendation: "All transit shuttles operating in fully electric battery mode."
  },
  {
    id: "eco-6",
    title: "Sustainability Score",
    currentValue: "94/100",
    trend: "Class A Lead",
    recommendation: "Optimal green ratings achieved. Maintain current waste diversion protocols."
  }
];

export const mockNotifications: SmartNotification[] = [
  {
    id: "notif-1",
    message: "Renewable energy usage reached 78%. Solar grids peak yield active.",
    timestamp: "21:45",
    category: "Eco",
    priority: "Low",
    status: "Success"
  },
  {
    id: "notif-2",
    message: "Elevator A accessibility maintenance completed. Restored to active service.",
    timestamp: "21:40",
    category: "Accessibility",
    priority: "Medium",
    status: "Info"
  },
  {
    id: "notif-3",
    message: "Queue load at Food Court C reduced. Wait time drops below 5 minutes.",
    timestamp: "21:38",
    category: "Fan Exp",
    priority: "Low",
    status: "Success"
  },
  {
    id: "notif-4",
    message: "Wi-Fi performance restored in East Stand following network buffer reset.",
    timestamp: "21:30",
    category: "Infrastructure",
    priority: "Medium",
    status: "Success"
  },
  {
    id: "notif-5",
    message: "Water usage exceeded baseline forecast limit. Leak scanning sweep triggered.",
    timestamp: "21:25",
    category: "Eco",
    priority: "High",
    status: "Warning"
  }
];
