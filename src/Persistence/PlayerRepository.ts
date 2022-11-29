import { QueryCommand, ScanCommand } from "@aws-sdk/client-dynamodb";

import { PlayerPrimitives } from "@Types/PlayerPrimitives";
import { Nullable } from "@Types/Nullable";
import { getDynamoDBConfigs } from "@Persistence/DynamoDBConfigs";
import { DynamoDBFactory } from "@Persistence/DynamoDBFactory";


export const searchManyPlayers = async (): Promise<
  Nullable<Array<PlayerPrimitives>>
> => {
  const client = DynamoDBFactory.getClient();

  const tableName = getDynamoDBConfigs().table_names.players_table;
  console.log(tableName);
  const items = [];
  let hasMoreElements: boolean;

  let commandBody: any = {
    TableName: tableName,
  };

  try {
    do {
      hasMoreElements = false;

      const result = await client.send(new ScanCommand(commandBody));

      if (result.Items && result.Items.length > 0) {
        items.push(...result.Items);
      }

      if (result.LastEvaluatedKey) {
        commandBody = {
          ...commandBody,
          ExclusiveStartKey: result.LastEvaluatedKey,
        };

        hasMoreElements = true;
      }
    } while (hasMoreElements);

    if (items.length <= 0) return null;

    return items.map((item: any) => {
      const playersDB = {
        playerId: item.playerId.S,
        name: item.name.S,
        number: item.number.N,
        team: item.team.S,
      };
      return playersDB;
    });
  } catch (error) {
    const err = <Error>error;
    console.error(`The query attempt failed with message: ${err.message}`);
    throw new Error(error);
  }
};
