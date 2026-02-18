import {resolveOperand} from '@axi-engine/expressions';
import {InstructionHandler} from '../instruction-handler';
import {SetVariableInstruction, InstructionName} from '../instructions';
import {InstructionResolverContext} from '../instruction-resolver-context';


export class SetVariableInstructionHandler implements InstructionHandler<SetVariableInstruction> {
  name: InstructionName = 'set';

  async process(
    instruction: SetVariableInstruction,
    context: InstructionResolverContext,
  ) {
    context.storage().set(
      instruction.set.field,
      resolveOperand(instruction.set.var, context.storage())
    );
  }
}
