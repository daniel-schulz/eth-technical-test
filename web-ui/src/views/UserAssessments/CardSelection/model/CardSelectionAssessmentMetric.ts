import {GenericAssessmentMetric} from "./GenericAssessmentMetric";
import {AssessmentRound} from "./AssessmentRound";

export class CardSelectionAssessmentMetric extends GenericAssessmentMetric {
  constructor(
    userId: string,
    public rounds: AssessmentRound[],
  ) {
    super("card-selection", userId);
  }
}
