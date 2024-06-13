// RequestPermission.tsx
import React, { useEffect } from 'react';
import { PermissionsAndroid, Permission } from 'react-native';

const RequestPermission: React.FC = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      await getPermission(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    } catch (error) {
      console.log(error);
    }
  };

  const getPermission = async (permission: Permission) => {
    try {
      const isGranted = await PermissionsAndroid.check(permission);
      if (!isGranted) {
        await PermissionsAndroid.request(permission);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <></>;
};

export default RequestPermission;
