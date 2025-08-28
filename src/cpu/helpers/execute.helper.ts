import { CPU } from '../cpu';
import { IDisassembled } from '../instructions/interfaces/disassembled.interface';
import { InstructionTemplate } from '../instructions/templates/instruction.template';

import CLS from '../instructions/CLS.instruction';
import RET from '../instructions/RET.instruction';
import JP_ADDR from '../instructions/JP_ADDR.instruction';
import CALL_ADDR from '../instructions/CALL_ADDR.instruction';
import SE_VX_NN from '../instructions/SE_VX_NN.instruction';
import SNE_VX_NN from '../instructions/SNE_VX_NN.instruction';
import SE_VX_VY from '../instructions/SE_VX_VY.instruction';
import LD_VX_NN from '../instructions/LD_VX_NN.instruction';
import ADD_VX_NN from '../instructions/ADD_VX_NN.instruction';
import LD_VX_VY from '../instructions/LD_VX_VY.instruction';
import OR_VX_VY from '../instructions/OR_VX_VY.instruction';
import AND_VX_VY from '../instructions/AND_VX_VY.instruction';
import XOR_VX_VY from '../instructions/XOR_VX_VY.instruction';
import ADD_VX_VY from '../instructions/ADD_VX_VY.instruction';
import SUB_VX_VY from '../instructions/SUB_VX_VY.instruction';
import SHR_VX_VY from '../instructions/SHR_VX_VY.instruction';
import SUBN_VX_VY from '../instructions/SUBN_VX_VY.instruction';
import SHL_VX_VY from '../instructions/SHL_VX_VY.instruction';
import SNE_VX_VY from '../instructions/SNE_VX_VY.instruction';
import LD_I_ADDR from '../instructions/LD_I_ADDR.instruction';
import JP_V0_ADDR from '../instructions/JP_V0_ADDR.instruction';
import RND_VX_NN from '../instructions/RND_VX_NN.instruction';
import DRW_VX_VY_N from '../instructions/DRW_VX_VY_N.instruction';
import SKP_VX from '../instructions/SKP_VX.instruction';
import SKNP_VX from '../instructions/SKNP_VX.instruction';
import LD_VX_DT from '../instructions/LD_VX_DT.instruction';
import LD_VX_N from '../instructions/LD_VX_N.instruction';
import LD_DT_VX from '../instructions/LD_DT_VX.instruction';
import LD_ST_VX from '../instructions/LD_ST_VX.instruction';
import ADD_I_VX from '../instructions/ADD_I_VX.instruction';
import LD_F_VX from '../instructions/LD_F_VX.instruction';
import LD_B_VX from '../instructions/LD_B_VX.instruction';
import LD_I_VX from '../instructions/LD_I_VX.instruction';
import LD_VX_I from '../instructions/LD_VX_I.instruction';
import DW from '../instructions/DW.instruction';

export function execute(instruction: IDisassembled, cpu: CPU) {
  const { id, args } = instruction;

  const instructions: any = {
    CLS,
    RET,
    JP_ADDR,
    CALL_ADDR,
    SE_VX_NN,
    SNE_VX_NN,
    SE_VX_VY,
    LD_VX_NN,
    ADD_VX_NN,
    LD_VX_VY,
    OR_VX_VY,
    AND_VX_VY,
    XOR_VX_VY,
    ADD_VX_VY,
    SUB_VX_VY,
    SHR_VX_VY,
    SUBN_VX_VY,
    SHL_VX_VY,
    SNE_VX_VY,
    LD_I_ADDR,
    JP_V0_ADDR,
    RND_VX_NN,
    DRW_VX_VY_N,
    SKP_VX,
    SKNP_VX,
    LD_VX_DT,
    LD_VX_N,
    LD_DT_VX,
    LD_ST_VX,
    ADD_I_VX,
    LD_F_VX,
    LD_B_VX,
    LD_I_VX,
    LD_VX_I,
    DW,
  };

  // Получите соответствующую инструкцию
  const current: InstructionTemplate | undefined = instructions[id];

  // Убедитесь, что инструкция существует перед вызовом
  if (!current) {
    cpu.halted = true;
    throw new Error(`Unknown instruction: ${id}`);
  }

  current.execute(cpu, args);
}
