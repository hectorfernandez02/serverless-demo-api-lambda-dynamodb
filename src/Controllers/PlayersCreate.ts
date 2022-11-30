import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { HttpsStatusCodeEnum } from "@Enums/HttpsStatusCodeEnum";
import { gatewayResponse } from "@Utils/Gateway";
import { Player } from "@Entities/Player";

import { createOrUpdateOnePlayer } from "@Persistence/PlayerRepository";

/*Create one Player the url is /player using POST with the body defined on /Schemas/PlayerCreateSchema.json*/
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
    const newPlayer = await createOrUpdateOnePlayer(player, true);
    if(!newPlayer){
      return gatewayResponse(
        {
          message: "PlayerId Duplicated",
        },
        HttpsStatusCodeEnum.BAD_REQUEST
      );

    }

    return gatewayResponse(newPlayer, HttpsStatusCodeEnum.OK);
  } catch (err) {
    console.log(err);

    return gatewayResponse(
      "Internal Error",
      HttpsStatusCodeEnum.INTERNAL_ERROR
    );
  }
};
