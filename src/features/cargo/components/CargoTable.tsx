"use client";

import { useTranslations } from "next-intl";
import { CargoRow } from "./CargoRow";

import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/shadcn/ui";
import { useCargoList } from "../api";
import { SortValue } from "../types";

const PAGE_SIZE_OPTIONS = [1, 5, 10, 25, 50] as const;

function CargoTableHeader() {
  const t = useTranslations("cargo.table.columns");

  const columns = [
    t("from"),
    t("to"),
    t("price"),
    t("cargo"),
    t("transport"),
    t("buyer"),
    "",
  ] as const;

  return (
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border">
        {columns.map((col, i) => (
          <TableHead
            key={i}
            className="px-4 py-2.5 text-[0.6875rem] font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap border-r border-border last:border-r-0"
          >
            {col}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}

function TablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce<(number | "...")[]>((acc, p, idx, arr) => {
      if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30 flex-wrap gap-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Показывать</span>
        <Select
          value={String(pageSize)}
          onValueChange={(v) => {
            onPageSizeChange(Number(v));
            onPageChange(1);
          }}
        >
          <SelectTrigger className="h-7 w-[65px] text-xs border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>
          {from}–{to} из {total}
        </span>
      </div>

      <Pagination className="w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(page - 1)}
              aria-disabled={page <= 1}
              className={
                page <= 1 ? "pointer-events-none opacity-40" : "cursor-pointer"
              }
            />
          </PaginationItem>

          {pageNumbers.map((p, i) =>
            p === "..." ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === page}
                  onClick={() => onPageChange(p as number)}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(page + 1)}
              aria-disabled={page >= totalPages}
              className={
                page >= totalPages
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export function CargoTable({
  sort,
  page,
  onPageChange,
}: {
  sort: SortValue;
  page: number;
  onPageChange: (page: number) => void;
}) {
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError, refetch } = useCargoList({
    page,
    limit: pageSize,
    sort,
  });

  const total = data?.data.total ?? 0;
  const items = data?.data.items ?? [];

  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Загрузка...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <p className="text-destructive text-sm">Ошибка загрузки данных</p>
          <button
            onClick={() => refetch()}
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <CargoTableHeader />
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-16 text-center text-sm text-muted-foreground"
                >
                  Нет данных для отображения
                </TableCell>
              </TableRow>
            ) : (
              items.map((cargo) => <CargoRow key={cargo.id} cargo={cargo} />)
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={onPageChange}
        onPageSizeChange={(size) => {
          setPageSize(size);
          onPageChange(1);
        }}
      />
    </div>
  );
}
