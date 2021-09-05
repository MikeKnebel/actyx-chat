import appManifest from "./app-manifest.json";
import {RxPond} from "@actyx-contrib/rx-pond";

export const pondPromise: Promise<RxPond> = RxPond.default(appManifest);
