export interface TeamMember {
  id: string;
  username: string;
  taskCount: number;
  status: 'Available' | 'Out of Office';
}

export type SlaStatus = 'On Track' | 'At Risk' | 'Breached';

export interface Task {
  id: string;
  requestType: string;
  requestDate: string;
  requestStatus: string;
  serviceComponent: string;
  eventDate: string;
  eventId: string;
  ssn: string;
  services: boolean; // true if icon present
  taskStatus: string;
  lastModifiedDate: string;
  assignedTo: string;
  workflow: 'MBA' | 'CSA' | 'QA';
  slaDeadline: string; // ISO date string
  slaStatus: SlaStatus;
}

export interface AvailabilityEntry {
  id: string;
  userId: string;
  username: string;
  startDate: string;
  endDate: string;
  reason: 'Vacation' | 'Sick Leave' | 'Training' | 'Other';
  notes?: string;
}

export interface SlaConfig {
  workflow: 'MBA' | 'CSA' | 'QA';
  minDays: number; // Target/Warning threshold
  maxDays: number; // Breach threshold
  description?: string;
}

export type ViewState =
'dashboard' |
'workload' |
'availability' |
'sla-dashboard' |
'sla-config' |
'member-report';