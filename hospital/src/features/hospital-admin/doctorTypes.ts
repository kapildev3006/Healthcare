export type DoctorStatus = 'Active' | 'On Leave' | 'Inactive';

export type DoctorTabFilter = 'all' | 'active' | 'on-leave' | 'inactive';

export interface DoctorItem {
  id: string;
  name: string;
  qualification: string;
  specialty: string;
  department: string;
  licenseId: string;
  experience: string;
  status: DoctorStatus;
  joinDate: string;
  avatar: string;
  email?: string;
  phone?: string;
}

export interface DoctorStats {
  totalDoctors: number;
  totalTrend: string;
  activeDoctors: number;
  activeTrend: string;
  onLeave: number;
  inactive: number;
  inactiveTrend: string;
}
