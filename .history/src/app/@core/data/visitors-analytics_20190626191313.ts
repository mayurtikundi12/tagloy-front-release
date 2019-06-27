import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export interface OutlineData {
  label: string;
  value: number;
}

export abstract class VisitorsAnalyticsData {
  abstract getInnerLineChartData(): Observable<number[]>;
  abstract getOutlineLineChartData(): Observable<OutlineData[]>;
  abstract getPieChartData(): Observable<number>;
}
