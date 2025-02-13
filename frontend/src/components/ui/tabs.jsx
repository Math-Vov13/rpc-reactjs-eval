const Tabs = ({ children, className = "" }) => {
    return <div className={`w-full ${className}`}>{children}</div>;
  };
  
  const TabsList = ({ children, className = "" }) => {
    return (
      <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>
        {children}
      </div>
    );
  };
  
  const TabsTrigger = ({ children, value, className = "", ...props }) => {
    return (
      <button
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  const TabsContent = ({ children, value, className = "" }) => {
    return <div className={`mt-2 ring-offset-background ${className}`}>{children}</div>;
  };
  
  export { Tabs, TabsList, TabsTrigger, TabsContent };