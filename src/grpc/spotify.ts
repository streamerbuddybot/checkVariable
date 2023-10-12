import * as grpc from "@grpc/grpc-js";
import { SpotifyServiceClient } from "../proto/SpotifyAPI";
import * as config from "../config.json";

const host = config.spotifyAPI.dns;
const port = config.spotifyAPI.port;
const connectionString = `${host}:${port}`;

const spotifyAPI = new SpotifyServiceClient(connectionString, grpc.credentials.createInsecure());

export { spotifyAPI };
