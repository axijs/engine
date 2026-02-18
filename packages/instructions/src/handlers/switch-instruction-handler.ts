import {InstructionHandler} from '../instruction-handler';
import {Instruction, InstructionName, SwitchInstruction} from '../instructions';
import {InstructionResolverContext} from '../instruction-resolver-context';
import {isUndefined} from '@axi-engine/utils';
import {resolveOperand} from '@axi-engine/expressions';

export class SwitchInstructionHandler implements InstructionHandler<SwitchInstruction> {
  name: InstructionName = 'switch';

  async process(
    instruction: SwitchInstruction,
    context: InstructionResolverContext,
  ) {
    const res = resolveOperand(instruction.switch.check, context.storage());
    let statements: Instruction[] | undefined;
    for (let caseOption of instruction.switch.cases) {
      const caseOpRes = resolveOperand(caseOption.case, context.storage());
      if (caseOpRes !== res) {
        continue;
      }
      statements = caseOption.do;
      break;
    }
    if (isUndefined(statements) && !isUndefined(instruction.switch.default)) {
      statements = instruction.switch.default;
    }
    if (!isUndefined(statements)) {
      return context.instructions().execute(statements, context);
    }
  }
}
