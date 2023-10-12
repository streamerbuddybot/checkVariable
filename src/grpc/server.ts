import * as grpc from "@grpc/grpc-js";
import { CheckVariableResponse, CheckVariableRequest, variableServiceClient } from "../proto/handleMessage";
import * as config from "../config.json";
import handleMessage from "../functions/handleMessage";
import { CommandInfo } from "../types/message";
// import { eventsub } from "../functions/handleEventsub";

const server = new grpc.Server();
const port = config.checkVariable.port;
const host = config.checkVariable.host;

async function grpcServer() {
  const serviceImpl = {
    checkVariable: async (
      call: grpc.ServerUnaryCall<CheckVariableRequest, CheckVariableResponse>,
      callback: grpc.sendUnaryData<CheckVariableResponse>
    ) => {
      let data = call.request.toObject();




      if (!data) return callback(null, new CheckVariableResponse({ status: 401, message: "Missing channelID or songrequest data" }));

      //check if we have all the data we need
      if (!data.message) return callback(null, new CheckVariableResponse({ status: 401, message: "Missing message data" }));

      const resturnmessage: string = await handleMessage(data as unknown as CommandInfo);

      callback(null, new CheckVariableResponse({ status: 200, message: resturnmessage }));
    },
  };
  server.addService(variableServiceClient.service, serviceImpl);
  server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    server.start();
    console.log("server running on port", `${host}:${port}`);
  });
}

export default grpcServer;
