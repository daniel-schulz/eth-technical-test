export const IGenericMetricRepositoryAdapterSymbol = Symbol("IRepository");

export interface IGenericMetricRepository<T> {
  create(assessmentId: string, userId: string, metric: T): Promise<T>;
  find(assessmentId: string, userId: string): Promise<T>;
}
