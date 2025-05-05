export interface ApiResponse<T> {
    Error: null | string;
    Result: T;
    SuccessMessage: null | string;
}
