import React, { useState, useEffect } from 'react';

const MaterialReplenishmentView = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State to hold error message
  const [isTableView, setIsTableView] = useState(true); // State to toggle between views
  
  // Simulating a data fetch from an API
  useEffect(() => {
    if (!data || data.length === 0) {
      // Simulate data fetch failure if data is not passed
      setError('No data available.');
      setIsLoading(false);
    } else {
      // Simulating successful data load
      setIsLoading(false);
    }
  }, [data]);

  // If not in table view, return alternate view
  if (!isTableView) {
    return (
      <div className="p-6 max-w-full">
        <h2 className="text-2xl font-bold mb-6">Alternate View</h2>
        {/* Add alternate view content here */}
        <button
          onClick={() => setIsTableView(true)} // Switch back to table view
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Table View
        </button>
      </div>
    );
  }

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="p-6">
        <h2>Loading data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border rounded">
      <div className="max-h-[600px] overflow-y-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Order Number</th>
              <th className="p-3 text-left">Material Category</th>
              <th className="p-3 text-left">Vendor</th>
              <th className="p-3 text-left">Invitee</th>
              <th className="p-3 text-left">Host/Inviter Contact Information</th>
              <th className="p-3 text-left">Sender</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Supplement Template</th>
              <th className="p-3 text-left">Create Time</th>
              <th className="p-3 text-left">Update Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{row.orderNumber}</td>
                <td className="p-3">{row.materialCategory}</td>
                <td className="p-3">{row.vendor}</td>
                <td className="p-3">{row.invitee}</td>
                <td className="p-3">{row.hostContactInfo}</td>
                <td className="p-3">{row.sender}</td>
                <td className="p-3">{row.status}</td>
                <td className="p-3">{row.supplementTemplate}</td>
                <td className="p-3">{row.createTime}</td>
                <td className="p-3">{row.updateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialReplenishmentView;
