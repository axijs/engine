import {resolveOperand} from '@axi-engine/expressions';
import {InstructionHandler} from '../instruction-handler';
import {CreateVariableInstruction, InstructionName} from '../instructions';
import {InstructionResolverContext} from '../instruction-resolver-context';


export class CreateVariableInstructionHandler implements InstructionHandler<CreateVariableInstruction> {
  name: InstructionName = 'create';

  async process(
    instruction: CreateVariableInstruction,
    context: InstructionResolverContext,
  ): Promise<void> {
    context.storage().create(
      instruction.create.field,
      resolveOperand(instruction.create.var, context.storage())
    );
  }
}
