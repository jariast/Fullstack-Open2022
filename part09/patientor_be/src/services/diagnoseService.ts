import { diagnoses } from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export const diagnoseService = {
  getDiagnoses,
};
/* In the course they export the functions using a default obejct like:
 export default{
    getDiagnoses
 }
The issue with that approach is that in the consuming file Intellisense can't
tell you exactly what's in the service
*/
