import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { HttpsStatusCodeEnum } from "@Enums/HttpsStatusCodeEnum";
import { gatewayResponse } from "@Utils/Gateway";

import { deleteOnePlayer } from "@Persistence/PlayerRepository";

/*Delete one Player the url is /players/{ID} using DELETE */
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
    const result = await deleteOnePlayer(event.pathParameters.id);

    if (!result)
      return gatewayResponse(
        {
          message: "There is not data",
        },
        HttpsStatusCodeEnum.NOT_FOUND
      );
    return gatewayResponse("Player deleted", HttpsStatusCodeEnum.OK);
  } catch (err) {
    console.log(err);

    return gatewayResponse(
      "Internal Error",
      HttpsStatusCodeEnum.INTERNAL_ERROR
    );
  }
};
