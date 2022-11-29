import { GatewayResponseType } from '@Types/GatewayResponseType';

export const gatewayResponse = (
  body: any,
  statusCode: number,
  customHeaders?: any
): GatewayResponseType => {
  const defaultHeaders = { 'Content-Type': 'application/json' };

  return {
    statusCode: statusCode,
    headers: {
      ...defaultHeaders,
      ...customHeaders
    },
    body: JSON.stringify(body)
  };
};
