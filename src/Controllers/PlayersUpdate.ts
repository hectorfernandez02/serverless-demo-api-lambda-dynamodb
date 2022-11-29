import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { HttpsStatusCodeEnum } from "@Enums/HttpsStatusCodeEnum";
import { gatewayResponse } from "@Utils/Gateway";
import { Player } from "@Entities/Player";

import { createOrUpdateOnePlayer } from "@Persistence/PlayerRepository";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return gatewayResponse(
        "Payload not provided",
        HttpsStatusCodeEnum.BAD_REQUEST
      );
    }

    const body =
      typeof event.body !== "string" ? event.body : JSON.parse(event.body);

    const player = new Player(body.playerId, body.name, body.team, body.number);
    const updatedPlayer = await createOrUpdateOnePlayer(player, false);

    return gatewayResponse(updatedPlayer, HttpsStatusCodeEnum.OK);
  } catch (err) {
    console.log(err);

    return gatewayResponse(
      "Internal Error",
      HttpsStatusCodeEnum.INTERNAL_ERROR
    );
  }
};
