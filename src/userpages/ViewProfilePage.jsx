import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ViewProfileLayer from "../components/ViewProfileLayer";


const ViewProfilePage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        <ViewProfileLayer />

      </MasterLayout>

    </>
  );
};

export default ViewProfilePage; 
