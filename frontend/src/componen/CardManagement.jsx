
const Card = ({ children, className = '' }) => {
    return (
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
        {children}
      </div>
    );
  };
  
  const CardHeader = ({ children, className = '' }) => {
    return (
      <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
        {children}
      </div>
    );
  };
  
  const CardTitle = ({ children, className = '' }) => {
    return (
      <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
        {children}
      </h3>
    );
  };
  
  const CardContent = ({ children, className = '' }) => {
    return (
      <div className={`px-6 py-4 ${className}`}>
        {children}
      </div>
    );
  };
  
  // Tabs Components
  const Tabs = ({ children, defaultValue, className = '' }) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue);
  
    return (
      <div className={`w-full ${className}`} data-active-tab={activeTab}>
        {React.Children.map(children, child => {
          if (!child) return null;
          return React.cloneElement(child, { activeTab, setActiveTab });
        })}
      </div>
    );
  };
  
  const TabsList = ({ children, className = '' }) => {
    return (
      <div className={`flex space-x-1 border-b border-gray-200 ${className}`}>
        {children}
      </div>
    );
  };
  
  const TabsTrigger = ({ value, children, activeTab, setActiveTab, className = '' }) => {
    const isActive = activeTab === value;
    
    return (
      <button
        className={`px-4 py-2 text-sm font-medium rounded-t-lg
          ${isActive 
            ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'} 
          ${className}`}
        onClick={() => setActiveTab(value)}
      >
        {children}
      </button>
    );
  };
  
  const TabsContent = ({ value, children, activeTab, className = '' }) => {
    if (value !== activeTab) return null;
    
    return (
      <div className={`mt-4 ${className}`}>
        {children}
      </div>
    );
  };
  
  export {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
  };