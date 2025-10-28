"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";

import { IconFilter } from "@/components/Icons";
import Dropdown from "@/components/Elements/Dropdown";
import Button from "@/components/Elements/Button";

const Table = ({
  title,
  columns,
  rowData,
  onButtonClick,
  Filter,
  isLoading,
  pagination,
  onPageChange,
}: any) => {
  const [search, setSearch] = useState("");

  // For server-side pagination, use the data as-is
  // For client-side pagination (when no onPageChange provided), use local pagination
  const [page, setPage] = useState(1);
  const [recordsData, setRecordsData] = useState(rowData);

  useEffect(() => {
    if (!onPageChange) {
      // Client-side pagination
      const pageSize = pagination?.limit || 10;
      const from = (page - 1) * pageSize;
      const to = from + pageSize;
      setRecordsData(rowData.slice(from, to));
    } else {
      // Server-side pagination - use data as provided
      setRecordsData(rowData);
    }
  }, [page, rowData, onPageChange, pagination?.limit]);

  return (
    <div className="panel h-full flex-1">
      <div className="datatables h-full">
        <DataTable
          noRecordsText={
            isLoading ? "Loading..." : "No results match your search query"
          }
          className="whitespace-nowrap h-full"
          minHeight={400}
          records={recordsData}
          columns={columns}
          idAccessor="id"
          totalRecords={pagination?.total}
          recordsPerPage={pagination?.limit}
          page={pagination?.page}
          paginationActiveTextColor="white"
          

          onPageChange={(p) => {
            if (onPageChange) {
              // Server-side pagination
              onPageChange(p);
            } else {
              // Client-side pagination
              setPage(p);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Table;
