"use client"
import React, { useState } from 'react';
import { Edit, Trash, Eye } from 'lucide-react';

type Item = {
    id: number;
    name: string;
    description: string;
};

type DataTableProps = {
    data: Item[];
};

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [modalType, setModalType] = useState<'edit' | 'delete' | 'review' | null>(null);

    const handleModalClose = () => {
        setModalType(null);
        setSelectedItem(null);
    };

    const handleEdit = (item: Item) => {
        setSelectedItem(item);
        setModalType('edit');
    };

    const handleDelete = (item: Item) => {
        setSelectedItem(item);
        setModalType('delete');
    };

    const handleReview = (item: Item) => {
        setSelectedItem(item);
        setModalType('review');
    };

    const handlePaginationChange = (newPage: number) => {
        setPage(newPage);
    };

    const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg bg-white">
            <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 border-b">ID</th>
                        <th className="px-6 py-3 border-b">Name</th>
                        <th className="px-6 py-3 border-b">Description</th>
                        <th className="px-6 py-3 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 border-b">{item.id}</td>
                            <td className="px-6 py-4 border-b">{item.name}</td>
                            <td className="px-6 py-4 border-b">{item.description}</td>
                            <td className="px-6 py-4 border-b flex space-x-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="text-blue-600 hover:text-blue-800 p-2 rounded-md"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item)}
                                    className="text-red-600 hover:text-red-800 p-2 rounded-md"
                                >
                                    <Trash size={16} />
                                </button>
                                <button
                                    onClick={() => handleReview(item)}
                                    className="text-green-600 hover:text-green-800 p-2 rounded-md"
                                >
                                    <Eye size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 px-6">
                <button
                    onClick={() => handlePaginationChange(page - 1)}
                    disabled={page === 1}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {page} of {Math.ceil(data.length / pageSize)}
                </span>
                <button
                    onClick={() => handlePaginationChange(page + 1)}
                    disabled={page * pageSize >= data.length}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            {modalType && selectedItem && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl mb-4 font-semibold">{modalType.charAt(0).toUpperCase() + modalType.slice(1)} Item</h2>
                        <div>
                            <p><strong>ID:</strong> {selectedItem.id}</p>
                            <p><strong>Name:</strong> {selectedItem.name}</p>
                            <p><strong>Description:</strong> {selectedItem.description}</p>
                        </div>
                        <div className="mt-4">
                            {modalType === 'edit' && (
                                <div>
                                    <input
                                        type="text"
                                        defaultValue={selectedItem.name}
                                        className="border px-4 py-2 mb-2 w-full rounded-md shadow-sm"
                                    />
                                    <input
                                        type="text"
                                        defaultValue={selectedItem.description}
                                        className="border px-4 py-2 w-full rounded-md shadow-sm"
                                    />
                                </div>
                            )}
                            {modalType === 'delete' && (
                                <p className="text-gray-700">Are you sure you want to delete this item?</p>
                            )}
                            {modalType === 'review' && (
                                <p className="text-gray-700">Reviewing: {selectedItem.name}</p>
                            )}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleModalClose}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                            >
                                Close
                            </button>
                            {modalType === 'delete' && (
                                <button
                                    onClick={handleModalClose}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                >
                                    Confirm Delete
                                </button>
                            )}
                            {modalType === 'edit' && (
                                <button
                                    onClick={handleModalClose}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Save Changes
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
