import {resolveOperand} from '@axi-engine/expressions';
import {InstructionHandler} from '../instruction-handler';
import {InstructionName, UpSertVariableInstruction} from '../instructions';
import {InstructionResolverContext} from '../instruction-resolver-context';

export class UpSertVariableInstructionHandler implements InstructionHandler<UpSertVariableInstruction> {
  name: InstructionName = 'upsert';

  async process(
    instruction: UpSertVariableInstruction,
    context: InstructionResolverContext,
  ) {
    context.storage().upsert(
      instruction.upsert.field,
      resolveOperand(instruction.upsert.var, context.storage())
    );
  }
}
