import { BLOGS, IBlogMeta } from "@root/host/src/constants/blogConstants";
import React from "react";

interface PaginationState {
    entries: IBlogMeta[];
    page: number;
}

interface Return {
    hasNextPage: boolean;
    paginatedEntries: IBlogMeta[];

    next: () => void;
}

const BLOGS_PER_PAGE = 6;

export const useBlogsPagination = (): Return => {
    const getNextEndIndex = (nextPage: number) => {
        let nextEndIndex = nextPage * BLOGS_PER_PAGE;
        if (nextEndIndex <= BLOGS.length) return nextEndIndex;
        else return BLOGS.length;
    };

    const getNextSlice = (page: number): IBlogMeta[] =>
        BLOGS.slice(page * BLOGS_PER_PAGE, getNextEndIndex(page + 1));

    const [pagination, setPagination] = React.useState<PaginationState>({
        entries: getNextSlice(0),
        page: 1,
    });

    const next = (): void =>
        setPagination((prev) => ({
            entries: [...prev.entries, ...getNextSlice(prev.page)],
            page: prev.page + 1,
        }));

    return {
        hasNextPage: pagination.page * BLOGS_PER_PAGE <= BLOGS.length,
        paginatedEntries: pagination.entries,

        next,
    };
};
