"use client";
import React, { useState } from "react";
import { Upload, Plus, Trash2, Loader2, X } from "lucide-react";
import { useAddCateringMutation } from "@/redux/api/cateringApi";

const AddCatering = () => {
  // 1. RTK Query Hook
  const [addCatering, { isLoading }] = useAddCateringMutation();

  // 2. Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricePerPerson: "",
    minGuests: "",
  });

  // 3. Dynamic Menu State
  const [menuItems, setMenuItems] = useState([""]); // Start with 1 empty input
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // --- Handlers ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Dynamic Menu List
  const handleMenuChange = (index, value) => {
    const updatedMenu = [...menuItems];
    updatedMenu[index] = value;
    setMenuItems(updatedMenu);
  };

  const addMenuField = () => {
    setMenuItems([...menuItems, ""]);
  };

  const removeMenuField = (index) => {
    const updatedMenu = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedMenu);
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // --- Submit Logic ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Construct the Payload
    const payloadData = {
      name: formData.name,
      description: formData.description,
      pricePerPerson: Number(formData.pricePerPerson),
      minGuests: Number(formData.minGuests),
      menu: menuItems.filter((item) => item.trim() !== ""), // Remove empty lines
    };

    // 2. Create FormData
    const formDataToSend = new FormData();

    // Backend expectation: "data" field contains the JSON string
    formDataToSend.append("body", JSON.stringify(payloadData));

    // Backend expectation: "image" field contains the binary file
    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    try {
      // 3. Send Request
      const res = await addCatering(formDataToSend).unwrap();
      console.log("Success:", res);
      alert("Catering Menu Added Successfully!");

      // Reset Form
      setFormData({
        name: "",
        description: "",
        pricePerPerson: "",
        minGuests: "",
      });
      setMenuItems([""]);
      removeImage();
    } catch (err) {
      console.error("Failed:", err);
      alert("Failed to add catering service.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 my-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Add Catering Service
        </h1>
        <p className="text-gray-500 text-sm">
          Create a new menu package for events.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column: Image Upload */}
        <div className="lg:col-span-1 space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image
          </label>

          <div className="relative group">
            {imagePreview ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </label>
            )}
          </div>
        </div>

        {/* Right Column: Form Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Package Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Package Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Royal Wedding Menu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Brief details about the package..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Price & Guests Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Per Person ($)
              </label>
              <input
                type="number"
                name="pricePerPerson"
                value={formData.pricePerPerson}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min. Guests
              </label>
              <input
                type="number"
                name="minGuests"
                value={formData.minGuests}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
          </div>

          {/* Dynamic Menu List */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menu Items
            </label>
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleMenuChange(index, e.target.value)}
                    placeholder={`Item ${index + 1} (e.g. Kachchi Biryani)`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                  {menuItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMenuField(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addMenuField}
              className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus size={16} /> Add Another Item
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Saving...
                </>
              ) : (
                "Create Service Package"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCatering;
