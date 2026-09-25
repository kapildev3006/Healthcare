export interface RoleHeroData {
  id: string;
  name: string;
  description: string;
  assignedStaffCount: number;
  createdOn: string;
  createdBy: string;
  lastUpdated: string;
  updatedBy: string;
  status: 'Active' | 'Inactive';
}

export interface PermissionToggleItem {
  id: string;
  label: string;
  enabled: boolean;
}

export interface ModulePermissionGroup {
  id: string;
  moduleName: string;
  iconType:
    | 'doctor'
    | 'department'
    | 'staff'
    | 'hospital'
    | 'audit'
    | 'emergency'
    | 'security'
    | 'notifications'
    | 'reports';
  permissions: PermissionToggleItem[];
}

export interface AssignedRoleUser {
  id: string;
  name: string;
  avatar: string;
  department: string;
  status: 'Active' | 'Inactive';
}

export interface FullRolePermissionsData {
  hero: RoleHeroData;
  modules: ModulePermissionGroup[];
  assignedUsers: AssignedRoleUser[];
}
