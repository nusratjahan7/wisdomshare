"use client"
import { deleteUserAccount, updateUserRole } from '@/lib/actions/user';
import { getAllUsers } from '@/lib/api/user';
import React, { useState, useEffect } from 'react';
import { FaUserShield, FaTrashAlt, FaSearch, FaChevronLeft, FaChevronRight, FaExclamationTriangle } from 'react-icons/fa';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Modal State
    const [modal, setModal] = useState({
        isOpen: false,
        type: '', // 'role' | 'delete' | 'notification'
        title: '',
        message: '',
        onConfirm: null,
        isProcessing: false
    });

    useEffect(() => {
        fetchUsersData();
    }, []);

    // Reset to page 1 whenever search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const fetchUsersData = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();
            setUsers(data || []);
            setError(null);
        } catch (err) {
            console.error("Failed to load users:", err);
            setError("Failed to load user data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModal({ isOpen: false, type: '', title: '', message: '', onConfirm: null, isProcessing: false });
    };

    const showNotification = (title, message) => {
        setModal({
            isOpen: true,
            type: 'notification',
            title,
            message,
            onConfirm: closeModal,
            isProcessing: false
        });
    };

    const handleRoleUpdateClick = (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';

        setModal({
            isOpen: true,
            type: 'role',
            title: 'Change User Role',
            message: `Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`,
            onConfirm: () => confirmRoleUpdate(userId, newRole)
        });
    };

    const confirmRoleUpdate = async (userId, newRole) => {
        setModal(prev => ({ ...prev, isProcessing: true }));
        try {
            const response = await updateUserRole(userId, newRole);
            if (response.success) {
                setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
                closeModal();
                setTimeout(() => showNotification("Success", response.message || "Role updated successfully!"), 100);
            }
        } catch (err) {
            console.error("Error updating role:", err);
            closeModal();
            setTimeout(() => showNotification("Error", "Could not update the user role."), 100);
        }
    };

    const handleDeleteClick = (userId, userName) => {
        setModal({
            isOpen: true,
            type: 'delete',
            title: 'Delete Account',
            message: `Are you sure you want to delete ${userName}'s account? This action cannot be undone.`,
            onConfirm: () => confirmDeleteAccount(userId)
        });
    };

    const confirmDeleteAccount = async (userId) => {
        setModal(prev => ({ ...prev, isProcessing: true }));
        try {
            const response = await deleteUserAccount(userId);
            if (response.success) {
                setUsers(users.filter(user => user._id !== userId));
                closeModal();
                setTimeout(() => showNotification("Success", response.message || "Account deleted successfully!"), 100);
            }
        } catch (err) {
            console.error("Error deleting user:", err);
            closeModal();
            setTimeout(() => showNotification("Error", "Could not delete the user account."), 100);
        }
    };

    // Search filtering
    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    if (loading) return <div className="text-center py-10 font-sans">Loading users...</div>;
    if (error) return <div className="text-center py-10 font-sans text-rose-500">{error}</div>;

    return (
        <div className="p-6 bg-[#f8f9fa] min-h-screen font-sans relative">
            {/* Header section with search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <h1 className="text-2xl font-bold text-[#1e293b]">User Management</h1>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <FaSearch size={14} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 bg-[#f8f9fa]/50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                <th className="py-4 px-6">User</th>
                                <th className="py-4 px-4 text-center">Lessons</th>
                                <th className="py-4 px-4">Plan</th>
                                <th className="py-4 px-4">Role</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                            {currentUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                    {/* User Name & Email */}
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-900">{user.name}</span>
                                            <span className="text-xs text-gray-400 mt-0.5">{user.email}</span>
                                        </div>
                                    </td>

                                    {/* Total Lessons */}
                                    <td className="py-4 px-4 text-center font-medium text-gray-600">
                                        {user.lessons || 0}
                                    </td>

                                    {/* Plan badge */}
                                    <td className="py-4 px-4">
                                        {user.plan === 'premium' || user.plan === 'Premium' ? (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-purple-600 rounded-full shadow-sm">
                                                👑 Premium
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                                                Free
                                            </span>
                                        )}
                                    </td>

                                    {/* Role badge */}
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium uppercase tracking-wider ${user.role === 'admin'
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                            : 'bg-gray-50 text-gray-600 border border-gray-200'
                                            }`}>
                                            {user.role || 'user'}
                                        </span>
                                    </td>

                                    {/* Status badge */}
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full ${user.status === 'Active'
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'bg-rose-50 text-rose-600'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                            {user.status || 'Active'}
                                        </span>
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            {/* Promote/Demote Button */}
                                            <button
                                                onClick={() => handleRoleUpdateClick(user._id, user.role)}
                                                className={`p-2 rounded-xl transition-all border ${user.role === 'admin'
                                                    ? 'text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-100'
                                                    : 'text-blue-500 bg-blue-50 hover:bg-blue-100 border-blue-100'
                                                    }`}
                                                title={user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                                            >
                                                <FaUserShield size={15} />
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDeleteClick(user._id, user.name)}
                                                className="p-2 text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all border border-rose-100"
                                                title="Delete Account"
                                            >
                                                <FaTrashAlt size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* No Data State */}
                {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        No users found matching your search.
                    </div>
                )}

                {/* Pagination Controls Footer */}
                {filteredUsers.length > 0 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-700">{indexOfFirstUser + 1}</span> to{" "}
                            <span className="font-semibold text-gray-700">
                                {Math.min(indexOfLastUser, filteredUsers.length)}
                            </span>{" "}
                            of <span className="font-semibold text-gray-700">{filteredUsers.length}</span> users
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <FaChevronLeft size={12} />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-9 h-9 text-sm font-medium rounded-xl transition-all ${currentPage === page
                                            ? 'bg-purple-600 text-white shadow-sm'
                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <FaChevronRight size={12} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Modal Backdrop */}
            {modal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100 animate-scale-in">
                        <div className="flex items-start gap-4">
                            {modal.type === 'delete' && (
                                <div className="p-3 bg-rose-50 text-rose-500 rounded-full shrink-0">
                                    <FaExclamationTriangle size={20} />
                                </div>
                            )}
                            {modal.type === 'role' && (
                                <div className="p-3 bg-blue-50 text-blue-500 rounded-full shrink-0">
                                    <FaUserShield size={20} />
                                </div>
                            )}

                            <div className="w-full">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{modal.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{modal.message}</p>

                                <div className="mt-6 flex items-center justify-end gap-3">
                                    {modal.type !== 'notification' && (
                                        <button
                                            onClick={closeModal}
                                            disabled={modal.isProcessing}
                                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-all disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        onClick={modal.onConfirm}
                                        disabled={modal.isProcessing}
                                        className={`px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all shadow-sm ${modal.type === 'delete'
                                                ? 'bg-rose-500 hover:bg-rose-600'
                                                : 'bg-purple-600 hover:bg-purple-700'
                                            } disabled:opacity-50`}
                                    >
                                        {modal.isProcessing ? "Processing..." : modal.type === 'notification' ? "Close" : "Confirm"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;