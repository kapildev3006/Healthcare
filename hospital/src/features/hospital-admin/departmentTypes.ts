export type DepartmentCategory =
  | 'Clinical'
  | 'Support'
  | 'Administrative'
  | 'Facilities';

export type DepartmentStatus = 'Active' | 'Inactive';

export interface DepartmentItem {
  id: string;
  name: string;
  head: string;
  headAvatar?: string;
  doctorsCount: number;
  staffCount: number;
  bedCapacity: number;
  status: DepartmentStatus;
  category: DepartmentCategory;
  location?: string;
  description?: string;
}

export interface DepartmentStats {
  totalDepartments: number;
  totalTrend: string;
  activeHeads: number;
  activeHeadsTrend: string;
  openRoles: number;
  openRolesTrend: string;
  performanceScore: number;
  performanceTrend: string;
}

export interface DepartmentDistributionItem {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface BedCapacityStats {
  totalBeds: number;
  totalTrend: string;
  occupiedBeds: number;
  occupiedPercentage: number;
  availableBeds: number;
  availablePercentage: number;
}

export interface DepartmentUpdateItem {
  id: string;
  title: string;
  timestamp: string;
  category: 'Department Head' | 'Status Change' | 'Budget Update' | 'Staffing';
  dotColor: 'green' | 'red' | 'blue';
}
