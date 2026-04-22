import { useState } from 'react';
import { useData } from '../DataContext';
import ImageUpload from '../components/ImageUpload';
import { Save, Eye } from 'lucide-react';

const ContactEditor = () => {
  const { contactConfig, updateContactConfig } = useData();
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState(contactConfig);

  const handleSave = () => {
    updateContactConfig(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Edit Contact Section</h2>
        <div className="flex gap-3">
          <a
            href="/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-[#8b6d4b] border border-[#8b6d4b] rounded-lg hover:bg-[#8b6d4b] hover:text-white transition-colors"
          >
            <Eye size={18} />
            Preview
          </a>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#6d5639] transition-colors"
          >
            <Save size={18} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Background Image */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ImageUpload
          label="Contact Section Background Image"
          value={formData.backgroundImage}
          onChange={(val) => setFormData({ ...formData, backgroundImage: val })}
          previewHeight="300px"
        />
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium pb-4 border-b border-gray-200">Content</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
          <input
            type="text"
            value={formData.heading}
            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium pb-4 border-b border-gray-200">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location Label</label>
            <input
              type="text"
              value={formData.locationLabel}
              onChange={(e) => setFormData({ ...formData, locationLabel: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Label</label>
            <input
              type="text"
              value={formData.emailLabel}
              onChange={(e) => setFormData({ ...formData, emailLabel: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Label</label>
            <input
              type="text"
              value={formData.phoneLabel}
              onChange={(e) => setFormData({ ...formData, phoneLabel: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>
      </div>

      {/* Form Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium pb-4 border-b border-gray-200">Form Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name Field Label</label>
            <input
              type="text"
              value={formData.formFields.nameLabel}
              onChange={(e) => setFormData({ 
                ...formData, 
                formFields: { ...formData.formFields, nameLabel: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name Placeholder</label>
            <input
              type="text"
              value={formData.formFields.namePlaceholder}
              onChange={(e) => setFormData({ 
                ...formData, 
                formFields: { ...formData.formFields, namePlaceholder: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Field Label</label>
            <input
              type="text"
              value={formData.formFields.emailLabel}
              onChange={(e) => setFormData({ 
                ...formData, 
                formFields: { ...formData.formFields, emailLabel: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Placeholder</label>
            <input
              type="text"
              value={formData.formFields.emailPlaceholder}
              onChange={(e) => setFormData({ 
                ...formData, 
                formFields: { ...formData.formFields, emailPlaceholder: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message Field Label</label>
            <input
              type="text"
              value={formData.formFields.messageLabel}
              onChange={(e) => setFormData({ 
                ...formData, 
                formFields: { ...formData.formFields, messageLabel: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message Placeholder</label>
            <input
              type="text"
              value={formData.formFields.messagePlaceholder}
              onChange={(e) => setFormData({ 
                ...formData, 
                formFields: { ...formData.formFields, messagePlaceholder: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Submit Button Text</label>
            <input
              type="text"
              value={formData.submitText}
              onChange={(e) => setFormData({ ...formData, submitText: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Submitting Text</label>
            <input
              type="text"
              value={formData.submittingText}
              onChange={(e) => setFormData({ ...formData, submittingText: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Submitted Text</label>
            <input
              type="text"
              value={formData.submittedText}
              onChange={(e) => setFormData({ ...formData, submittedText: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Success Message</label>
          <textarea
            value={formData.successMessage}
            onChange={(e) => setFormData({ ...formData, successMessage: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
          />
        </div>
      </div>

      {/* Etsy Button */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium pb-4 border-b border-gray-200">Etsy Button</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
            <input
              type="text"
              value={formData.etsyButtonText}
              onChange={(e) => setFormData({ ...formData, etsyButtonText: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Etsy URL</label>
            <input
              type="url"
              value={formData.etsyUrl}
              onChange={(e) => setFormData({ ...formData, etsyUrl: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;
