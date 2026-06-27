const DashBoardPage = async ({ params }) => {
  const { userRole } = await params;


  return (
    <div className="bg-accent-soft-foreground h-10 text-accent">
      {userRole} active in the dashboard
    </div>
  );
};

export default DashBoardPage;
