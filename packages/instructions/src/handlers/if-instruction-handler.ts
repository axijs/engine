import {InstructionHandler} from '../instruction-handler';
import {IfInstruction, InstructionName} from '../instructions';
import {InstructionResolverContext} from '../instruction-resolver-context';
import {isNullOrUndefined} from '@axijs/ensure'

export class IfInstructionHandler implements InstructionHandler<IfInstruction> {
  name: InstructionName = 'if';

  async process(
    instruction: IfInstruction,
    context: InstructionResolverContext,
  ) {
    const condition = await context.expressions().resolve(instruction.if.condition, context.storage());
    if (condition) {
      return context.instructions().execute(instruction.if.then, context);
    } else if (!isNullOrUndefined(instruction.if.else)) {
      return context.instructions().execute(instruction.if.else, context);
    }
  }
}
