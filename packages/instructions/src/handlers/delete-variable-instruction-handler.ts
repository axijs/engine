import {InstructionHandler} from '../instruction-handler';
import {InstructionResolverContext} from '../instruction-resolver-context';
import {DeleteVariableInstruction, InstructionName} from '../instructions';

export class DeleteVariableInstructionHandler implements InstructionHandler<DeleteVariableInstruction> {
  name: InstructionName = 'delete';

  async process(
    instruction: DeleteVariableInstruction,
    context: InstructionResolverContext,
  ) {
    context.storage().delete(instruction.delete);
  }
}
