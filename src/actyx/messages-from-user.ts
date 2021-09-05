import {Actyx, AqlEventMessage, AqlResponse} from "@actyx/pond";
import appManifest from "./app-manifest.json";

export const MessagesFromUser = async (userName: string): Promise<string[]> => {

    const query = `
    FROM
      'user-tag:${userName}'
    SELECT  _.message
    `;

   return Actyx.of(appManifest).then((actyx) => {
        return actyx.queryAql(query).then((data) => {
            const messages: string[] = data.filter((d) => d.type === "event")
                .map((d: AqlResponse) => (d as AqlEventMessage).payload as string);
            return messages;
        });
    });
}
