"use client"

import { ColumnDef, flexRender, getCoreRowModel, VisibilityState, getSortedRowModel, SortingState, useReactTable, Column } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table.js"
import { useEffect, useState } from "react"
import { useDesignSystem } from "../provider/use-design-system.js"

/** Props of {@link FlexTable}. */
export interface FlexTableProps<TData, TValue> {
  /** TanStack column definitions. */
  columns: ColumnDef<TData, TValue>[]
  /** Ids of columns that should start hidden. */
  hiddenColumns?: string[]
  /** Row data. */
  data: TData[]
  /** Called once with all columns after the table is created. */
  onInitialize?: (table: Column<TData>[]) => void
}

/**
 * Lightweight sortable table built on TanStack Table and the Table primitives.
 * Renders a localized empty row when data is empty.
 *
 * @param props - Columns, data and optional hidden columns / init callback.
 * @returns The rendered table.
 */
export function FlexTable<TData, TValue>({ columns, data, hiddenColumns, onInitialize }: FlexTableProps<TData, TValue>) {
  const { labels } = useDesignSystem()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    data: data ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  })

  useEffect(() => {

    const allColumns = table.getAllColumns();

    allColumns.forEach(c => {
      if (hiddenColumns?.includes(c.id)) {
        c.toggleVisibility(false)
      }
    })

    if (onInitialize) onInitialize(allColumns);
  }, [hiddenColumns, onInitialize, table])

  return (

    <Table className="font-semibold text-muted-foreground">
      <TableHeader>
        {
          table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className={`text-center ${header.column.getCanSort() ? "cursor-pointer hover:bg-muted/50" : ""}`}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))
        }
      </TableHeader>

      <TableBody>
        {
          table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="odd:bg-muted/40 text-sm" data-state={row.getIsSelected() && "selected"}>
                {
                  row.getVisibleCells().map(cell => (
                    <TableCell className="text-center font-medium" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          ) : (
            <TableRow className="odd:bg-muted/40">
              <TableCell colSpan={columns.length} className="text-center font-medium">
                {labels.noResults}
              </TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )

}
