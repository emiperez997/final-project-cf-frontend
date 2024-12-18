import { useEffect, useState } from "react";
import { Title } from "../../../components/common/Title";
import UserTable from "../components/UserTable";
import { UserApi } from "../../../api/users.api";
import { User, UserAPI } from "../../users/types";
import { useAppStore } from "../../../store/useAppStore";

export function DashboardPage() {
  const user = useAppStore((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const respose = await UserApi.getUsers();

      const usersFilter = respose.data.filter((userApi: UserAPI) => {
        if (userApi.id !== user?.id) {
          return userApi;
        }
      });

      const users: User[] = usersFilter.map((userApi: UserAPI) => {
        return {
          id: userApi.id,
          username: userApi.username,
          email: userApi.email,
          fullName: userApi.full_name,
          role: userApi.role,
        };
      });

      console.log(users);

      setUsers(users);
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <Title title="Dashboard" />

      {users.length > 0 ? <UserTable users={users} /> : <p>Loading...</p>}
    </div>
  );
}
