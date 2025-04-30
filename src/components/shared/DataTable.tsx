"use client";

import { type ReactNode, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Pagination,
  Spinner,
  type SortDescriptor,
} from "@heroui/react";
import { twMerge } from "tailwind-merge";

export type Column<T> = {
  key: string;
  label: string;
  render?: (item: T, key: string) => ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  emptyContent?: ReactNode;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (sortDescriptor: SortDescriptor) => void;
  onSearchChange?: (term: string) => void;
  enableSearch?: boolean;
  searchTerm?: string;
  searchPlaceholder?: string;
  isLoading?: boolean;
  classNames?: {
    wrapper?: string;
    table?: string;
    thead?: string;
    tbody?: string;
    tr?: string;
    th?: string;
    td?: string;
    pagination?: string;
  };
};

export function DataTable<T>({
  data,
  columns,
  rowKey,
  emptyContent = "No data to display",
  page = 1,
  totalPages = 1,
  onPageChange,
  onSearchChange,
  enableSearch = false,
  searchTerm,
  searchPlaceholder = "Search...",
  classNames = {},
  isLoading = false,
}: DataTableProps<T>) {
  const [internalPage, setInternalPage] = useState(page);
  const [internalSearch, setInternalSearch] = useState(searchTerm ?? "");

  useEffect(() => {
    setInternalPage(page);
  }, [page]);

  useEffect(() => {
    if (searchTerm !== undefined) {
      setInternalSearch(searchTerm);
    }
  }, [searchTerm]);

  const handlePageChange = (newPage: number) => {
    setInternalPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleSearchChange = (value: string) => {
    setInternalSearch(value);
    onSearchChange?.(value);
    if (!onPageChange) {
      setInternalPage(1);
    }
  };

  const currentPage = onPageChange ? page : internalPage;

  return (
    <Card className={twMerge('w-full',classNames.wrapper)}>
      <CardBody className="p-0 overflow-hidden">
        {enableSearch && (
          <div className="p-4">
            <input
              type="text"
              value={internalSearch}
              placeholder={searchPlaceholder}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full border px-3 py-2 rounded-md shadow-sm"
            />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className={`w-full ${classNames.table || ""}`}>
            <thead className={`bg-default-50 ${classNames.thead || ""}`}>
              <tr className={classNames.tr || ""}>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`py-3 px-4 text-left ${classNames.th || ""}`}
                  >
                    <div className="flex items-center gap-1">
                      {column.label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan={999} className="w-full text-center py-4">
                    <Spinner />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className={classNames.tbody || ""}>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="text-center py-6 text-gray-500"
                    >
                      {emptyContent}
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr
                      key={String(item[rowKey])}
                      className={`border-b border-default-100 transition-opacity duration-500 opacity-0 animate-fade-in ${
                        classNames.tr || ""
                      }`}
                    >
                      {columns.map((column) => (
                        <td
                          key={`${String(item[rowKey])}-${column.key}`}
                          className={`py-4 px-4 ${classNames.td || ""}`}
                        >
                          {column.render
                            ? column.render(item, column.key)
                            : (item as any)[column.key] !== undefined
                            ? String((item as any)[column.key])
                            : ""}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>

        {totalPages > 1 && (
          <div
            className={`flex w-full justify-center py-4 ${
              classNames.pagination || ""
            }`}
          >
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={currentPage}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        )}
      </CardBody>
    </Card>
  );
}
