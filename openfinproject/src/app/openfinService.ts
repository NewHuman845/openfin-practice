// openfin.service.ts
import { Injectable } from '@angular/core';

declare const fin: any;

@Injectable({
  providedIn: 'root'
})
export class OpenFinService {
  async openNewWindow(route: string) {

    if (typeof window !== 'undefined' && 'fin' in window) {
  // Safe to use OpenFin APIs
   await fin.Window.create({
        name: `win-${route}`,
        url: `http://localhost:4200/${route}`,
        autoShow: true,
        defaultWidth: 800,
        defaultHeight: 600
      });
} else {
  // Fallback for browser
    window.open(`/${route}`, '_blank');
}}
}