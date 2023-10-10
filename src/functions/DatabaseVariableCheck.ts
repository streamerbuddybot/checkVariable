export default async function (varable: string, channel: string, channelID: number, userID: number, user: string) {
  const intergartion = varable.split(".");

  switch (intergartion[0]) {
    case "random":
      switch (intergartion[1]) {
        case "number":
          console.log(intergartion);
          if (intergartion[2]) {
            const number = intergartion[2].split("-");
            if (isNaN(Number(number[0])) && isNaN(Number(number[1]))) {
              return "[Error: The person that made this command did not use the correct variables]"
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
  }
}
