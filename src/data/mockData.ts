import { TeamMember, Task, AvailabilityEntry, SlaConfig } from '../types';

export const mockTeamMembers: TeamMember[] = [
{ id: '1', username: 'VCAMPOS', taskCount: 67, status: 'Available' },
{ id: '2', username: 'VIRT_jyada', taskCount: 51, status: 'Available' },
{ id: '3', username: 'ugupta', taskCount: 45, status: 'Available' },
{ id: '4', username: 'VIRT_mmadh', taskCount: 42, status: 'Available' },
{ id: '5', username: 'VIRT_snair', taskCount: 36, status: 'Available' },
{ id: '6', username: 'VIRT_gdhak', taskCount: 34, status: 'Available' },
{ id: '7', username: 'VIRT_mgama', taskCount: 28, status: 'Available' },
{ id: '8', username: 'VIRT_aanan', taskCount: 23, status: 'Available' },
{ id: '9', username: 'vyogesh', taskCount: 12, status: 'Available' },
{ id: '10', username: 'VIRT_dhera', taskCount: 0, status: 'Out of Office' }];


// Helper to generate a future date
const futureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

// Helper to generate a past date
const pastDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

export const mockTasks: Task[] = [
// Existing unassigned tasks
{
  id: '1',
  requestType: 'In-Clinic',
  requestDate: '1/25/2036',
  requestStatus: 'Partially Scheduled',
  serviceComponent: 'U.S. Air Force Reserve (USAFR)',
  eventDate: '',
  eventId: '1000004232',
  ssn: '4232',
  services: true,
  taskStatus: 'NEW',
  lastModifiedDate: '1/31/2026',
  assignedTo: '',
  workflow: 'MBA',
  slaDeadline: futureDate(2),
  slaStatus: 'On Track'
},
{
  id: '2',
  requestType: 'In-Clinic',
  requestDate: '2/6/2026',
  requestStatus: 'Scrubbed: Clean',
  serviceComponent: 'U.S. Coast Guard Reserve (USCGR)',
  eventDate: '',
  eventId: '1995113055',
  ssn: '1111',
  services: true,
  taskStatus: 'NEW',
  lastModifiedDate: '2/6/2026',
  assignedTo: '',
  workflow: 'CSA',
  slaDeadline: futureDate(5),
  slaStatus: 'On Track'
},
{
  id: '3',
  requestType: 'Event',
  requestDate: '2/5/2026',
  requestStatus: 'Received',
  serviceComponent: 'Joint/Combined Event',
  eventDate: '2/27/2026',
  eventId: 'FL-AN-20260227-D-09',
  ssn: '',
  services: true,
  taskStatus: 'NEW',
  lastModifiedDate: '2/6/2026',
  assignedTo: '',
  workflow: 'QA',
  slaDeadline: futureDate(1),
  slaStatus: 'At Risk'
},
{
  id: '4',
  requestType: 'Event',
  requestDate: '2/5/2026',
  requestStatus: 'Received',
  serviceComponent: 'U.S. Air Force Reserve (USAFR)',
  eventDate: '2/27/2026',
  eventId: 'FL-AN-20260227-D-08',
  ssn: '',
  services: true,
  taskStatus: 'NEW',
  lastModifiedDate: '2/6/2026',
  assignedTo: '',
  workflow: 'MBA',
  slaDeadline: pastDate(1),
  slaStatus: 'Breached'
},
{
  id: '5',
  requestType: 'Event',
  requestDate: '2/5/2026',
  requestStatus: 'Received',
  serviceComponent: 'U.S. Air Force Reserve',
  eventDate: '2/27/2026',
  eventId: 'FL-AN-20260227-D-07',
  ssn: '',
  services: true,
  taskStatus: 'NEW',
  lastModifiedDate: '2/6/2026',
  assignedTo: '',
  workflow: 'CSA',
  slaDeadline: futureDate(3),
  slaStatus: 'On Track'
},
// Assigned tasks for VCAMPOS
{
  id: '6',
  requestType: 'In-Clinic',
  requestDate: '2/4/2026',
  requestStatus: 'Partially Scheduled',
  serviceComponent: 'Army National Guard (ARNG)',
  eventDate: '',
  eventId: '1000004235',
  ssn: '5521',
  services: true,
  taskStatus: 'NEW',
  lastModifiedDate: '2/5/2026',
  assignedTo: 'VCAMPOS',
  workflow: 'MBA',
  slaDeadline: pastDate(2),
  slaStatus: 'Breached'
},
{
  id: '101',
  requestType: 'Event',
  requestDate: '2/1/2026',
  requestStatus: 'Received',
  serviceComponent: 'U.S. Army Reserve',
  eventDate: '3/10/2026',
  eventId: 'TX-AN-20260310-D-01',
  ssn: '',
  services: true,
  taskStatus: 'IN PROGRESS',
  lastModifiedDate: '2/2/2026',
  assignedTo: 'VCAMPOS',
  workflow: 'QA',
  slaDeadline: futureDate(0.5),
  slaStatus: 'At Risk'
},
{
  id: '102',
  requestType: 'In-Clinic',
  requestDate: '1/28/2026',
  requestStatus: 'Scrubbed: Clean',
  serviceComponent: 'U.S. Navy Reserve',
  eventDate: '',
  eventId: '1000004555',
  ssn: '9988',
  services: true,
  taskStatus: 'NEW',
  lastModifiedDate: '1/29/2026',
  assignedTo: 'VCAMPOS',
  workflow: 'CSA',
  slaDeadline: futureDate(4),
  slaStatus: 'On Track'
},
{
  id: '103',
  requestType: 'Event',
  requestDate: '1/30/2026',
  requestStatus: 'Partially Scheduled',
  serviceComponent: 'Air National Guard',
  eventDate: '3/15/2026',
  eventId: 'CA-AN-20260315-D-05',
  ssn: '',
  services: true,
  taskStatus: 'NEW',
  lastModifiedDate: '2/1/2026',
  assignedTo: 'VCAMPOS',
  workflow: 'MBA',
  slaDeadline: pastDate(5),
  slaStatus: 'Breached'
},
{
  id: '104',
  requestType: 'In-Clinic',
  requestDate: '2/2/2026',
  requestStatus: 'Received',
  serviceComponent: 'U.S. Marine Corps Reserve',
  eventDate: '',
  eventId: '1000004666',
  ssn: '7766',
  services: true,
  taskStatus: 'IN PROGRESS',
  lastModifiedDate: '2/3/2026',
  assignedTo: 'VCAMPOS',
  workflow: 'QA',
  slaDeadline: futureDate(1),
  slaStatus: 'At Risk'
},
// Assigned tasks for ugupta
{
  id: '7',
  requestType: 'Event',
  requestDate: '2/3/2026',
  requestStatus: 'Received',
  serviceComponent: 'U.S. Army Reserve (USAR)',
  eventDate: '3/15/2026',
  eventId: 'TX-AN-20260315-D-01',
  ssn: '',
  services: true,
  taskStatus: 'IN PROGRESS',
  lastModifiedDate: '2/4/2026',
  assignedTo: 'ugupta',
  workflow: 'MBA',
  slaDeadline: futureDate(2),
  slaStatus: 'On Track'
},
{
  id: '201',
  requestType: 'In-Clinic',
  requestDate: '1/29/2026',
  requestStatus: 'Scrubbed: Clean',
  serviceComponent: 'U.S. Air Force Reserve',
  eventDate: '',
  eventId: '1000004777',
  ssn: '3344',
  services: true,
  taskStatus: 'NEW',
  lastModifiedDate: '1/30/2026',
  assignedTo: 'ugupta',
  workflow: 'CSA',
  slaDeadline: futureDate(3),
  slaStatus: 'On Track'
},
{
  id: '202',
  requestType: 'Event',
  requestDate: '2/1/2026',
  requestStatus: 'Received',
  serviceComponent: 'Joint/Combined Event',
  eventDate: '3/20/2026',
  eventId: 'FL-AN-20260320-D-02',
  ssn: '',
  services: true,
  taskStatus: 'NEW',
  lastModifiedDate: '2/2/2026',
  assignedTo: 'ugupta',
  workflow: 'MBA',
  slaDeadline: pastDate(1),
  slaStatus: 'Breached'
},
// Assigned tasks for VIRT_jyada
{
  id: '301',
  requestType: 'In-Clinic',
  requestDate: '2/3/2026',
  requestStatus: 'Partially Scheduled',
  serviceComponent: 'Army National Guard',
  eventDate: '',
  eventId: '1000004888',
  ssn: '1122',
  services: true,
  taskStatus: 'NEW',
  lastModifiedDate: '2/4/2026',
  assignedTo: 'VIRT_jyada',
  workflow: 'QA',
  slaDeadline: futureDate(0.2),
  slaStatus: 'At Risk'
},
{
  id: '302',
  requestType: 'Event',
  requestDate: '2/4/2026',
  requestStatus: 'Received',
  serviceComponent: 'U.S. Navy Reserve',
  eventDate: '3/25/2026',
  eventId: 'NY-AN-20260325-D-03',
  ssn: '',
  services: true,
  taskStatus: 'IN PROGRESS',
  lastModifiedDate: '2/5/2026',
  assignedTo: 'VIRT_jyada',
  workflow: 'CSA',
  slaDeadline: futureDate(4),
  slaStatus: 'On Track'
}];


export const mockAvailability: AvailabilityEntry[] = [
{
  id: '1',
  userId: '8',
  username: 'VIRT_dhera',
  startDate: '2026-02-01',
  endDate: '2026-02-14',
  reason: 'Vacation',
  notes: 'Annual leave'
},
{
  id: '2',
  userId: '17',
  username: 'VIRT_sfran',
  startDate: '2026-02-03',
  endDate: '2026-02-10',
  reason: 'Sick Leave'
},
{
  id: '3',
  userId: '2',
  username: 'ugupta',
  startDate: '2026-02-17',
  endDate: '2026-02-21',
  reason: 'Vacation',
  notes: 'Family trip'
},
{
  id: '4',
  userId: '5',
  username: 'VCAMPOS',
  startDate: '2026-03-01',
  endDate: '2026-03-05',
  reason: 'Training',
  notes: 'Leadership workshop'
},
{
  id: '5',
  userId: '14',
  username: 'VIRT_mmadh',
  startDate: '2026-02-24',
  endDate: '2026-02-28',
  reason: 'Vacation'
}];


export const mockSlaConfigs: SlaConfig[] = [
{
  workflow: 'MBA',
  minDays: 3,
  maxDays: 5,
  description: 'Medical Benefits Advisory / Administration tasks'
},
{
  workflow: 'CSA',
  minDays: 4,
  maxDays: 6,
  description: 'Clinical Support Associate tasks'
},
{
  workflow: 'QA',
  minDays: 5,
  maxDays: 8,
  description: 'Quality Assurance review tasks'
}];