import { WatchedList } from './watched-list';

class NumberWatchedList extends WatchedList<number> {
  public compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe('WatchedList', () => {
  it('should be able to create a watched list with initial items', () => {
    const watchedList = new NumberWatchedList([1, 2, 3]);

    expect(watchedList.getItems()).toEqual([1, 2, 3]);
  });

  it('should be able to add an item', () => {
    const watchedList = new NumberWatchedList();

    watchedList.add(1);

    expect(watchedList.getItems()).toEqual([1]);
  });

  it('should be able to remove an item', () => {
    const watchedList = new NumberWatchedList([1, 2, 3]);

    watchedList.remove(2);

    expect(watchedList.getItems()).toEqual([1, 3]);
  });

  it('should be able to update items', () => {
    const watchedList = new NumberWatchedList([1, 2, 3]);

    watchedList.update([1, 3, 4]);

    expect(watchedList.getItems()).toEqual([1, 3, 4]);
    expect(watchedList.getNewItems()).toEqual([4]);
    expect(watchedList.getRemovedItems()).toEqual([2]);
  });

  it('should be able to check if an item exists', () => {
    const watchedList = new NumberWatchedList([1, 2, 3]);

    expect(watchedList.exists(1)).toBeTruthy();
    expect(watchedList.exists(4)).toBeFalsy();
  });

  it('should be able to add an item and remove it', () => {
    const watchedList = new NumberWatchedList();

    watchedList.add(1);
    watchedList.remove(1);

    expect(watchedList.getItems()).toEqual([]);
  });

  it('should be able to add an item even if it was removed before', () => {
    const watchedList = new NumberWatchedList([1, 2, 3]);

    watchedList.add(4);
    watchedList.remove(4);

    expect(watchedList.currentItems).toHaveLength(3);

    expect(watchedList.getRemovedItems()).toEqual([]);
    expect(watchedList.getNewItems()).toEqual([]);
  });
});
