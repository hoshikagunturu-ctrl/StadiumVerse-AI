export interface IncidentTimelineItem {
  label: string;
  time: string;
  completed: boolean;
}

export interface Incident {
  id: string;
  time: string;
  stadium: string;
  category: 'Crowd Congestion' | 'Medical Emergency' | 'Power Fluctuation' | 'Suspicious Activity' | 'Transport Delay' | 'Weather Alert' | 'Lost Child' | 'Gate Queue';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Detected' | 'Analyzing' | 'Responding' | 'Resolved';
  summary: string;
  riskScore: number;
  recommendedActions: string[];
  assignedTeams: string[];
  estResolutionTime: string;
  confidenceScore: string;
  timeline: IncidentTimelineItem[];
}

export const mockIncidents: Incident[] = [
  {
    id: "INC-2041",
    time: "20:41",
    stadium: "Lusail Stadium",
    category: "Medical Emergency",
    priority: "Critical",
    status: "Responding",
    summary: "Spectator in Row K, Seat 12 reports chest pains. Automated cardiac alert triggered via smart-seat sensor grid.",
    riskScore: 94,
    recommendedActions: [
      "Dispatch EMT Unit 4 with oxygen pack and defibrillator.",
      "Clear Zone C elevator lift path for quick ambulance transfer.",
      "Notify Sector Supervisor Sophia Chen for fan reassurance."
    ],
    assignedTeams: ["First-Aid EMT Unit 4", "Sec 104 Mobility Stewards", "Red Cross On-Site Team"],
    estResolutionTime: "8 Mins",
    confidenceScore: "98%",
    timeline: [
      { label: "Sensor Detection", time: "20:41:05", completed: true },
      { label: "AI Dispatch Warning", time: "20:41:12", completed: true },
      { label: "EMT Unit Mobilized", time: "20:42:00", completed: true },
      { label: "On-Site Intervention", time: "20:43:30", completed: true },
      { label: "Steward Containment", time: "20:45:00", completed: false }
    ]
  },
  {
    id: "INC-2038",
    time: "20:38",
    stadium: "Lusail Stadium",
    category: "Crowd Congestion",
    priority: "High",
    status: "Analyzing",
    summary: "Gate 4 bottleneck detected. Entry rates exceed security screening speed by 40% due to concurrent train arrivals.",
    riskScore: 82,
    recommendedActions: [
      "Redirect outer arrival queues to Gate 6 bypass corridor.",
      "Update digital ticket wallets with Gate 6 routing maps.",
      "Adjust outer LED displays to guide pedestrian flows."
    ],
    assignedTeams: ["Pedestrian Logistics Crew", "Gate 4 Stewards", "Transit Liaison Unit"],
    estResolutionTime: "12 Mins",
    confidenceScore: "94%",
    timeline: [
      { label: "Queue Load Detected", time: "20:38:10", completed: true },
      { label: "Flow Bottle Model Run", time: "20:38:55", completed: true },
      { label: "Steward Redeployment", time: "20:40:00", completed: false },
      { label: "LED Signs Toggled", time: "20:41:00", completed: false },
      { label: "Queue Dissipated", time: "--:--:--", completed: false }
    ]
  },
  {
    id: "INC-2032",
    time: "20:32",
    stadium: "Lusail Stadium",
    category: "Gate Queue",
    priority: "Medium",
    status: "Responding",
    summary: "Ticket scanner hardware malfunction at Turnstile G-2. 3 scanning gates currently offline.",
    riskScore: 65,
    recommendedActions: [
      "Re-route affected lines to adjacent G-3 lanes.",
      "Dispatch IT Systems team to reset authentication nodes.",
      "Deploy 2 volunteer stewards to scan manually using backup devices."
    ],
    assignedTeams: ["Stad IT Ops", "Gate G Staff", "Backup Volunteers"],
    estResolutionTime: "15 Mins",
    confidenceScore: "90%",
    timeline: [
      { label: "Gate Offline Warn", time: "20:32:04", completed: true },
      { label: "Steward Dispatch", time: "20:33:15", completed: true },
      { label: "Adjacent Lanes Active", time: "20:34:00", completed: true },
      { label: "IT Remote Diagnosis", time: "20:35:30", completed: true },
      { label: "Turnstile Reboot", time: "20:38:00", completed: false }
    ]
  },
  {
    id: "INC-2025",
    time: "20:25",
    stadium: "Estadio Azteca",
    category: "Power Fluctuation",
    priority: "Critical",
    status: "Resolved",
    summary: "Transient voltage drop registered in auxiliary cooling sub-grid. Backup generators triggered instantly.",
    riskScore: 90,
    recommendedActions: [
      "Confirm load transfers to Aux Generator A.",
      "Audit sub-station breaker logs for static discharge warnings.",
      "Reset automatic breaker loops to normal power grids."
    ],
    assignedTeams: ["Stadium Power Engineers", "Facility Liaison"],
    estResolutionTime: "Completed",
    confidenceScore: "99%",
    timeline: [
      { label: "Voltage Drop Alert", time: "20:25:12", completed: true },
      { label: "Gen A Auto-start", time: "20:25:14", completed: true },
      { label: "Grid Switch Confirm", time: "20:26:00", completed: true },
      { label: "Sub-station Reset", time: "20:28:40", completed: true },
      { label: "Resolved Closeout", time: "20:30:15", completed: true }
    ]
  },
  {
    id: "INC-2020",
    time: "20:20",
    stadium: "Lusail Stadium",
    category: "Lost Child",
    priority: "High",
    status: "Responding",
    summary: "7-year-old child reported missing near Concession Zone B. Family separation reported to security steward.",
    riskScore: 78,
    recommendedActions: [
      "Broadcast child clothing matching summary on volunteer internal pager channels.",
      "Assign Zone B exit watch guards to monitor pathways.",
      "Liaise with Central PA room for target announcement query."
    ],
    assignedTeams: ["Concourse B Security guards", "Volunteer Mobility stewards", "Central PA Room"],
    estResolutionTime: "10 Mins",
    confidenceScore: "95%",
    timeline: [
      { label: "Report Logged", time: "20:20:45", completed: true },
      { label: "Internal Broadcast", time: "20:21:10", completed: true },
      { label: "Guard Posts Alerted", time: "20:22:00", completed: true },
      { label: "CCTV Scan Initialized", time: "20:23:45", completed: true },
      { label: "Child Reunited", time: "--:--:--", completed: false }
    ]
  },
  {
    id: "INC-2015",
    time: "20:15",
    stadium: "SoFi Stadium",
    category: "Suspicious Activity",
    priority: "Medium",
    status: "Resolved",
    summary: "Unattended bag identified near Gate D outer barrier corridor. Scanned via security drone cameras.",
    riskScore: 58,
    recommendedActions: [
      "Dispatch security patrol to establish a 10m safety cordon.",
      "Examine drone scanner thermal signatures for static risks.",
      "Verify bag contents using thermal security scanners."
    ],
    assignedTeams: ["Outer Perimeter Security", "Drone Control Center"],
    estResolutionTime: "Completed",
    confidenceScore: "91%",
    timeline: [
      { label: "Drone Visual Alert", time: "20:15:30", completed: true },
      { label: "Security Dispatch", time: "20:16:15", completed: true },
      { label: "Cordon Establish", time: "20:18:00", completed: true },
      { label: "Owner Reclaimed Bag", time: "20:22:10", completed: true },
      { label: "Incident Closed", time: "20:24:00", completed: true }
    ]
  },
  {
    id: "INC-2010",
    time: "20:10",
    stadium: "MetLife Stadium",
    category: "Transport Delay",
    priority: "Medium",
    status: "Detected",
    summary: "Metro commuter line delayed by 8 minutes due to static switch warnings. Train blockages reported.",
    riskScore: 60,
    recommendedActions: [
      "Increment shuttle bus departure counts from North Terminus by 4 blocks.",
      "Notify arriving spectators via app alerts to expect transport delays.",
      "Coordinate backup commuter lanes with regional logistics command."
    ],
    assignedTeams: ["Transport Liaison Unit", "Transit Shuttle Ops"],
    estResolutionTime: "20 Mins",
    confidenceScore: "88%",
    timeline: [
      { label: "Commuter Delay Alert", time: "20:10:04", completed: true },
      { label: "App Alert Dispatched", time: "20:11:15", completed: true },
      { label: "Shuttle Buffer Active", time: "20:13:00", completed: false },
      { label: "Metro Track Cleared", time: "--:--:--", completed: false },
      { label: "Normal Transit Flow", time: "--:--:--", completed: false }
    ]
  },
  {
    id: "INC-2005",
    time: "20:05",
    stadium: "Lusail Stadium",
    category: "Weather Alert",
    priority: "Low",
    status: "Resolved",
    summary: "Slight ambient heat rise registered at seating rows block 102. Solar sun load peaks.",
    riskScore: 30,
    recommendedActions: [
      "Boost local HVAC cooling loop by 2°C.",
      "Distribute water bottles near Sector 102.",
      "Confirm ventilation airflow settings are in high-volume mode."
    ],
    assignedTeams: ["Facility Engineers", "Sector 102 Volunteers"],
    estResolutionTime: "Completed",
    confidenceScore: "95%",
    timeline: [
      { label: "Sensors Alert Peak", time: "20:05:00", completed: true },
      { label: "HVAC Boost Command", time: "20:05:45", completed: true },
      { label: "Volunteers Water Disp", time: "20:08:00", completed: true },
      { label: "Ambient Temp Stable", time: "20:12:00", completed: true },
      { label: "Alert Closed Out", time: "20:14:00", completed: true }
    ]
  }
];

export interface IncidentStats {
  openIncidents: number;
  resolvedToday: number;
  avgResponseTime: string;
  criticalEvents: number;
  predictionAccuracy: string;
}

export const mockStats: IncidentStats = {
  openIncidents: 5,
  resolvedToday: 42,
  avgResponseTime: "4.2 Mins",
  criticalEvents: 3,
  predictionAccuracy: "96.4%"
};
