import React, { useState } from 'react';
import './index.css';
import SupplierTableView from './SupplierTableView'; // Import SupplierTableView

const SupplierTable = () => {
  const [data, setData] = useState([]);
  const [searchClassification, setSearchClassification] = useState('');
  const [searchAll, setSearchAll] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newRow, setNewRow] = useState(null);
  const [viewMode, setViewMode] = useState(false); // State to toggle between table and view mode

  const emptyRow = {
    id: Date.now(),
    orderNumber: '',
    customer: '',
    classification: '',
    status: '',
    documentStatus: '',
    abnormalInfo: '',
    invitee: '',
    reAuthPerson: '',
    contactInfo: '',
    invitationDate: '',
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
    setSearchClassification('');
    setSearchAll('');
  };

  const filteredData = data.filter(row => {
    const matchesClassification = row.classification.toLowerCase().includes(searchClassification.toLowerCase());
    const matchesAll = Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchAll.toLowerCase())
    );
    return matchesClassification && matchesAll;
  });

  return (
    <div className="p-6 max-w-full">
      <h2 className="text-2xl font-bold mb-6">Supplier Information Supplement</h2>
      
      {/* Search Section */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Second-order classification"
            value={searchClassification}
            onChange={(e) => setSearchClassification(e.target.value)}
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
      {/* Conditionally Render the SupplierTableView */}
      {viewMode ? (
        <SupplierTableView data={filteredData} /> // Pass filtered data to SupplierTableView
      ) : (
        // Table View
        <div className="overflow-x-auto border rounded">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Order Number</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Second-order Classification</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Document Status</th>
                  <th className="p-3 text-left">Abnormal Info</th>
                  <th className="p-3 text-left">Invitee</th>
                  <th className="p-3 text-left">Re-auth Person</th>
                  <th className="p-3 text-left">Contact Info</th>
                  <th className="p-3 text-left">Invitation Date</th>
                  <th className="p-3 text-left">Operation</th>
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
                          value={row.orderNumber}
                          onChange={(e) => handleInputChange(row.id, 'orderNumber', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.orderNumber}
                    </td>
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
                          value={row.classification}
                          onChange={(e) => handleInputChange(row.id, 'classification', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.classification}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <select
                          value={row.status}
                          onChange={(e) => handleInputChange(row.id, 'status', e.target.value)}
                          className="border p-1 w-full"
                        >
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      ) : row.status}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <select
                          value={row.documentStatus}
                          onChange={(e) => handleInputChange(row.id, 'documentStatus', e.target.value)}
                          className="border p-1 w-full"
                        >
                          <option value="">Select Status</option>
                          <option value="Uploaded">Uploaded</option>
                          <option value="Pending">Pending</option>
                          <option value="Missing">Missing</option>
                        </select>
                      ) : row.documentStatus}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="text"
                          value={row.abnormalInfo}
                          onChange={(e) => handleInputChange(row.id, 'abnormalInfo', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.abnormalInfo}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="text"
                          value={row.invitee}
                          onChange={(e) => handleInputChange(row.id, 'invitee', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.invitee}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="text"
                          value={row.reAuthPerson}
                          onChange={(e) => handleInputChange(row.id, 'reAuthPerson', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.reAuthPerson}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="text"
                          value={row.contactInfo}
                          onChange={(e) => handleInputChange(row.id, 'contactInfo', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.contactInfo}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="date"
                          value={row.invitationDate}
                          onChange={(e) => handleInputChange(row.id, 'invitationDate', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.invitationDate}
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

export default SupplierTable;
