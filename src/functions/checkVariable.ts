import { CommandInfo } from "../types/message";
import DatabaseVariableCheck from "./DatabaseVariableCheck";
const variableRegex = /\${(.*?)}/g;

export default async function checkvariable({ message, channel, channelID, user, userID }: CommandInfo) {
  let messageArray = message.trim().split(" ");

  const newArray = await Promise.all(
    messageArray.map(async (word) => {
      let replacedWord = word;
      let match;
      while ((match = variableRegex.exec(word)) !== null) {
        const variable = match[1]; // Extract the variable inside the curly braces
        const value = await DatabaseVariableCheck(variable, channel, channelID, userID, user);
        if (value !== null && value !== undefined) {
          replacedWord = replacedWord.replace(match[0], value.toString());
        }
      }
      return replacedWord;
    })
  );

  return newArray.join(" ");
}
