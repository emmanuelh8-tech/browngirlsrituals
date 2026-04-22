import { useState } from 'react';
import { useData } from './DataContext';
import { Save, Image as ImageIcon, Eye } from 'lucide-react';

const HeroEditor = () => {
  const { heroConfig, updateHeroConfig } = useData();
  const [formData, setFormData] = useState(heroConfig);
  const [previewImage, setPreviewImage] = useState(heroConfig.backgroundImage);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroConfig(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, backgroundImage: url });
    setPreviewImage(url);
  };

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800">Preview</h3>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#8b6d4b] hover:underline"
          >
            <Eye size={16} />
            View on Site
          </a>
        </div>
        <div
          className="h-64 rounded-lg bg-cover bg-center relative"
          style={{ backgroundImage: `url(${previewImage})` }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
            <div className="text-center text-white px-4">
              <span className="text-sm tracking-[0.3em] uppercase">{formData.tagline}</span>
              <h1 className="font-serif text-3xl md:text-4xl mt-2 whitespace-pre-line">
                {formData.title}
              </h1>
              <div className="mt-6 flex gap-4 justify-center">
                <span className="px-6 py-2 bg-[#8b6d4b] text-sm">{formData.ctaPrimaryText}</span>
                <span className="px-6 py-2 border border-white text-sm">{formData.ctaSecondaryText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800">Edit Hero Section</h3>
          {saved && (
            <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
              Saved successfully!
            </span>
          )}
        </div>

        {/* Background Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Image
          </label>
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreviewImage('')}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="text-gray-400" size={24} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={formData.backgroundImage}
                onChange={handleImageChange}
                placeholder="/images/hero-bg.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended size: 1920x1080px or larger
              </p>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tagline
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            placeholder="INTENTIONAL LIVING"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title (use \n for line breaks)
          </label>
          <textarea
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Rituals Made With\nBrown Women in Mind"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
          />
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Button Text
            </label>
            <input
              type="text"
              value={formData.ctaPrimaryText}
              onChange={(e) => setFormData({ ...formData, ctaPrimaryText: e.target.value })}
              placeholder="Shop on Etsy"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Button Link
            </label>
            <input
              type="text"
              value={formData.ctaPrimaryTarget}
              onChange={(e) => setFormData({ ...formData, ctaPrimaryTarget: e.target.value })}
              placeholder="https://browngirlsrituals.etsy.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Button Text
            </label>
            <input
              type="text"
              value={formData.ctaSecondaryText}
              onChange={(e) => setFormData({ ...formData, ctaSecondaryText: e.target.value })}
              placeholder="Our Story"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Button Link
            </label>
            <input
              type="text"
              value={formData.ctaSecondaryTarget}
              onChange={(e) => setFormData({ ...formData, ctaSecondaryTarget: e.target.value })}
              placeholder="#about"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#6d5639] transition-colors"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroEditor;
