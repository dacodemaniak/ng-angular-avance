export class Sort {
  private sortOrder = 1;
  private collator = new Intl.Collator(
    undefined,
    {
      numeric: true,
      sensitivity: 'base'
    }
  );

  public startSort(property: string, order: string, type='') {
    if (order === 'desc') {
      this.sortOrder = -1;
    }

    return (obj1: any, obj2: any) => {
      if (type === 'date') {
        return this.sortDate(new Date(obj1[property]), new Date(obj2[property]));
      } else {
        return this.collator.compare(obj1[property], obj2[property]) * this.sortOrder;
      }
    }
  }

  private sortDate(date1: Date, date2: Date): number {
    if (date1 < date2) {
      return -1 * this.sortOrder;
    } else if (date1 > date2) {
      return 1 * this.sortOrder;
    } else {
      return 0 * this.sortOrder;
    }
  }
}
