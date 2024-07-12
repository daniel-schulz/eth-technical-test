import {Card} from "./Card";

export class AssessmentRound {
  public startDateTime: Date | null = null;
  public userReactionTimeInMilliseconds: number | null = null;
  public selectedCard: Card | null = null;

  constructor(
    public cards: Card[],
  ) {
  }
}
