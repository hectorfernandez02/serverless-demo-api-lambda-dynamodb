import { getConfig } from '@Configs';
import { DynamoDBConfigsType } from '@Types/DynamoDBConfigsType';

export const getDynamoDBConfigs = (): DynamoDBConfigsType => {
  const tableName = `api-lambda-dynamodb-${getConfig().environment}-${getConfig().user_name}`;
  return {
    table_names: {
      players_table: tableName
    }
  };
};
