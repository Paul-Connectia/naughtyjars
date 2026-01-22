import { createCrew } from "@/api/crewApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Add this import

interface CrewForm {
  name: string;
  position: string;
  email: string;
  contact: string;
  status: string;
}

const AddCrew = () => {
  const [formData, setFormData] = useState<CrewForm>({
    name: "",
    position: "",
    email: "",
    contact: "",
    status: "active",
  });
  
  const navigate = useNavigate(); // Add this hook

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      await createCrew(formData, token);

      toast.success("Crew member added successfully!");

      // Reset form
      setFormData({
        name: "",
        position: "",
        email: "",
        contact: "",
        status: "active",
      });
      
      // Optionally navigate back after successful addition
      // navigate("/admin/crew");
      
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to add crew member"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6"> {/* Added flex container */}
        <h2 className="text-2xl font-semibold">Add Crew Member</h2>
        {/* Back to List button */}
        <button
          type="button"
          onClick={() => navigate("/admin/crew")}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          ← Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter crew name"
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g. Driver, Mechanic, Supervisor"
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Submit buttons container */}
        <div className="flex gap-3 pt-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Crew
          </button>
          
          {/* Optional: Add Cancel button next to submit */}
          <button
            type="button"
            onClick={() => navigate("/admin/crew")}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCrew;