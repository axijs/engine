import {Tasks} from '@axi-engine/tasks';
import {randInt} from '@axi-engine/utils';

export async function testTasks() {
  const sequenceTask1 = Tasks.sequence<number>([
    Tasks.wait(100),
    Tasks.wait(300),
    Tasks.sync<number>((): number => 100)
  ]);

  const res = await sequenceTask1.promise;
  console.log('sequence res:', res);

  const sequenceTask2 = Tasks.sequence<number | void>([
    Tasks.wait(100),
    Tasks.wait(200),
    Tasks.sync<number | void>(()  => {
      if (randInt(0, 2) === 1) {
        return 100
      }
    })
  ]);

  const seq2res = await sequenceTask2.promise;
  console.log('sequence 2 res: ', seq2res);
}
