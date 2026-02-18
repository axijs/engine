import {isString} from '@axi-engine/utils';
import {resolveOperand} from '@axi-engine/expressions';
import {InstructionHandler} from '../instruction-handler';
import {LogInstruction, InstructionName} from '../instructions';
import {InstructionResolverContext} from '../instruction-resolver-context';

export class LogInstructionHandler implements InstructionHandler<LogInstruction> {
  name: InstructionName = 'log';

  async process(
    instruction: LogInstruction,
    context: InstructionResolverContext,
  ) {
    if (isString(instruction.log)) {
      console.log(instruction.log);
      return;
    }
    const segments = instruction.log.map(segment =>
      isString(segment) ? segment : resolveOperand(segment, context.storage())
    );
    console.log(segments);
  }
}
