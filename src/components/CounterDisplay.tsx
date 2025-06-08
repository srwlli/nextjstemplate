'use client';

import { useCounterStore } from '@/store/counterStore';
import { Button } from '@/components/ui/button';

export default function CounterDisplay() {
  // Select state and actions from the store
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 text-center">
      <h2 className="text-xl font-semibold text-gray-900">Zustand Counter Example</h2>
      <p className="text-5xl font-bold text-blue-600">{count}</p>
      <div className="flex justify-center gap-4">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement} variant="outline">Decrement</Button>
        <Button onClick={reset} variant="destructive">Reset</Button>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        This state is managed globally by Zustand.
      </p>
    </div>
  );
} 