import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalContentService {
  private readonly CONTENT_KEY = 'content_items';

  getAll() {
    const items = localStorage.getItem(this.CONTENT_KEY);
    return items ? JSON.parse(items) : [];
  }

  add(item: any) {
    const items = this.getAll();
    items.push(item);
    localStorage.setItem(this.CONTENT_KEY, JSON.stringify(items));
  }

  update(id: string, newItem: any) {
    let items = this.getAll();
    items = items.map((item: any) => item.id === id ? newItem : item);
    localStorage.setItem(this.CONTENT_KEY, JSON.stringify(items));
  }

  delete(id: string) {
    let items = this.getAll();
    items = items.filter((item: any) => item.id !== id);
    localStorage.setItem(this.CONTENT_KEY, JSON.stringify(items));
  }
} 