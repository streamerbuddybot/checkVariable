export default async function (varable: string, channel: string, channelID: number, userID: number, user: string) {
  const intergartion = varable.split(".");

  switch (intergartion[0]) {
    case "random":
      switch (intergartion[1]) {
        case "number":
          const min = 0;
          const max = 100;
          return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    case "user":
      switch (intergartion[1]) {
        case "name":
          return user;
        case "id":
          return userID;
      }
  }
}
