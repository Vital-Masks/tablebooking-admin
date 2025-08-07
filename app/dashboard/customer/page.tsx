import CustomerHeader from '@/components/Pages/CustomerPage/CustomerHeader';
import CustomerTable from '@/components/Pages/CustomerPage/CustomerTable';

export const dynamic = 'force-dynamic';

export default function CustomerPage() {
  return (
    <main>
      <CustomerHeader />
      <CustomerTable />
    </main>
  );
}
