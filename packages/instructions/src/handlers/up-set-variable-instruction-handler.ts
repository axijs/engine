import {resolveOperand} from '@axi-engine/expressions';
import {InstructionHandler} from '../instruction-handler';
import {InstructionName, UpSetVariableInstruction} from '../instructions';
import {InstructionResolverContext} from '../instruction-resolver-context';

export class UpSetVariableInstructionHandler implements InstructionHandler<UpSetVariableInstruction> {
  name: InstructionName = 'upset';

  async process(
    instruction: UpSetVariableInstruction,
    context: InstructionResolverContext,
  ) {
    context.storage().upset(
      instruction.upset.field,
      resolveOperand(instruction.upset.var, context.storage())
    );
  }
}
