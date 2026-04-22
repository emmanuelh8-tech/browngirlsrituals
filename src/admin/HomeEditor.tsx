import { useState } from 'react';
import { useData } from '../DataContext';
import ImageUpload from '../components/ImageUpload';
import { Save, Eye, Plus, Trash2, GripVertical } from 'lucide-react';

const HomeEditor = () => {
  const { 
    heroConfig, 
    subHeroConfig, 
    videoSectionConfig, 
    updateHeroConfig, 
    updateSubHeroConfig, 
    updateVideoSectionConfig 
  } = useData();
  
  const [activeTab, setActiveTab] = useState<'hero' | 'subhero' | 'video'>('hero');
  const [saved, setSaved] = useState(false);

  // Hero Form State
  const [heroForm, setHeroForm] = useState(heroConfig);
  
  // SubHero Form State
  const [subHeroForm, setSubHeroForm] = useState(subHeroConfig);
  
  // Video Section Form State
  const [videoForm, setVideoForm] = useState(videoSectionConfig);

  const handleSave = () => {
    if (activeTab === 'hero') updateHeroConfig(heroForm);
    if (activeTab === 'subhero') updateSubHeroConfig(subHeroForm);
    if (activeTab === 'video') updateVideoSectionConfig(videoForm);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateStat = (index: number, field: string, value: any) => {
    const newStats = [...subHeroForm.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setSubHeroForm({ ...subHeroForm, stats: newStats });
  };

  const addStat = () => {
    setSubHeroForm({
      ...subHeroForm,
      stats: [...subHeroForm.stats, { value: 0, suffix: '', label: '' }]
    });
  };

  const removeStat = (index: number) => {
    const newStats = subHeroForm.stats.filter((_, i) => i !== index);
    setSubHeroForm({ ...subHeroForm, stats: newStats });
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { key: 'hero', label: 'Hero Section' },
          { key: 'subhero', label: 'About/Philosophy' },
          { key: 'video', label: 'Experience Section' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-[#8b6d4b] text-[#8b6d4b]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">
          {activeTab === 'hero' && 'Edit Hero Section'}
          {activeTab === 'subhero' && 'Edit Philosophy Section'}
          {activeTab === 'video' && 'Edit Experience Section'}
        </h2>
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

      {/* Hero Editor */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          <ImageUpload
            label="Hero Background Image"
            value={heroForm.backgroundImage}
            onChange={(val) => setHeroForm({ ...heroForm, backgroundImage: val })}
            previewHeight="300px"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
              <input
                type="text"
                value={heroForm.tagline}
                onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title (use \n for line breaks)</label>
              <textarea
                value={heroForm.title}
                onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label>
              <input
                type="text"
                value={heroForm.ctaPrimaryText}
                onChange={(e) => setHeroForm({ ...heroForm, ctaPrimaryText: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Link</label>
              <input
                type="text"
                value={heroForm.ctaPrimaryTarget}
                onChange={(e) => setHeroForm({ ...heroForm, ctaPrimaryTarget: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Text</label>
              <input
                type="text"
                value={heroForm.ctaSecondaryText}
                onChange={(e) => setHeroForm({ ...heroForm, ctaSecondaryText: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Link</label>
              <input
                type="text"
                value={heroForm.ctaSecondaryTarget}
                onChange={(e) => setHeroForm({ ...heroForm, ctaSecondaryTarget: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
              />
            </div>
          </div>
        </div>
      )}

      {/* SubHero Editor */}
      {activeTab === 'subhero' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUpload
              label="Image 1 (Large)"
              value={subHeroForm.image1}
              onChange={(val) => setSubHeroForm({ ...subHeroForm, image1: val })}
              previewHeight="250px"
            />
            <ImageUpload
              label="Image 2 (Small)"
              value={subHeroForm.image2}
              onChange={(val) => setSubHeroForm({ ...subHeroForm, image2: val })}
              previewHeight="250px"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
            <input
              type="text"
              value={subHeroForm.tag}
              onChange={(e) => setSubHeroForm({ ...subHeroForm, tag: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
            <input
              type="text"
              value={subHeroForm.heading}
              onChange={(e) => setSubHeroForm({ ...subHeroForm, heading: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Paragraph 1</label>
            <textarea
              value={subHeroForm.bodyParagraphs[0] || ''}
              onChange={(e) => {
                const newParagraphs = [...subHeroForm.bodyParagraphs];
                newParagraphs[0] = e.target.value;
                setSubHeroForm({ ...subHeroForm, bodyParagraphs: newParagraphs });
              }}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Paragraph 2</label>
            <textarea
              value={subHeroForm.bodyParagraphs[1] || ''}
              onChange={(e) => {
                const newParagraphs = [...subHeroForm.bodyParagraphs];
                newParagraphs[1] = e.target.value;
                setSubHeroForm({ ...subHeroForm, bodyParagraphs: newParagraphs });
              }}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link Text</label>
              <input
                type="text"
                value={subHeroForm.linkText}
                onChange={(e) => setSubHeroForm({ ...subHeroForm, linkText: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link Target</label>
              <input
                type="text"
                value={subHeroForm.linkTarget}
                onChange={(e) => setSubHeroForm({ ...subHeroForm, linkTarget: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
              />
            </div>
          </div>

          {/* Stats Editor */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Statistics</h3>
              <button
                onClick={addStat}
                className="flex items-center gap-2 px-3 py-2 bg-[#8b6d4b] text-white text-sm rounded-lg hover:bg-[#6d5639]"
              >
                <Plus size={16} />
                Add Stat
              </button>
            </div>
            <div className="space-y-4">
              {subHeroForm.stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                  <GripVertical className="text-gray-400" size={20} />
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <input
                      type="number"
                      value={stat.value}
                      onChange={(e) => updateStat(index, 'value', parseInt(e.target.value) || 0)}
                      placeholder="Value"
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={stat.suffix}
                      onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                      placeholder="Suffix (e.g., +, %)"
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                      placeholder="Label"
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button
                    onClick={() => removeStat(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Section Editor */}
      {activeTab === 'video' && (
        <div className="space-y-6">
          <ImageUpload
            label="Background Image"
            value={videoForm.backgroundImage}
            onChange={(val) => setVideoForm({ ...videoForm, backgroundImage: val })}
            previewHeight="300px"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
            <input
              type="text"
              value={videoForm.tag}
              onChange={(e) => setVideoForm({ ...videoForm, tag: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
            <input
              type="text"
              value={videoForm.heading}
              onChange={(e) => setVideoForm({ ...videoForm, heading: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Paragraph 1</label>
            <textarea
              value={videoForm.bodyParagraphs[0] || ''}
              onChange={(e) => {
                const newParagraphs = [...videoForm.bodyParagraphs];
                newParagraphs[0] = e.target.value;
                setVideoForm({ ...videoForm, bodyParagraphs: newParagraphs });
              }}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Paragraph 2</label>
            <textarea
              value={videoForm.bodyParagraphs[1] || ''}
              onChange={(e) => {
                const newParagraphs = [...videoForm.bodyParagraphs];
                newParagraphs[1] = e.target.value;
                setVideoForm({ ...videoForm, bodyParagraphs: newParagraphs });
              }}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
              <input
                type="text"
                value={videoForm.ctaText}
                onChange={(e) => setVideoForm({ ...videoForm, ctaText: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Link</label>
              <input
                type="text"
                value={videoForm.ctaTarget}
                onChange={(e) => setVideoForm({ ...videoForm, ctaTarget: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeEditor;
