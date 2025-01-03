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
}: any) => {
  const pageSize = 10;
  const initialRecords = rowData.slice(0, pageSize);
  const [page, setPage] = useState(1);
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData(rowData.slice(from, to));
  }, [page, rowData]);

  return (
    <div className="panel h-full flex-1">
      {title && <p className="mb-2 font-semibold">{title}</p>}
      <div className="flex flex-col justify-between flex-wrap gap-5 mb-5 md:flex-row md:items-center">
        <div className="flex gap-5">
          <div className="dropdown">
            <Dropdown
              placement="bottom-start"
              btnClassName="btn btn-primary dropdown-toggle shadow-none"
              button={
                <>
                  <span>
                    <IconFilter className="mr-2 inline-block w-4 h-4" />
                  </span>
                  <span>Filter</span>
                </>
              }
            >
              {Filter && <Filter />}
            </Dropdown>
          </div>
          <div>
            <input
              type="text"
              className="w-auto form-input"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {onButtonClick && (
          <div className="shrink-0">
            <Button type="filled" onClick={() => onButtonClick()}>
              + Create new
            </Button>
          </div>
        )}
      </div>
      <div className="datatables h-full">
        <DataTable
          noRecordsText={
            isLoading ? "Loading..." : "No results match your search query"
          }
          className="whitespace-nowrap h-full"
          minHeight={400}
          records={recordsData}
          columns={columns}
          totalRecords={rowData.length}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default Table;
