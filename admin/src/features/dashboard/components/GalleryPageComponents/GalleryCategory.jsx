import React, { useState } from "react";
import OpenCloseLayout from "../../../../utils/OpenCloseLayout";
import { Pencil, Trash2, Check, X, Plus } from "lucide-react";
import CustomInput from "../../../../utils/CustomInput";
import { useForm } from "react-hook-form";
import { GalleryValidation } from "../../../../validations/HomePageValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "../../../../services/ApiCalls";

export default function GalleryCategory({ data, refreshData }) {
  const [editId, setEditId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ id: null, name: "" });

  // Edit form
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm({ defaultValues: { categoryName: "" } });

  // Add form
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
  } = useForm({ resolver: zodResolver(GalleryValidation) });

  const handleEditClick = (category) => {
    setEditId(category._id);
    setIsAdding(false);
    resetEdit({ categoryName: category.title });
  };

  const onEditSubmit = async (data) => {
    try {
      await apiRequest({
        method: "put",
        url: `/gallery/gallerycategory/${editId}`,
        data: { title: data.categoryName.trim() },
      });

      setEditId(null);
      resetEdit();
      refreshData();
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  const onAddSubmit = async (formdata) => {
    const response = await apiRequest({
      method: "post",
      url: "/gallery/gallerycategory",
      data: { title: formdata.categoryName.trim() },
    });

    if (response) {
      resetAdd();
      setIsAdding(false);
      refreshData();
    }
  };

  const handleDeleteClick = (id, name) => {
    setItemToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const { id } = itemToDelete;
    try {
      await apiRequest({
        method: "delete",
        url: `/gallery/gallerycategory/${id}`,
      });

      if (editId === id) setEditId(null);
      setDeleteModalOpen(false);
      setItemToDelete({ id: null, name: "" });
      refreshData();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setIsAdding(false);
    resetEdit();
    resetAdd();
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditId(null);
    resetAdd();
  };

  return (
    <OpenCloseLayout title="Gallery Category">
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-[#0048F9] text-white px-4 py-2 rounded hover:bg-[#1a326d] transition"
          disabled={editId !== null || isAdding}
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Order</th>
            <th className="border px-4 py-2">Category Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((category, index) => (
            <tr key={category._id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">
                {editId === category._id ? (
                  <form onSubmit={handleSubmitEdit(onEditSubmit)}>
                    <CustomInput
                      label=""
                      register={registerEdit}
                      name="categoryName"
                      placeholder="Enter category name"
                      error={errorsEdit.categoryName}
                      autoFocus
                      {...registerEdit("categoryName", {
                        required: "Category name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum 3 characters required",
                        },
                      })}
                    />
                  </form>
                ) : (
                  category.title
                )}
              </td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                {editId === category._id ? (
                  <>
                    <button
                      type="submit"
                      className="text-green-600 hover:text-green-800"
                      onClick={handleSubmitEdit(onEditSubmit)}
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(category)}
                      className="text-blue-600 hover:text-blue-800"
                      disabled={isAdding}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteClick(category._id, category.title)
                      }
                      className="text-red-600 hover:text-red-800"
                      disabled={isAdding}
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}

          {isAdding && (
            <tr>
              <td className="border px-4 py-2 text-center">
                {data.length + 1}
              </td>
              <td className="border px-4 py-2">
                <form onSubmit={handleSubmitAdd(onAddSubmit)}>
                  <CustomInput
                    label=""
                    register={registerAdd}
                    name="categoryName"
                    placeholder="Enter category name"
                    error={errorsAdd.categoryName}
                    autoFocus
                    {...registerAdd("categoryName", {
                      required: "Category name is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required",
                      },
                    })}
                  />
                </form>
              </td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <button
                  type="submit"
                  className="text-green-600 hover:text-green-800"
                  onClick={handleSubmitAdd(onAddSubmit)}
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={18} />
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {deleteModalOpen && (
        <ConfirmDeleteModal
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          message={`Are you sure you want to delete "${itemToDelete.name} and All images related to it ?"?`}
        />
      )}
    </OpenCloseLayout>
  );
}

// Confirm Delete Modal Component
function ConfirmDeleteModal({ onCancel, onConfirm, message }) {
  return (
    <div className="fixed inset-0 bg-slate-100/90 flex justify-center items-center z-50 p-4">
      <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-md w-full max-w-md text-slate-900">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-6 text-sm text-slate-300">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
