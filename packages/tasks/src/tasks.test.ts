import { describe, it, expect } from 'vitest';
import { Tasks } from './tasks';

describe('Tasks.sequence', async () => {
  it('should execute tasks sequentially and resolve with the value of the final task', async () => {
    const sequenceTask = Tasks.sequence<number>([
      Tasks.wait(10),
      Tasks.wait(20),
      Tasks.sync<number>(() => 100)
    ]);

    const result = await sequenceTask.promise;
    expect(result).toBe(100);
  });

  it('should resolve with undefined when the last task returns void', async () => {
    const sequenceTask = Tasks.sequence([
      Tasks.wait(10),
      Tasks.sync<void>(() => {})
    ]);

    const result = await sequenceTask.promise;
    expect(result).toBeUndefined();
  });

  it('should handle an empty sequence and resolve immediately', async () => {
    const sequenceTask = Tasks.sequence([]);
    await expect(sequenceTask.promise).resolves.toBeUndefined();
  });
});
