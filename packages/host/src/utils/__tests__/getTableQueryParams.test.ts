import { tableQueryParams } from '../getTableQueryParams';

type Order = "asc" | "desc";

describe('tableQueryParams', () => {
  it('should return the correct query params with orderBy and order provided', () => {
    const page = 2;
    const rowsPerPage = 10;
    const order: Order = 'desc';
    const orderBy = 'name';

    const queryParams = tableQueryParams(page, rowsPerPage, order, orderBy);

    expect(queryParams.pageNumber).toBe(page + 1);
    expect(queryParams.pageSize).toBe(rowsPerPage);
    expect(queryParams.sortField).toBe(orderBy);
    expect(queryParams.sortDescending).toBe(true);
  });

  it('should return the correct query params without orderBy and order', () => {
    const page = 1;
    const rowsPerPage = 20;
    const order: Order | null = null;
    const orderBy: string | null = null;

    const queryParams = tableQueryParams(page, rowsPerPage, order, orderBy);

    expect(queryParams.pageNumber).toBe(page + 1);
    expect(queryParams.pageSize).toBe(rowsPerPage);
    expect(queryParams.sortField).toBeUndefined();
    expect(queryParams.sortDescending).toBeUndefined();
  });
});
