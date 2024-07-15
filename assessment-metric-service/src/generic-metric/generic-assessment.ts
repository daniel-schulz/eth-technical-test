export class GenericAssessmentDoc<T = any> {
  public assessmentId: string;
  public userId: string;
  public metric: T;
}
