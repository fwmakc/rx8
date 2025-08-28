import { IInstruction } from '../interfaces/instruction.interface';
import CLS from '../CLS.instruction';
import RET from '../RET.instruction';
import JP_ADDR from '../JP_ADDR.instruction';
import CALL_ADDR from '../CALL_ADDR.instruction';
import SE_VX_NN from '../SE_VX_NN.instruction';
import SNE_VX_NN from '../SNE_VX_NN.instruction';
import SE_VX_VY from '../SE_VX_VY.instruction';
import LD_VX_NN from '../LD_VX_NN.instruction';
import ADD_VX_NN from '../ADD_VX_NN.instruction';
import LD_VX_VY from '../LD_VX_VY.instruction';
import OR_VX_VY from '../OR_VX_VY.instruction';
import AND_VX_VY from '../AND_VX_VY.instruction';
import XOR_VX_VY from '../XOR_VX_VY.instruction';
import ADD_VX_VY from '../ADD_VX_VY.instruction';
import SUB_VX_VY from '../SUB_VX_VY.instruction';
import SHR_VX_VY from '../SHR_VX_VY.instruction';
import SUBN_VX_VY from '../SUBN_VX_VY.instruction';
import SHL_VX_VY from '../SHL_VX_VY.instruction';
import SNE_VX_VY from '../SNE_VX_VY.instruction';
import LD_I_ADDR from '../LD_I_ADDR.instruction';
import JP_V0_ADDR from '../JP_V0_ADDR.instruction';
import RND_VX_NN from '../RND_VX_NN.instruction';
import DRW_VX_VY_N from '../DRW_VX_VY_N.instruction';
import SKP_VX from '../SKP_VX.instruction';
import SKNP_VX from '../SKNP_VX.instruction';
import LD_VX_DT from '../LD_VX_DT.instruction';
import LD_VX_N from '../LD_VX_N.instruction';
import LD_DT_VX from '../LD_DT_VX.instruction';
import LD_ST_VX from '../LD_ST_VX.instruction';
import ADD_I_VX from '../ADD_I_VX.instruction';
import LD_F_VX from '../LD_F_VX.instruction';
import LD_B_VX from '../LD_B_VX.instruction';
import LD_I_VX from '../LD_I_VX.instruction';
import LD_VX_I from '../LD_VX_I.instruction';
import DW from '../DW.instruction';

export const instructions: IInstruction[] = [
  CLS.get(),
  RET.get(),
  JP_ADDR.get(),
  CALL_ADDR.get(),
  SE_VX_NN.get(),
  SNE_VX_NN.get(),
  SE_VX_VY.get(),
  LD_VX_NN.get(),
  ADD_VX_NN.get(),
  LD_VX_VY.get(),
  OR_VX_VY.get(),
  AND_VX_VY.get(),
  XOR_VX_VY.get(),
  ADD_VX_VY.get(),
  SUB_VX_VY.get(),
  SHR_VX_VY.get(),
  SUBN_VX_VY.get(),
  SHL_VX_VY.get(),
  SNE_VX_VY.get(),
  LD_I_ADDR.get(),
  JP_V0_ADDR.get(),
  RND_VX_NN.get(),
  DRW_VX_VY_N.get(),
  SKP_VX.get(),
  SKNP_VX.get(),
  LD_VX_DT.get(),
  LD_VX_N.get(),
  LD_DT_VX.get(),
  LD_ST_VX.get(),
  ADD_I_VX.get(),
  LD_F_VX.get(),
  LD_B_VX.get(),
  LD_I_VX.get(),
  LD_VX_I.get(),
  DW.get(),
];
