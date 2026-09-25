export type AccessLevel = 'Standard' | 'Elevated' | 'Admin';
export type StaffStatus = 'Active' | 'Inactive';

export interface StaffMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  email: string;
  staffId: string;
  accessLevel: AccessLevel;
  status: StaffStatus;
  lastActive: string;
  phone?: string;
  joinDate?: string;
}

export interface StaffStats {
  totalStaff: number;
  totalStaffTrend: string;
  roleGroups: number;
  pendingInvitations: number;
  pendingInvitationsTrend: string;
  activeUsers: number;
  activeUsersTrend: string;
}

export interface RoleDistributionItem {
  id: string;
  role: string;
  count: number;
  percentage: number;
}

export interface PermissionTemplate {
  id: string;
  name: string;
  description: string;
  iconType: 'user' | 'users' | 'gear' | 'crown';
  color: string;
}

export interface RecentRoleChangeItem {
  id: string;
  staffName: string;
  changeDescription: string;
  timestamp: string;
  dotColor: 'green' | 'blue' | 'amber';
}
