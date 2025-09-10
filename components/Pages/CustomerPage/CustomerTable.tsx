"use client";

import { useState, useEffect } from 'react';
import Table from '@/components/Common/Table';
import { columns } from './columns';
import { getCustomers } from '@/lib/actions/user.action';

const CustomerTable = () => {
  const [rowData, setRowData] = useState<Customers[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomers = async (page: number = 1, limit: number = 10) => {
    setIsLoading(true);
    try {
      const params = `page=${page}&limit=${limit}`;
      const customers: any = await getCustomers(params);
      
      if (customers?.data) {
        const formattedData: Customers[] = customers.data.map((res: any) => ({
          id: res._id,
          fullname: res.firstName + ' ' + res.lastName,
          contactno: res.contactNo,
          emailaddress: res.email,
          latestreservation: res.latestReservation?.restaurantId?.restaurantName ?? 'N/A',
          createdOn: res.created_at,
        }));
        
        setRowData(formattedData);
        setPagination({
          page: customers.pagination?.page || page,
          limit: customers.pagination?.limit || limit,
          total: customers.pagination?.total || 0,
          totalPages: customers.pagination?.totalPages || 0
        });
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setRowData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handlePageChange = (page: number) => {
    fetchCustomers(page, pagination.limit);
  };

  return (
    <Table 
      columns={columns} 
      rowData={rowData} 
      pagination={pagination}
      isLoading={isLoading}
      onPageChange={handlePageChange}
    />
  );
};

export default CustomerTable;
