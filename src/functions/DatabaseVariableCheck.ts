import { spotifySongDetailsRequest, spotifyRequest, spotifyQueueRequest } from "../proto/SpotifyAPI";
import { songDetails, getQueue } from "../services/spotify";

export default async function (varable: string, channel: string, channelID: number, userID: number, user: string) {
  const intergartion = varable.split(".");

  switch (intergartion[0]) {
    case "random":
      switch (intergartion[1]) {
        case "number":
          if (intergartion[2]) {
            const number = intergartion[2].split("-");
            if (isNaN(Number(number[0])) && isNaN(Number(number[1]))) {
              return "[Error: The person that made this command did not use the correct variables]";
            }
            return Math.floor(Math.random() * (Number(number[1]) - Number(number[0]) + 1)) + Number(number[0]);
          }
          return Math.floor(Math.random() * (100 - 0 + 1)) + 0;
      }

    case "user":
      switch (intergartion[1]) {
        case "name":
          return user;
        case "id":
          return userID;
          3;
      }

    case "channel":
      switch (intergartion[1]) {
        case "name":
          return channel;
        case "id":
          return channelID;
        case "subsribers":
          return 0;
      }

    case "spotify":
      const payload = new spotifySongDetailsRequest({ channelID });
      const songdetails = await songDetails(payload);

      switch (intergartion[1]) {
        case "song":
          return songdetails.songDetails!.song;
        case "artist":
          return songdetails.songDetails!.artist;
        case "album":
          return songdetails.songDetails!.album;
        case "id":
          return songdetails.songDetails!.songID;
        case "songimage":
          return songdetails.songDetails!.imageURL;
        case "url":
          return songdetails.songDetails!.songURL;
        case "duration":
          const duration = mstosec(songdetails.songDetails!.duration!);
          return duration;
        case "volume":
          return songdetails.songDetails!.volume;
        case "isplaying":
          return songdetails.songDetails!.isPlaying;
        case "progress":
          console.log(songdetails.songDetails!.progress);
          const Progress = mstosec(songdetails.songDetails!.progress!);
          return Progress;
        case "release_date":
          return songdetails.songDetails!.release_date;

        case "queue":
          const payload = new spotifyQueueRequest({ channelID });
          const check = (await getQueue(payload)).toObject();


          if (check.totalSongs === 0) {
            return "No songs in queue";
          }

          const queue = check.queue!.map((song) => {
            return `${song.songname} by ${song.requested_by}`
          });

          return queue.join(" | ");
      }

    default:
      return "[Error: The person that made this command did not use the correct variables]";
  }
}

//calculateProgress in seconds
function mstosec(ms: number) {

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);

  return `${minutes % 60}.${seconds % 60}`;
}
