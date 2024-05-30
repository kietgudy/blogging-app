import React from "react";

const DashboardHeading = ({ title = "", children }) => {
  return (
    <div className="flex items-start justify-between">
    <div>
      <h1 className="dashboard-heading">{title}</h1>
    </div>
    {children}
    </div>
  );
};

export default DashboardHeading;