import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface DataShareStat {
  sharedData: any;
}

@Injectable({
  providedIn: 'root',
})
export class DataShareService {
  public sharingDataSubject = new Subject<DataShareStat>();

  public sharingData$ = this.sharingDataSubject.asObservable();

  setData(data: any) {
    this.sharingDataSubject.next({ sharedData: data });
  }
}
