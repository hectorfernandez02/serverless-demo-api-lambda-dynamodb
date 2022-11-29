import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { HttpsStatusCodeEnum } from "@Enums/HttpsStatusCodeEnum";
import { gatewayResponse } from "@Utils/Gateway";
import { Player } from "@Entities/Player";

import { searchOnePlayer } from "@Persistence/PlayerRepository";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.pathParameters || !event.pathParameters.id) {
      return gatewayResponse(
        "Path parameters not found /id",
        HttpsStatusCodeEnum.BAD_REQUEST
      );
    }
    const playersDB = await searchOnePlayer(event.pathParameters.id);

    if (!playersDB)
      return gatewayResponse(
        {
          message: "There is not data",
        },
        HttpsStatusCodeEnum.NOT_FOUND
      );

    const player = new Player(
      playersDB.playerId,
      playersDB.name,
      playersDB.team,
      playersDB.number
    );

    return gatewayResponse(player, HttpsStatusCodeEnum.OK);
  } catch (err) {
    console.log(err);

    return gatewayResponse(
      "Internal Error",
      HttpsStatusCodeEnum.INTERNAL_ERROR
    );
  }
};
