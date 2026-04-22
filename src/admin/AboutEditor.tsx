import { useState } from 'react';
import { useData } from '../DataContext';
import ImageUpload from '../components/ImageUpload';
import { Save, Eye, Plus, Trash2 } from 'lucide-react';

const AboutEditor = () => {
  const { aboutConfig, updateAboutConfig } = useData();
  const [saved, setSaved] = useState(false);
  
  const [sections, setSections] = useState(aboutConfig.sections);

  const handleSave = () => {
    updateAboutConfig({ sections });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSection = (index: number, field: string, value: any) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const updateParagraph = (sectionIndex: number, paraIndex: number, value: string) => {
    const newSections = [...sections];
    const newParagraphs = [...newSections[sectionIndex].paragraphs];
    newParagraphs[paraIndex] = value;
    newSections[sectionIndex] = { ...newSections[sectionIndex], paragraphs: newParagraphs };
    setSections(newSections);
  };

  const addParagraph = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      paragraphs: [...newSections[sectionIndex].paragraphs, '']
    };
    setSections(newSections);
  };

  const removeParagraph = (sectionIndex: number, paraIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      paragraphs: newSections[sectionIndex].paragraphs.filter((_, i) => i !== paraIndex)
    };
    setSections(newSections);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Edit Our Story Sections</h2>
        <div className="flex gap-3">
          <a
            href="/#about"
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

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-6 pb-4 border-b border-gray-200">
              Section {index + 1}: {section.heading}
            </h3>

            <div className="space-y-6">
              <ImageUpload
                label="Background Image"
                value={section.image}
                onChange={(val) => updateSection(index, 'image', val)}
                previewHeight="250px"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
                  <input
                    type="text"
                    value={section.tag}
                    onChange={(e) => updateSection(index, 'tag', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) => updateSection(index, 'heading', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
                  />
                </div>
              </div>

              {/* Paragraphs */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">Paragraphs</label>
                  <button
                    onClick={() => addParagraph(index)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-[#8b6d4b] text-white rounded hover:bg-[#6d5639]"
                  >
                    <Plus size={14} />
                    Add Paragraph
                  </button>
                </div>
                <div className="space-y-3">
                  {section.paragraphs.map((para, paraIndex) => (
                    <div key={paraIndex} className="flex gap-2">
                      <textarea
                        value={para}
                        onChange={(e) => updateParagraph(index, paraIndex, e.target.value)}
                        rows={3}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
                      />
                      <button
                        onClick={() => removeParagraph(index, paraIndex)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote (optional) */}
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quote (optional - leave empty to show paragraphs instead)
                </label>
                <textarea
                  value={section.quote}
                  onChange={(e) => updateSection(index, 'quote', e.target.value)}
                  rows={3}
                  placeholder="Enter a quote or leave empty"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
                />
              </div>

              {section.quote && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quote Attribution</label>
                  <input
                    type="text"
                    value={section.attribution}
                    onChange={(e) => updateSection(index, 'attribution', e.target.value)}
                    placeholder="e.g., — The Brown Girls Rituals Mantra"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
                  />
                </div>
              )}

              {/* Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={section.backgroundColor}
                      onChange={(e) => updateSection(index, 'backgroundColor', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={section.backgroundColor}
                      onChange={(e) => updateSection(index, 'backgroundColor', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={section.textColor}
                      onChange={(e) => updateSection(index, 'textColor', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={section.textColor}
                      onChange={(e) => updateSection(index, 'textColor', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutEditor;
