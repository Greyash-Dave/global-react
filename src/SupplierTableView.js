import React, { useEffect, useState } from 'react';
import './index.css';

const SupplierTableView = () => {
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
      <h2 className="text-2xl font-bold mb-6">Supplier Table View</h2>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full min-w-[1200px] border-collapse border-spacing-0">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Order Number</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Classification</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Document Status</th>
                <th className="p-3 text-left">Abnormal Info</th>
                <th className="p-3 text-left">Invitee</th>
                <th className="p-3 text-left">Re-auth Person</th>
                <th className="p-3 text-left">Contact Info</th>
                <th className="p-3 text-left">Invitation Date</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="11" className="p-3 text-center">
                    Loading supplier data...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="11" className="p-3 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={row.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{row.orderNumber}</td>
                    <td className="p-3">{row.customer}</td>
                    <td className="p-3">{row.classification}</td>
                    <td className="p-3">{row.status}</td>
                    <td className="p-3">{row.documentStatus}</td>
                    <td className="p-3">{row.abnormalInfo}</td>
                    <td className="p-3">{row.invitee}</td>
                    <td className="p-3">{row.reAuthPerson}</td>
                    <td className="p-3">{row.contactInfo}</td>
                    <td className="p-3">{row.invitationDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="p-3 text-center">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => setIsTableView(false)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Alternate View
      </button>
    </div>
  );
};

export default SupplierTableView;
