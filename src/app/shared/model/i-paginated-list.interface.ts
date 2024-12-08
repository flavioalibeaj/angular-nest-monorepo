export interface IPaginatedList<T = unknown> {
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
