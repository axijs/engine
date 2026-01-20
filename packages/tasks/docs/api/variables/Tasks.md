[**@axi-engine/tasks**](../README.md)

***

[@axi-engine/tasks](../README.md) / Tasks

# Variable: Tasks

> `const` **Tasks**: `object`

Defined in: tasks.ts:20

A utility object that provides factory methods for creating and composing asynchronous tasks.
These tasks are enhanced Promises that can be forcibly completed, making them ideal for
scripting animations, cutscenes, or any sequential logic that needs to be skippable.

## Type Declaration

### controllable()

> **controllable**\<`T`\>(): `object`

#### Type Parameters

##### T

`T`

The type of the value the promise will resolve with.

#### Returns

`object`

An object containing the task and a controller to manage its state.

##### controller

> **controller**: `object`

###### controller.reject()

> **reject**: (`reason?`) => `void`

###### Parameters

###### reason?

`any`

###### Returns

`void`

###### controller.resolve()

> **resolve**: (`value`) => `void`

###### Parameters

###### value

`T`

###### Returns

`void`

##### task

> **task**: [`CompletableTask`](../interfaces/CompletableTask.md)\<`T`\>

#### Description

Creates a task with externally accessible `resolve` and `reject` functions.
This is useful for tasks that are completed by external events (e.g., user input or a server response).

### fromPromise()

> **fromPromise**\<`T`\>(`promise`): [`CompletableTask`](../interfaces/CompletableTask.md)\<`T`\>

#### Type Parameters

##### T

`T`

The type of the promise's resolved value.

#### Parameters

##### promise

`Promise`\<`T`\>

The promise to wrap.

#### Returns

[`CompletableTask`](../interfaces/CompletableTask.md)\<`T`\>

A task wrapping the promise.

#### Description

Wraps a standard Promise into a `CompletableTask`.
The `complete` method is a no-op, as a native promise cannot be externally completed.

### parallel()

> **parallel**(`tasks`): [`CompletableTask`](../interfaces/CompletableTask.md)

#### Parameters

##### tasks

[`CompletableTask`](../interfaces/CompletableTask.md)\<`any`\>[]

An array of tasks to run in parallel.

#### Returns

[`CompletableTask`](../interfaces/CompletableTask.md)

A new task that manages the parallel execution.

#### Description

Creates a task that runs multiple tasks concurrently.
The parent task completes when all child tasks have completed.
Calling `complete` on the parent task will call `complete` on all its children.

### resolved()

> **resolved**(): [`CompletableTask`](../interfaces/CompletableTask.md)

#### Returns

[`CompletableTask`](../interfaces/CompletableTask.md)

A task that is already complete.

#### Description

Returns a pre-resolved, completed task. Useful as a synchronous no-op.

### sequence()

> **sequence**\<`T`\>(`tasks`): [`CompletableTask`](../interfaces/CompletableTask.md)\<`T`\>

#### Type Parameters

##### T

`T` = `void`

The return type of the optional result task. Defaults to `void`.

#### Parameters

##### tasks

An array of tasks to run in sequence.

[`CompletableTask`](../interfaces/CompletableTask.md)\<`any`\>[] | \[`...CompletableTask<any>[]`, [`CompletableTask`](../interfaces/CompletableTask.md)\<`T`\>\]

#### Returns

[`CompletableTask`](../interfaces/CompletableTask.md)\<`T`\>

A new task that manages the sequential execution.
It resolves with the result of `resTask` if provided, otherwise with `void`.

#### Description

Creates a task that runs a sequence of tasks one after another.
Calling `complete` on the sequence will fast-forward it to its final state.

### sync()

> **sync**\<`T`\>(`syncFunction`): [`CompletableTask`](../interfaces/CompletableTask.md)\<`T`\>

#### Type Parameters

##### T

`T`

The return type of the synchronous function.

#### Parameters

##### syncFunction

() => `T`

The synchronous function to execute.

#### Returns

[`CompletableTask`](../interfaces/CompletableTask.md)\<`T`\>

A task that resolves with the function's return value.

#### Description

Wraps a synchronous function in a task. If the function throws an error, the task's promise will be rejected.

### wait()

> **wait**(`duration`): [`AsyncTask`](../interfaces/AsyncTask.md)\<`void`\>

#### Parameters

##### duration

`number`

The time to wait in milliseconds.

#### Returns

[`AsyncTask`](../interfaces/AsyncTask.md)\<`void`\>

A controllable task that resolves after the duration.

#### Description

Creates a task that waits for a specified duration. This task can be completed or canceled.
