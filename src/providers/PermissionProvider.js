// contexts/PermissionsContext.js
import React, { createContext, useCallback, useContext } from 'react';
import {
  isValidPermission,
  PermissionGroups,
  Permissions,
} from '../shared/permissions';
import useUser from '../hooks/useUser';
import { USE_MOCKS } from '../shared/constants';

const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
  const { permissions } = useUser();

  const hasPermission = useCallback(
    (permission) => {
      if (USE_MOCKS) {
        return true;
      }

      if (permissions && permissions[Permissions.SUPER_ADMIN]) {
        return true;
      }

      if (!permissions || Object.keys(permissions).length === 0) {
        return false;
      }

      if (!isValidPermission(permission)) {
        console.warn('Invalid permission:', permission);
        return false;
      }

      if (Array.isArray(permission)) {
        return permission.some((perm) => permissions[perm]);
      }

      return permissions[permission] === true;
    },
    [permissions],
  );

  return (
    <PermissionsContext.Provider
      value={{
        permissions: permissions,
        hasPermission,
        Permissions,
        PermissionGroups,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};
