import {
  QueryCommand,
  ScanCommand,
  PutItemCommand,
  DeleteItemCommand,
  DeleteItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { Player } from "@Entities/Player";
import { PlayerPrimitives } from "@Types/PlayerPrimitives";
import { Nullable } from "@Types/Nullable";
import { getDynamoDBConfigs } from "@Persistence/DynamoDBConfigs";
import { DynamoDBFactory } from "@Persistence/DynamoDBFactory";

/* Services for accessing the DynamoDB */

export const searchOnePlayer = async (
  playerId: string
): Promise<Nullable<PlayerPrimitives>> => {
  const client = DynamoDBFactory.getClient();

  const tableName = getDynamoDBConfigs().table_names.players_table;

  let commandBody: any = {
    TableName: tableName,
    Limit: 1,
    ConsistentRead: true,
    KeyConditionExpression: "playerId = :playerIdValue",
    ExpressionAttributeValues: { ":playerIdValue": { S: playerId } },
  };

  try {
    const result = await client.send(new QueryCommand(commandBody));

    if (result.Items && result.Items.length > 0) {
      const player = new Player(
        result.Items[0].playerId.S ? result.Items[0].playerId.S : "",
        result.Items[0].name.S ? result.Items[0].name.S : "",
        result.Items[0].team.S ? result.Items[0].team.S : "",
        result.Items[0].number.N ? parseInt(result.Items[0].number.N) : 0
      );
      return {
        playerId: player.getPlayerId(),
        name: player.getName(),
        number: player.getNumber(),
        team: player.getTeam(),
      };
    }

    return null;
  } catch (error) {
    const err = <Error>error;
    console.error(`The query attempt failed with message: ${err.message}`);
    throw new Error(`The query attempt failed with message: ${err.message}`);
  }
};
export const createOrUpdateOnePlayer = async (
  player: Player,
  checkDuplicate: boolean = true
): Promise<Nullable<PlayerPrimitives>> => {
  const client = DynamoDBFactory.getClient();

  const tableName = getDynamoDBConfigs().table_names.players_table;

  try {
    if (checkDuplicate) {
      const findOne = await searchOnePlayer(player.getPlayerId());
      if (findOne && findOne.hasOwnProperty("playerId")) {
        return null;
      }
    }

    await client.send(
      new PutItemCommand({
        TableName: tableName,
        Item: {
          playerId: { S: player.getPlayerId() },
          name: { S: player.getName() },
          number: { N: player.getNumber().toString() },
          team: { S: player.getTeam() },
        },
      })
    );
    return {
      playerId: player.getPlayerId(),
      name: player.getName(),
      number: player.getNumber(),
      team: player.getTeam(),
    };
  } catch (error) {
    const err = <Error>error;
    console.error(`The query attempt failed with message: ${err.message}`);
    throw new Error(`The query attempt failed with message: ${err.message}`);
  }
};
export const searchManyPlayers = async (): Promise<
  Nullable<Array<PlayerPrimitives>>
> => {
  const client = DynamoDBFactory.getClient();

  const tableName = getDynamoDBConfigs().table_names.players_table;
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
    throw new Error(`The query attempt failed with message: ${err.message}`);
  }
};
export const deleteOnePlayer = async (
  playerId: string
): Promise<Nullable<Boolean>> => {
  const client = DynamoDBFactory.getClient();
  const tableName = getDynamoDBConfigs().table_names.players_table;
  console.log(playerId);

  try {
    const params: DeleteItemCommandInput = {
      TableName: tableName,
      Key: marshall({
        playerId: playerId.toString(),
        team: "uruguay",
      }),
    };

    const result = await client.send(new DeleteItemCommand(params));

    return result ? true : false;
  } catch (error) {
    const err = <Error>error;
    console.error(`The query attempt failed with message: ${err.message}`);
    throw new Error(`The query attempt failed with message: ${err.message}`);
  }
};
