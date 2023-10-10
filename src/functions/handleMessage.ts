import { CommandInfo } from "../types/message";
import checkvariable from "./checkVariable";

export default async function (data: CommandInfo) {
  const response = await checkvariable(data)
  console.log(response)

  
  return response
}



