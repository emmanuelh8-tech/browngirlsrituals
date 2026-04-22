import { useState } from 'react';
import { useData } from '../DataContext';
import { Save, Eye, Plus, Trash2 } from 'lucide-react';

const FooterEditor = () => {
  const { footerConfig, updateFooterConfig } = useData();
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState(footerConfig);

  const handleSave = () => {
    updateFooterConfig(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateLinkGroup = (groupIndex: number, linkIndex: number, field: string, value: string) => {
    const newLinkGroups = [...formData.linkGroups];
    newLinkGroups[groupIndex].links[linkIndex] = {
      ...newLinkGroups[groupIndex].links[linkIndex],
      [field]: value
    };
    setFormData({ ...formData, linkGroups: newLinkGroups });
  };

  const addLink = (groupIndex: number) => {
    const newLinkGroups = [...formData.linkGroups];
    newLinkGroups[groupIndex].links.push({ label: 'New Link', href: '#' });
    setFormData({ ...formData, linkGroups: newLinkGroups });
  };

  const removeLink = (groupIndex: number, linkIndex: number) => {
    const newLinkGroups = [...formData.linkGroups];
    newLinkGroups[groupIndex].links = newLinkGroups[groupIndex].links.filter((_, i) => i !== linkIndex);
    setFormData({ ...formData, linkGroups: newLinkGroups });
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    const newSocialLinks = [...formData.socialLinks];
    newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
    setFormData({ ...formData, socialLinks: newSocialLinks });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Edit Footer</h2>
        <div className="flex gap-3">
          <a
            href="/"
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

      {/* Brand Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium pb-4 border-b border-gray-200">Brand Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
          <input
            type="text"
            value={formData.brandName}
            onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Description</label>
          <textarea
            value={formData.brandDescription}
            onChange={(e) => setFormData({ ...formData, brandDescription: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
          <input
            type="text"
            value={formData.copyrightText}
            onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
          />
        </div>
      </div>

      {/* Link Groups */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium pb-4 border-b border-gray-200">Link Groups</h3>
        
        {formData.linkGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="border border-gray-200 rounded-lg p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Group Title</label>
              <input
                type="text"
                value={group.title}
                onChange={(e) => {
                  const newLinkGroups = [...formData.linkGroups];
                  newLinkGroups[groupIndex].title = e.target.value;
                  setFormData({ ...formData, linkGroups: newLinkGroups });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Links</span>
                <button
                  onClick={() => addLink(groupIndex)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-[#8b6d4b] text-white rounded hover:bg-[#6d5639]"
                >
                  <Plus size={14} />
                  Add Link
                </button>
              </div>
              
              {group.links.map((link, linkIndex) => (
                <div key={linkIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateLinkGroup(groupIndex, linkIndex, 'label', e.target.value)}
                    placeholder="Link Label"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => updateLinkGroup(groupIndex, linkIndex, 'href', e.target.value)}
                    placeholder="URL (e.g., /#about or https://...)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => removeLink(groupIndex, linkIndex)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium pb-4 border-b border-gray-200">Newsletter</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
          <input
            type="text"
            value={formData.newsletterHeading}
            onChange={(e) => setFormData({ ...formData, newsletterHeading: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.newsletterDescription}
            onChange={(e) => setFormData({ ...formData, newsletterDescription: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Placeholder</label>
            <input
              type="text"
              value={formData.newsletterPlaceholder}
              onChange={(e) => setFormData({ ...formData, newsletterPlaceholder: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
            <input
              type="text"
              value={formData.newsletterButtonText}
              onChange={(e) => setFormData({ ...formData, newsletterButtonText: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Success Message</label>
            <input
              type="text"
              value={formData.newsletterSuccessText}
              onChange={(e) => setFormData({ ...formData, newsletterSuccessText: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
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

      {/* Social Links */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium pb-4 border-b border-gray-200">Social Links</h3>
        
        {formData.socialLinks.map((social, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Platform</label>
              <input
                type="text"
                value={social.icon}
                onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                placeholder="Instagram, Facebook, Twitter"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Label</label>
              <input
                type="text"
                value={social.label}
                onChange={(e) => updateSocialLink(index, 'label', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">URL</label>
              <input
                type="url"
                value={social.href}
                onChange={(e) => updateSocialLink(index, 'href', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterEditor;
