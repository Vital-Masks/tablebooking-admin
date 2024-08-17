import UserRoleForm from '@/components/Pages/RestaurantPage/UserRole/UserRoleForm';
import UserRoleTable from '@/components/Pages/RestaurantPage/UserRole/UserRoleTable';

const UserRolePage = ({params}: any) => {
  return (
    <div>
      <UserRoleTable params={params} />
      <UserRoleForm params={params} />
    </div>
  )
};

export default UserRolePage;
