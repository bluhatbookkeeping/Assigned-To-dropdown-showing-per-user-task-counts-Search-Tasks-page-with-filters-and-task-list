import { TeamMember, Task, AvailabilityEntry } from '../types';

export const mockTeamMembers: TeamMember[] = [
{ id: '1', username: 'vyogesh', taskCount: 12, status: 'Available' },
{ id: '2', username: 'ugupta', taskCount: 45, status: 'Available' },
{ id: '3', username: 'uthirumali', taskCount: 8, status: 'Available' },
{ id: '4', username: 'uvanamamal', taskCount: 0, status: 'Available' },
{ id: '5', username: 'VCAMPOS', taskCount: 67, status: 'Available' },
{ id: '6', username: 'VIRT_aanan', taskCount: 23, status: 'Available' },
{ id: '7', username: 'virt_amabh', taskCount: 5, status: 'Available' },
{ id: '8', username: 'VIRT_dhera', taskCount: 0, status: 'Out of Office' },
{ id: '9', username: 'VIRT_gdhak', taskCount: 34, status: 'Available' },
{ id: '10', username: 'VIRT_jyada', taskCount: 51, status: 'Available' },
{ id: '11', username: 'virt_kwije', taskCount: 15, status: 'Available' },
{ id: '12', username: 'VIRT_lekan', taskCount: 0, status: 'Available' },
{ id: '13', username: 'VIRT_mgama', taskCount: 28, status: 'Available' },
{ id: '14', username: 'VIRT_mmadh', taskCount: 42, status: 'Available' },
{ id: '15', username: 'VIRT_mpann', taskCount: 19, status: 'Available' },
{ id: '16', username: 'VIRT_mwick', taskCount: 7, status: 'Available' },
{ id: '17', username: 'VIRT_sfran', taskCount: 0, status: 'Out of Office' },
{ id: '18', username: 'VIRT_snair', taskCount: 36, status: 'Available' },
{ id: '19', username: 'VIRT_ssund', taskCount: 22, status: 'Available' },
{ id: '20', username: 'VIRT_ynuwa', taskCount: 11, status: 'Available' }];


export const mockTasks: Task[] = [
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
  assignedTo: ''
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
  assignedTo: ''
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
  assignedTo: ''
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
  assignedTo: ''
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
  assignedTo: ''
},
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
  assignedTo: 'VCAMPOS'
},
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
  assignedTo: 'ugupta'
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