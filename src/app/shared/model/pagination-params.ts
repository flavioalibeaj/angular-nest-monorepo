export class PaginationParams {
  constructor(
    public pageNumber: number = 1,
    public pageSize: number = 10,
    public pageIndex: number = 0,
    public totalCount: number = 0
  ) {}
}
