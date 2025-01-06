import React, { useState, useEffect } from 'react';
import './index.css';

const CustomerOrderView = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTableView, setIsTableView] = useState(true); // State to toggle views

  useEffect(() => {
    // Simulating data fetch from an API
    fetch('/api/suppliers') // Replace with your actual API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Unable to load supplier data. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  if (!isTableView) {
    return (
      <div className="p-6 max-w-full">
        <h2 className="text-2xl font-bold mb-6">Alternate View</h2>
        {/* Add alternate view content here */}
        <button
          onClick={() => setIsTableView(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Table View
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full">
      <h2 className="text-2xl font-bold mb-6">Customer Order View</h2>

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto border rounded">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full min-w-[1200px] border-collapse border-spacing-0">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Platform No</th>
                  <th className="p-3 text-left">PO No</th>
                  <th className="p-3 text-left">Purchase Date</th>
                  <th className="p-3 text-left">Order Amount</th>
                  <th className="p-3 text-left">Currency</th>
                  <th className="p-3 text-left">Purchasing Department</th>
                  <th className="p-3 text-left">Purchaser</th>
                  <th className="p-3 text-left">Delivery Status</th>
                  <th className="p-3 text-left">Order Status</th>
                  <th className="p-3 text-left">Acceptance Status</th>
                  <th className="p-3 text-left">Statement Status</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((row, index) => (
                    <tr key={row.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{row.customer}</td>
                      <td className="p-3">{row.platformNo}</td>
                      <td className="p-3">{row.poNo}</td>
                      <td className="p-3">{row.purchaseDate}</td>
                      <td className="p-3">{row.orderAmount}</td>
                      <td className="p-3">{row.currency}</td>
                      <td className="p-3">{row.purchasingDepartment}</td>
                      <td className="p-3">{row.purchaser}</td>
                      <td className="p-3">{row.deliveryStatus}</td>
                      <td className="p-3">{row.orderStatus}</td>
                      <td className="p-3">{row.acceptanceStatus}</td>
                      <td className="p-3">{row.statementStatus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="p-3 text-center">
                      No customer orders available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrderView;
