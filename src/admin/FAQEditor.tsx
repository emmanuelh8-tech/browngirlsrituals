import { useState } from 'react';
import { useData } from '../DataContext';
import { Save, Eye, Plus, Trash2, GripVertical } from 'lucide-react';

const FAQEditor = () => {
  const { faqConfig, updateFaqConfig } = useData();
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState(faqConfig);

  const handleSave = () => {
    updateFaqConfig(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addFAQ = () => {
    const newId = Math.max(...formData.faqs.map(f => f.id), 0) + 1;
    setFormData({
      ...formData,
      faqs: [
        ...formData.faqs,
        {
          id: newId,
          question: 'New Question',
          answer: 'Enter your answer here...'
        }
      ]
    });
  };

  const updateFAQ = (index: number, field: string, value: string) => {
    const newFAQs = [...formData.faqs];
    newFAQs[index] = { ...newFAQs[index], [field]: value };
    setFormData({ ...formData, faqs: newFAQs });
  };

  const removeFAQ = (index: number) => {
    const newFAQs = formData.faqs.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: newFAQs });
  };

  const moveFAQ = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === formData.faqs.length - 1) return;
    
    const newFAQs = [...formData.faqs];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newFAQs[index], newFAQs[newIndex]] = [newFAQs[newIndex], newFAQs[index]];
    setFormData({ ...formData, faqs: newFAQs });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Edit FAQ Section</h2>
        <div className="flex gap-3">
          <a
            href="/#faq"
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

      {/* Section Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium pb-4 border-b border-gray-200">Section Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
            <input
              type="text"
              value={formData.ctaText}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CTA Link Target</label>
            <input
              type="text"
              value={formData.ctaTarget}
              onChange={(e) => setFormData({ ...formData, ctaTarget: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">FAQ Items ({formData.faqs.length})</h3>
          <button
            onClick={addFAQ}
            className="flex items-center gap-2 px-4 py-2 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#6d5639]"
          >
            <Plus size={18} />
            Add FAQ
          </button>
        </div>

        <div className="space-y-4">
          {formData.faqs.map((faq, index) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1 pt-2">
                  <button
                    onClick={() => moveFAQ(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <GripVertical className="text-gray-300" size={18} />
                  <button
                    onClick={() => moveFAQ(index, 'down')}
                    disabled={index === formData.faqs.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Question</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Answer</label>
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <button
                  onClick={() => removeFAQ(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg mt-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {formData.faqs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No FAQs yet. Click "Add FAQ" to create one.
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQEditor;
