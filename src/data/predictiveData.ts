export interface ForecastItem {
  id: string;
  title: string;
  currentValue: string;
  predictedValue: string;
  trend: 'Up' | 'Down' | 'Stable';
  confidence: string;
  sparklineValues: number[]; // numbers between 0 and 100 representing data points for CSS bar sparkline
}

export interface TwinZone {
  id: string;
  name: string;
  status: 'Optimal' | 'Caution' | 'Congested' | 'Critical';
  occupancy: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  capacity: string;
  staffCount: number;
  entryRate: string;
  incidentCount: number;
}

export interface ForecastInsight {
  id: string;
  observation: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  confidence: string;
  impact: string;
}

export const mockForecasts: ForecastItem[] = [
  {
    id: "fc-1",
    title: "Crowd Density (Next 30m)",
    currentValue: "78%",
    predictedValue: "89%",
    trend: "Up",
    confidence: "94%",
    sparklineValues: [40, 48, 55, 62, 70, 78, 83, 89]
  },
  {
    id: "fc-2",
    title: "Queue Length Forecast",
    currentValue: "12 mins",
    predictedValue: "8 mins",
    trend: "Down",
    confidence: "91%",
    sparklineValues: [22, 20, 18, 16, 12, 11, 9, 8]
  },
  {
    id: "fc-3",
    title: "Traffic Arrival Forecast",
    currentValue: "420 cars/m",
    predictedValue: "435 cars/m",
    trend: "Stable",
    confidence: "88%",
    sparklineValues: [380, 400, 410, 420, 422, 425, 430, 435]
  },
  {
    id: "fc-4",
    title: "Energy Consumption",
    currentValue: "1.4 MW",
    predictedValue: "1.6 MW",
    trend: "Up",
    confidence: "95%",
    sparklineValues: [1.1, 1.2, 1.3, 1.4, 1.45, 1.5, 1.55, 1.6]
  },
  {
    id: "fc-5",
    title: "Medical Resource Demand",
    currentValue: "2 active",
    predictedValue: "2 active",
    trend: "Stable",
    confidence: "97%",
    sparklineValues: [1, 1, 2, 2, 2, 2, 2, 2]
  },
  {
    id: "fc-6",
    title: "Weather Impact Score",
    currentValue: "15%",
    predictedValue: "20%",
    trend: "Up",
    confidence: "90%",
    sparklineValues: [10, 12, 15, 15, 18, 18, 20, 20]
  }
];

export const mockTwinZones: TwinZone[] = [
  {
    id: "zone-north",
    name: "North Stand",
    status: "Caution",
    occupancy: "86%",
    riskLevel: "Medium",
    capacity: "22,000",
    staffCount: 120,
    entryRate: "140 fans/m",
    incidentCount: 1
  },
  {
    id: "zone-south",
    name: "South Stand",
    status: "Optimal",
    occupancy: "72%",
    riskLevel: "Low",
    capacity: "24,000",
    staffCount: 140,
    entryRate: "90 fans/m",
    incidentCount: 0
  },
  {
    id: "zone-east",
    name: "East Stand",
    status: "Caution",
    occupancy: "91%",
    riskLevel: "Medium",
    capacity: "18,000",
    staffCount: 110,
    entryRate: "160 fans/m",
    incidentCount: 1
  },
  {
    id: "zone-west",
    name: "West Stand",
    status: "Optimal",
    occupancy: "68%",
    riskLevel: "Low",
    capacity: "18,000",
    staffCount: 95,
    entryRate: "70 fans/m",
    incidentCount: 0
  },
  {
    id: "zone-vip",
    name: "VIP Suite Stand",
    status: "Optimal",
    occupancy: "54%",
    riskLevel: "Low",
    capacity: "3,000",
    staffCount: 80,
    entryRate: "20 fans/m",
    incidentCount: 0
  },
  {
    id: "zone-parking",
    name: "Parking Zone B",
    status: "Congested",
    occupancy: "95%",
    riskLevel: "High",
    capacity: "8,000 lots",
    staffCount: 45,
    entryRate: "45 cars/m",
    incidentCount: 0
  },
  {
    id: "zone-medical",
    name: "Medical Clinic Sector",
    status: "Optimal",
    occupancy: "18%",
    riskLevel: "Low",
    capacity: "50 beds",
    staffCount: 30,
    entryRate: "1 patient/h",
    incidentCount: 0
  },
  {
    id: "zone-security",
    name: "Security HQ Command",
    status: "Optimal",
    occupancy: "30%",
    riskLevel: "Low",
    capacity: "100 desks",
    staffCount: 65,
    entryRate: "Normal Network",
    incidentCount: 0
  }
];

export const mockForecastInsights: ForecastInsight[] = [
  {
    id: "ins-1",
    observation: "North Gate congestion expected in 18 minutes.",
    priority: "High",
    confidence: "94%",
    impact: "+15m Entry Wait"
  },
  {
    id: "ins-2",
    observation: "Parking Zone B nearing capacity.",
    priority: "Medium",
    confidence: "88%",
    impact: "Divert traffic to Parking C"
  },
  {
    id: "ins-3",
    observation: "Medical staffing recommended near East Stand.",
    priority: "Medium",
    confidence: "91%",
    impact: "EMT dispatch buffer warning"
  },
  {
    id: "ins-4",
    observation: "Weather conditions may delay entry.",
    priority: "Low",
    confidence: "95%",
    impact: "Minor slick track warning"
  }
];
