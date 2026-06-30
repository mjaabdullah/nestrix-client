const DashBoardPage = async ({ params }) => {
  const { userRole } = await params;

  return (
    <>
      {/* {userRole === "tenant" ? <TenantOverview /> : <h1> Owner Dashboard </h1>} */}
      <h1> {`${userRole} Dashboard`} </h1>
    </>
  );
};

export default DashBoardPage;
