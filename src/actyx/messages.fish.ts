import {MessageBoxData} from "../components/MessageBox";
import {Fish, FishId, Metadata} from "@actyx/pond";
import {ChatMessageEvent, MessageTag} from "./message-submit";

export const Last20Messages = (userName: string): Fish<MessageBoxData[], ChatMessageEvent> => {
    return {
        fishId: FishId.of("Messages", `last20`, 0),
        initialState: [],
        where: MessageTag,
        onEvent: (state: MessageBoxData[], event: ChatMessageEvent, metadata: Metadata) => {
            state.push({
                id: event.id,
                name: event.name,
                message: event.message,
                dateString: metadata.timestampAsDate().toLocaleTimeString('de-DE'),
                likedFrom: [] as string[]
            });
            return state.splice(-20);
        }
    }
};