import React, { useState } from 'react';
import './index.css';
import MaterialInquiryView from './MaterialInquiryView'; // Import MaterialInquiryView

const MaterialInquiry = () => {
  const [data, setData] = useState([]);
  const [searchSupplierMaterial, setSearchSupplierMaterial] = useState('');
  const [searchAll, setSearchAll] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newRow, setNewRow] = useState(null);
  const [viewMode, setViewMode] = useState(false); // State to toggle between table and view mode

  const emptyRow = {
    id: Date.now(),
    supplierMaterial: '',
    supplementOrderNumber: '',
    status: '',
    explanation: '',
    createTime: '',
    updateTime: '',
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
    setSearchSupplierMaterial('');
    setSearchAll('');
  };

  const filteredData = data.filter(row => {
    const matchesSupplierMaterial = row.supplierMaterial.toLowerCase().includes(searchSupplierMaterial.toLowerCase());
    const matchesAll = Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchAll.toLowerCase())
    );
    return matchesSupplierMaterial && matchesAll;
  });

  return (
    <div className="p-6 max-w-full">
      <h2 className="text-2xl font-bold mb-6">Material Inquiry</h2>
      
      {/* Search Section */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Supplier Material"
            value={searchSupplierMaterial}
            onChange={(e) => setSearchSupplierMaterial(e.target.value)}
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

      {/* Conditionally Render the MaterialInquiryView */}
      {viewMode ? (
        <MaterialInquiryView data={filteredData} /> // Pass filtered data to MaterialInquiryView
      ) : (
        // Table View
        <div className="overflow-x-auto border rounded">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Supplier Material</th>
                  <th className="p-3 text-left">Supplement Order Number</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Explanation</th>
                  <th className="p-3 text-left">Create Time</th>
                  <th className="p-3 text-left">Update Time</th>
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
                          value={row.supplierMaterial}
                          onChange={(e) => handleInputChange(row.id, 'supplierMaterial', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.supplierMaterial}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="text"
                          value={row.supplementOrderNumber}
                          onChange={(e) => handleInputChange(row.id, 'supplementOrderNumber', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.supplementOrderNumber}
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
                        <input
                          type="text"
                          value={row.explanation}
                          onChange={(e) => handleInputChange(row.id, 'explanation', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.explanation}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="datetime-local"
                          value={row.createTime}
                          onChange={(e) => handleInputChange(row.id, 'createTime', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.createTime}
                    </td>
                    <td className="p-3">
                      {editingId === row.id ? (
                        <input
                          type="datetime-local"
                          value={row.updateTime}
                          onChange={(e) => handleInputChange(row.id, 'updateTime', e.target.value)}
                          className="border p-1 w-full"
                        />
                      ) : row.updateTime}
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

export default MaterialInquiry;
