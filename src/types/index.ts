export interface TeamMember {
  id: string;
  username: string;
  taskCount: number;
  status: 'Available' | 'Out of Office';
}

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

export type ViewState = 'dashboard' | 'workload' | 'availability';