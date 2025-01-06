import React, { useState } from 'react';
import './index.css';
import CustomerDeliveryNoticeView from './CustomerDeliveryNoticeView'; // Import the view component

const CustomerDeliveryNotice = () => {
  const [data, setData] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [searchAll, setSearchAll] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newRow, setNewRow] = useState(null);
  const [viewMode, setViewMode] = useState(false); // State to toggle between table and view mode

  const emptyRow = {
    id: Date.now(),
    customer: '',
    deliveryNoticeNo: '',
    startTime: '',
    endTime: '',
    creator: '',
    urgentMaterial: '',
    orderStatus: '',
    isNew: true
  };

  const handleAddRow = () => {
    if (!newRow) {
      const newEmptyRow = { ...emptyRow }; // Create a new empty row
      setNewRow(newEmptyRow);
      setData([newEmptyRow, ...data]);
      setEditingId(newEmptyRow.id); // Automatically enter edit mode for the new row
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id) => {
    setEditingId(null);
    setNewRow(null);
    setData(data.map(row => {
      if (row.id === id) {
        return { ...row, isNew: false };
      }
      return row;
    }));
  };

  const handleInputChange = (id, field, value) => {
    setData(data.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  const handleClear = () => {
    setSearchCustomer('');
    setSearchAll('');
  };

  const filteredData = data.filter(row => {
    const matchesCustomer = row.customer.toLowerCase().includes(searchCustomer.toLowerCase());
    const matchesAll = Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchAll.toLowerCase())
    );
    return matchesCustomer && matchesAll;
  });

  return (
    <div className="p-6 max-w-full">
      <h2 className="text-2xl font-bold mb-6">Customer Delivery Notice</h2>
      
      {/* Search Section */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by Customer"
            value={searchCustomer}
            onChange={(e) => setSearchCustomer(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search all"
            value={searchAll}
            onChange={(e) => setSearchAll(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear
        </button>
        <button
          onClick={handleAddRow}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={newRow !== null}
        >
          Add Row
        </button>
        <button
          onClick={() => setViewMode(!viewMode)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {viewMode ? 'Back to Table View' : 'Switch to View Mode'}
        </button>
      </div>

      {/* Conditionally Render the CustomerDeliveryNoticeView */}
      {viewMode ? (
        <CustomerDeliveryNoticeView data={filteredData} /> // Pass filtered data to CustomerDeliveryNoticeView
      ) : (
        // Table View
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
                  <th className="p-3 text-left">Operations</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={row.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="text"
                          value={row.customer}
                          onChange={(e) => handleInputChange(row.id, 'customer', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.customer}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="text"
                          value={row.deliveryNoticeNo}
                          onChange={(e) => handleInputChange(row.id, 'deliveryNoticeNo', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.deliveryNoticeNo}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="datetime-local"
                          value={row.startTime}
                          onChange={(e) => handleInputChange(row.id, 'startTime', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.startTime}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="datetime-local"
                          value={row.endTime}
                          onChange={(e) => handleInputChange(row.id, 'endTime', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.endTime}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="text"
                          value={row.creator}
                          onChange={(e) => handleInputChange(row.id, 'creator', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.creator}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="text"
                          value={row.urgentMaterial}
                          onChange={(e) => handleInputChange(row.id, 'urgentMaterial', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.urgentMaterial}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <select
                          value={row.orderStatus}
                          onChange={(e) => handleInputChange(row.id, 'orderStatus', e.target.value)}
                          className="border p-1 w-full"
                        >
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Completed">Completed</option>
                        </select>
                      ) : row.orderStatus}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        {editingId === row.id ? (
                          <button
                            onClick={() => handleSave(row.id)}
                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            title="Save"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(row.id)}
                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            title="Edit"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDeliveryNotice;
