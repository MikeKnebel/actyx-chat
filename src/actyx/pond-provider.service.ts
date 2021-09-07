import appManifest from "./app-manifest.json";
import {RxPond} from "@actyx-contrib/rx-pond";
import {Pond} from "@actyx/pond";

export const pondPromise: Promise<RxPond> = Promise.resolve(RxPond.from(Pond.test()));
