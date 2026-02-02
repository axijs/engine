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
    Tasks.sync<number | void>(() => {
      if (randInt(0, 2) === 1) {
        return 100
      }
    })
  ]);

  const seq2res = await sequenceTask2.promise;
  console.log('sequence 2 res: ', seq2res);

  const controllable1 = Tasks.controllable();
  const controllable2 = Tasks.controllable();

  setTimeout(() => {
    console.log('controllable1: resolve after 1sec')
    controllable1.controller.resolve(undefined)
  }, 1000);

  setTimeout(() => {
    console.log('controllable2: resolve after 2sec')
    controllable2.controller.resolve(undefined)
  }, 2000);

  const sequenceTask3 = Tasks.sequence<void>([
    controllable1.task,
    Tasks.sync(() => {
      console.log('Tasks.sync')
    }),
    controllable2.task
  ]);

  await sequenceTask3.promise;
}
