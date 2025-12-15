import React from 'react';
import MinimalTemplate from './templates/MinimalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';

const ResumePreview = ({ resumeData, selectedTemplate }) => {
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      default:
        return <MinimalTemplate data={resumeData} />;
    }
  };

  return (
    <div id="resume-preview" className="bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h2>
      <div className="border border-gray-300 bg-white p-8" style={{ minHeight: '800px' }}>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
