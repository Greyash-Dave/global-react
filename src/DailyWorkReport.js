import React, { useState } from 'react';
import './index.css';
import SupplierTableView from './SupplierTableView'; // Import SupplierTableView

const DailyWorkReport = () => {
  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState(null);
  const [viewMode, setViewMode] = useState(false); // State to toggle between table and view mode

  const emptyRow = {
    id: Date.now(),
    companyName: '', // Add companyName field
    projectName: '',
    date: '',  // Add date field here
    supervisorName: '',
    managerName: '',
    prepaidBy: '',
    noOfEmployee: '',
    natureOfWork: '',
    progress: '',
    hourOfWork: '',
    charges: '',
    isNew: true
  };

  const handleAddRow = () => {
    if (!newRow) {
      const newEmptyRow = { ...emptyRow }; // Create a new empty row
      setNewRow(newEmptyRow);
      setData([newEmptyRow, ...data]);
    }
  };

  const handleEdit = (id) => {
    setNewRow(data.find(row => row.id === id));
  };

  const handleSave = async (id) => {
    try {
      const updatedData = data.map(row => (row.id === id ? { ...row, isNew: false } : row));
      setData(updatedData);

      await fetch('http://localhost:5000/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      setNewRow(null); // Reset new row after saving
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleInputChange = (id, field, value) => {
    setData(data.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  return (
    <div className="p-6 max-w-full bg-gray-50 rounded-xl shadow-lg">
      {/* Centered text */}
      <div className="text-center mb-6 font-bold text-3xl text-blue-600">
        GLOBAL INDIA CORPORATION
      </div>
      
      {/* Add "DAILY WORK REPORT" below the first text */}
      <div className="text-center mb-6 font-semibold text-2xl text-gray-800">
        DAILY WORK REPORT
      </div>
      
      {/* Input Fields for the New Row */}
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-6">
          {/* Company Name Input */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-600">Company Name:</label>
            <input
              type="text"
              value={newRow ? newRow.companyName : ''}
              onChange={(e) => handleInputChange(newRow.id, 'companyName', e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm"
            />
          </div>

          {/* Project Name Input */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-600">Project Name:</label>
            <input
              type="text"
              value={newRow ? newRow.projectName : ''}
              onChange={(e) => handleInputChange(newRow.id, 'projectName', e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm"
            />
          </div>

          {/* Date Input */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-600">Date:</label>
            <input
              type="text"
              value={newRow ? newRow.date : ''}
              onChange={(e) => handleInputChange(newRow.id, 'date', e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm"
            />
          </div>

          {/* Supervisor Name Input */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-600">Supervisor Name:</label>
            <input
              type="text"
              value={newRow ? newRow.supervisorName : ''}
              onChange={(e) => handleInputChange(newRow.id, 'supervisorName', e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm"
            />
          </div>

          {/* Manager Name Input */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-600">Manager Name:</label>
            <input
              type="text"
              value={newRow ? newRow.managerName : ''}
              onChange={(e) => handleInputChange(newRow.id, 'managerName', e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm"
            />
          </div>

          {/* Prepaid By Input */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-600">Prepaid By:</label>
            <input
              type="text"
              value={newRow ? newRow.prepaidBy : ''}
              onChange={(e) => handleInputChange(newRow.id, 'prepaidBy', e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleAddRow}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={newRow !== null}
        >
          Add Row
        </button>
        <button
          onClick={() => setViewMode(!viewMode)}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
        >
          {viewMode ? 'Back to Table View' : 'Switch to View Mode'}
        </button>
      </div>

      {/* Conditionally Render the SupplierTableView */}
      {viewMode ? (
        <SupplierTableView data={data} /> // Pass data to SupplierTableView for view mode
      ) : (
        // Table View
        <div className="overflow-x-auto border rounded-lg shadow-md">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-2 text-left">Sr.No.</th>
                  <th className="p-2 text-left">No. of Employee</th>
                  <th className="p-2 text-left">Nature of Work</th>
                  <th className="p-2 text-left">Progress</th>
                  <th className="p-2 text-left">Hour of Work</th>
                  <th className="p-2 text-left">Charges</th>
                  <th className="p-2 text-left">Date</th> {/* Added Date Column */}
                  <th className="p-2 text-left">Operation</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={row.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">
                      {newRow && newRow.id === row.id ? (
                        <input
                          type="text"
                          value={row.noOfEmployee}
                          onChange={(e) => handleInputChange(row.id, 'noOfEmployee', e.target.value)}
                          className="border p-1 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        row.noOfEmployee
                      )}
                    </td>
                    <td className="p-2">
                      {newRow && newRow.id === row.id ? (
                        <input
                          type="text"
                          value={row.natureOfWork}
                          onChange={(e) => handleInputChange(row.id, 'natureOfWork', e.target.value)}
                          className="border p-1 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        row.natureOfWork
                      )}
                    </td>
                    <td className="p-2">
                      {newRow && newRow.id === row.id ? (
                        <input
                          type="text"
                          value={row.progress}
                          onChange={(e) => handleInputChange(row.id, 'progress', e.target.value)}
                          className="border p-1 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        row.progress
                      )}
                    </td>
                    <td className="p-2">
                      {newRow && newRow.id === row.id ? (
                        <input
                          type="text"
                          value={row.hourOfWork}
                          onChange={(e) => handleInputChange(row.id, 'hourOfWork', e.target.value)}
                          className="border p-1 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        row.hourOfWork
                      )}
                    </td>
                    <td className="p-2">
                      {newRow && newRow.id === row.id ? (
                        <input
                          type="text"
                          value={row.charges}
                          onChange={(e) => handleInputChange(row.id, 'charges', e.target.value)}
                          className="border p-1 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        row.charges
                      )}
                    </td>
                    <td className="p-2">
                      {newRow && newRow.id === row.id ? (
                        <input
                          type="text"
                          value={row.date}
                          onChange={(e) => handleInputChange(row.id, 'date', e.target.value)}
                          className="border p-1 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        row.date
                      )}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        {newRow && newRow.id === row.id ? (
                          <button
                            onClick={() => handleSave(row.id)}
                            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                            title="Save"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(row.id)}
                            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
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

export default DailyWorkReport;
