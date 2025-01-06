import React, { useState, useEffect } from 'react';

const CustomerDeliveryNoticeView = () => {
  const [data, setData] = useState([]); // Data state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isTableView, setIsTableView] = useState(true); // Toggle view state

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('http://localhost:5000/api/suppliers') // Replace with your actual backend URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((fetchedData) => {
        setData(fetchedData); // Set the fetched data into state
        setIsLoading(false); // Set loading to false
      })
      .catch((error) => {
        setError('Unable to load data. Please try again later.'); // Handle errors
        setIsLoading(false); // Set loading to false
      });
  }, []);

  // Show loading indicator if data is still being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show error message if an error occurred while fetching data
  if (error) {
    return <div>{error}</div>;
  }

  // Render the table if in table view
  if (isTableView) {
    return (
      <div className="overflow-x-auto border rounded">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Delivery Notice No</th>
                <th className="p-3 text-left">Start Time</th>
                <th className="p-3 text-left">End Time</th>
                <th className="p-3 text-left">Creator</th>
                <th className="p-3 text-left">Urgent Material</th>
                <th className="p-3 text-left">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{row.customer}</td>
                  <td className="p-3">{row.deliveryNoticeNo}</td>
                  <td className="p-3">{row.startTime}</td>
                  <td className="p-3">{row.endTime}</td>
                  <td className="p-3">{row.creator}</td>
                  <td className="p-3">{row.urgentMaterial}</td>
                  <td className="p-3">{row.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Return alternate view (you can customize this section)
  return (
    <div className="p-6 max-w-full">
      <h2 className="text-2xl font-bold mb-6">Alternate View</h2>
      <button
        onClick={() => setIsTableView(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Table View
      </button>
    </div>
  );
};

export default CustomerDeliveryNoticeView;
