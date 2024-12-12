export class PaginationParams {
  constructor(
    public pageSize: number = 10,
    public pageIndex: number = 0,
    public totalCount: number = 0
  ) {}
}
