import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import UserTable from "./UserTable";
import { Button } from "components/button";

const UserManage = () => {
  
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      >
        <Button kind="ghost" height="55px" to="/manage/add-user">
          Add new user
        </Button>
      </DashboardHeading>
      
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;