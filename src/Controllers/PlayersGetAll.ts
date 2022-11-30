import {  APIGatewayProxyResult } from "aws-lambda";
import { HttpsStatusCodeEnum } from "@Enums/HttpsStatusCodeEnum";
import { gatewayResponse } from "@Utils/Gateway";
import { PlayerPrimitives } from "@Types/PlayerPrimitives";

import { searchManyPlayers } from "@Persistence/PlayerRepository";
/*Get All Players the url is /players using GET */
export const handler = async (
): Promise<APIGatewayProxyResult> => {
  try {
    const playersDB = await searchManyPlayers();

    if (!playersDB)
      return gatewayResponse(
        {
          message: "There is not data",
        },
        HttpsStatusCodeEnum.NOT_FOUND
      );

    const players = playersDB.map(
      (player: PlayerPrimitives): PlayerPrimitives => {
        return {
          playerId: player.playerId,
          name: player.name,
          number: player.number,
          team: player.team,
        };
      }
    );

    return gatewayResponse(players, HttpsStatusCodeEnum.OK);
  } catch (err) {
    console.log(err);

    return gatewayResponse(
      "Internal Error",
      HttpsStatusCodeEnum.INTERNAL_ERROR
    );
  }
};
