export class LocalStorageUtility {
  static initializeLocalStorage<T>(key: string, defaultData: T[]): void {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(defaultData));
    }
  }

  static getFromLocalStorage<T>(key: string): T[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  static saveToLocalStorage<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static addToLocalStorage<T>(key: string, item: T): T {
    const data = this.getFromLocalStorage<T>(key);
    const newItem = { ...item, id: new Date().getTime() } as T;
    data.push(newItem);
    this.saveToLocalStorage(key, data);
    return newItem;
  }

  static getItemFromLocalStorage<T>(key: string, id: number): T | undefined {
    const data = this.getFromLocalStorage<T>(key);
    return data.find((item: any) => item.id === id);
  }

  static updateInLocalStorage<T>(
    key: string,
    id: number,
    updatedItem: Partial<T>
  ): T | undefined {
    const data = this.getFromLocalStorage<T>(key);
    const index = data.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedItem } as T;
      this.saveToLocalStorage(key, data);
      return data[index];
    }
    return undefined;
  }

  static deleteFromLocalStorage<T>(key: string, id: number): boolean {
    const data = this.getFromLocalStorage<T>(key);
    const initialLength = data.length;
    const updatedData = data.filter((item: any) => item.id !== id);
    this.saveToLocalStorage(key, updatedData);
    return updatedData.length < initialLength;
  }
}
