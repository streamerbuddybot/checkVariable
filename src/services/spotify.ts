import { spotifyAPI } from "../grpc/spotify";
import { spotifyQueueRequest, spotifyQueueResponse, spotifySongDetailsRequest, spotifySongDetailsResponse } from "../proto/SpotifyAPI";

export async function songDetails (payload: spotifySongDetailsRequest): Promise<spotifySongDetailsResponse> {
  const response = await new Promise<spotifySongDetailsResponse>((resolve, reject) => {
    spotifyAPI["getSongDetails"](payload, (err, res) => {
      if (err) {
        reject(err);
      } else {
        if (!res) {
          reject("no response data");
          return;
        }
        resolve(res);
      }
    });
  });
  return response
}


export async function getQueue(payload: spotifyQueueRequest): Promise<spotifyQueueResponse>{
  const response = await new Promise<spotifyQueueResponse>((resolve, reject) => {
    spotifyAPI["getQueue"](new spotifyQueueRequest(payload), (err, res) => {
      if (err) {
        reject(err);
      } else {
        if (!res) {
          reject("no response data");
          return;
        }
        resolve(res);
      }
    });
  });
  return response
}