import React, { useState, useMemo } from 'react';
import './index.css';
import CustomerOrderView from './CustomerOrderView';

const CustomerOrder = () => {
  const [data, setData] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [searchPlatformPo, setSearchPlatformPo] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newRow, setNewRow] = useState(null);
  const [viewMode, setViewMode] = useState(false);

  const emptyRow = {
    id: Date.now(),
    customer: '',
    platformNo: '',
    poNo: '',
    purchaseDate: '',
    orderAmount: '',
    currency: '',
    purchasingDepartment: '',
    purchaser: '',
    requisitionBusinessGroup: '',
    deliveryStatus: '',
    orderStatus: '',
    acceptanceStatus: '',
    statementStatus: '',
    isNew: true,
  };

  const columns = [
    { key: 'customer', label: 'Customer' },
    { key: 'platformNo', label: 'Platform No' },
    { key: 'poNo', label: 'PO No' },
    { key: 'purchaseDate', label: 'Purchase Date' },
    { key: 'orderAmount', label: 'Order Amount' },
    { key: 'currency', label: 'Currency' },
    { key: 'purchasingDepartment', label: 'Purchasing Department' },
    { key: 'purchaser', label: 'Purchaser' },
    { key: 'requisitionBusinessGroup', label: 'Requisition Business Group' },
    { key: 'deliveryStatus', label: 'Delivery Status' },
    { key: 'orderStatus', label: 'Order Status' },
    { key: 'acceptanceStatus', label: 'Acceptance Status' },
    { key: 'statementStatus', label: 'Statement Status' },
  ];

  const handleAddRow = () => {
    if (!newRow) {
      const newEmptyRow = { ...emptyRow };
      setNewRow(newEmptyRow);
      setData([newEmptyRow, ...data]);
      setEditingId(newEmptyRow.id);
    }
  };

  const handleEdit = (id) => setEditingId(id);

  const handleSave = (id) => {
    if (data.find((row) => row.id === id)?.customer.trim() === '') {
      alert('Customer name cannot be empty.');
      return;
    }
    setEditingId(null);
    setNewRow(null);
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, isNew: false } : row))
    );
  };

  const handleInputChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleClear = () => {
    setSearchCustomer('');
    setSearchPlatformPo('');
    setSearchProduct('');
  };

  const filteredData = useMemo(
    () =>
      data.filter((row) => {
        const matchesCustomer = row.customer
          .toLowerCase()
          .includes(searchCustomer.toLowerCase());
        const matchesPlatformPo =
          row.platformNo.toLowerCase().includes(searchPlatformPo.toLowerCase()) ||
          row.poNo.toLowerCase().includes(searchPlatformPo.toLowerCase());
        const matchesProduct = row.customer
          .toLowerCase()
          .includes(searchProduct.toLowerCase());
        return matchesCustomer && matchesPlatformPo && matchesProduct;
      }),
    [data, searchCustomer, searchPlatformPo, searchProduct]
  );

  return (
    <div className="p-6 max-w-full">
      <h2 className="text-2xl font-bold mb-6">Customer Order Information</h2>

      {/* Search Section */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Customer Name"
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
          className="border px-2 py-2 text-base rounded"
        />
        <input
          type="text"
          placeholder="Platform No / PO No"
          value={searchPlatformPo}
          onChange={(e) => setSearchPlatformPo(e.target.value)}
          className="border px-2 py-2 text-base rounded"
        />
        <input
          type="text"
          placeholder="Product No. / Name"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
          className="border px-2 py-2 text-base rounded"
        />
        <button
          onClick={handleClear}
          className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear
        </button>
        <button
          onClick={handleAddRow}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Row
        </button>
        <button
          onClick={() => setViewMode(!viewMode)}
          className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
        >
          {viewMode ? 'Back to Table View' : 'Switch to View Mode'}
        </button>
      </div>

      {/* Conditional Rendering */}
      {viewMode ? (
        <CustomerOrderView data={filteredData} />
      ) : (
        <div className="overflow-x-auto border rounded">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left">#</th>
                  {columns.map((col) => (
                    <th key={col.key} className="px-6 py-4 text-left">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-left">Operation</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={row.id} className="border-t hover:bg-gray-50">
                    <td className="p-5">{index + 1}</td>
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-3">
                        {editingId === row.id ? (
                          <input
                            type="text"
                            value={row[col.key]}
                            onChange={(e) =>
                              handleInputChange(row.id, col.key, e.target.value)
                            }
                            className="border p-2 w-full"
                          />
                        ) : (
                          // Check if the value is an object, if so, stringify it
                          typeof row[col.key] === 'object'
                            ? JSON.stringify(row[col.key])
                            : row[col.key]
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-3">
                      {editingId === row.id ? (
                        <button
                          onClick={() => handleSave(row.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(row.id)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                      )}
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

export default CustomerOrder;
