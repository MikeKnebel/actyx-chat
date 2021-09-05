import {pondPromise} from "./pond-provider.service";
import {LikeTag} from "./like-submit";
import {Observable, Subject} from "rxjs";

export const lastLikeFrom$ = (): Observable<string> => {

    const subject = new Subject<string>();

    pondPromise.then((pond) => {
        pond.events().observeLatest({query: LikeTag}).subscribe((data) => {
            subject.next(data.event.userName)
        });
    });

    return subject;
}