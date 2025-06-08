import { useCounterStore } from '../counterStore';
import { act } from 'react';

describe('useCounterStore', () => {
  beforeEach(() => {
    act(() => {
      useCounterStore.getState().reset();
    });
  });

  it('should return the initial state', () => {
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('should increment the count', () => {
    act(() => {
      useCounterStore.getState().increment();
    });
    expect(useCounterStore.getState().count).toBe(1);
  });

  it('should decrement the count', () => {
    act(() => {
      useCounterStore.getState().decrement();
    });
    expect(useCounterStore.getState().count).toBe(-1);
  });

  it('should reset the count', () => {
    act(() => {
      useCounterStore.getState().increment(); // Count becomes 1
      useCounterStore.getState().increment(); // Count becomes 2
      useCounterStore.getState().reset();     // Count becomes 0
    });
    expect(useCounterStore.getState().count).toBe(0);
  });
}); 