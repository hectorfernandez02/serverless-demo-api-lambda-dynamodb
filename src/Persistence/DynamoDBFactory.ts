import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { getConfig } from '@Configs';

/* Factory instance for DynamoDB */
export class DynamoDBFactory {
  private static _client?: DynamoDBClient;

  private static createClient() {
    try {
      return new DynamoDBClient({ region: getConfig().general_region });
    } catch (error) {
      const err = <Error>error;
      console.error(`The connection to DynamoDB failed with message: ${err.message}`);
      throw new Error(`The connection to DynamoDB failed with message: ${err.message}`);
    }
  }

  public static getClient(): DynamoDBClient {
    if (!this._client) {
      this._client = this.createClient();
    }

    return this._client;
  }
}
