import { ConfigType } from '@Types/ConfigType';

export const getConfig = (): ConfigType => {
  return {
    general_region: process.env.GENERAL_REGION || 'us-west-2',
    user_name: process.env.USER_NAME || 'user-name-test',
    environment: process.env.NODE_ENV || 'environment-test'
  };
};
