import React from 'react';

const ResumeForm = ({ resumeData, setResumeData, selectedTemplate, setSelectedTemplate }) => {
  const handleInputChange = (field, value) => {
    setResumeData({ ...resumeData, [field]: value });
  };

  const handleArrayChange = (field, index, key, value) => {
    const updated = [...resumeData[field]];
    updated[index][key] = value;
    setResumeData({ ...resumeData, [field]: updated });
  };

  const addItem = (field, template) => {
    setResumeData({ ...resumeData, [field]: [...resumeData[field], template] });
  };

  const removeItem = (field, index) => {
    const updated = resumeData[field].filter((_, i) => i !== index);
    setResumeData({ ...resumeData, [field]: updated });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Resume Details</h2>

      {/* Template Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Template Style
        </label>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="minimal">Minimal</option>
          <option value="modern">Modern</option>
          <option value="professional">Professional Corporate</option>
        </select>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Personal Information</h3>
        
        <input
          type="text"
          placeholder="Full Name *"
          value={resumeData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="email"
          placeholder="Email (optional)"
          value={resumeData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={resumeData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Career Objective */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Career Objective (optional)
        </label>
        <textarea
          placeholder="Brief career objective or summary"
          value={resumeData.objective}
          onChange={(e) => handleInputChange('objective', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Education */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Education</h3>
          <button
            onClick={() => addItem('education', { degree: '', institution: '', year: '', gpa: '' })}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            + Add
          </button>
        </div>
        
        {resumeData.education.map((edu, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded space-y-2">
            <input
              type="text"
              placeholder="Degree / Qualification"
              value={edu.degree}
              onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Institution / University"
              value={edu.institution}
              onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="GPA/Percentage"
                value={edu.gpa}
                onChange={(e) => handleArrayChange('education', index, 'gpa', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {resumeData.education.length > 1 && (
              <button
                onClick={() => removeItem('education', index)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skills (comma-separated)
        </label>
        <textarea
          placeholder="JavaScript, React, Python, SQL, Communication, Leadership"
          value={resumeData.skills}
          onChange={(e) => handleInputChange('skills', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Projects */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Projects</h3>
          <button
            onClick={() => addItem('projects', { title: '', description: '', technologies: '' })}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            + Add
          </button>
        </div>
        
        {resumeData.projects.map((project, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded space-y-2">
            <input
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description and achievements"
              value={project.description}
              onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Technologies used"
              value={project.technologies}
              onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {resumeData.projects.length > 1 && (
              <button
                onClick={() => removeItem('projects', index)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Experience / Internships</h3>
          <button
            onClick={() => addItem('experience', { role: '', company: '', duration: '', responsibilities: '' })}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            + Add
          </button>
        </div>
        
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded space-y-2">
            <input
              type="text"
              placeholder="Role / Position"
              value={exp.role}
              onChange={(e) => handleArrayChange('experience', index, 'role', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Company / Organization"
              value={exp.company}
              onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Duration (e.g., Jan 2023 - Mar 2023)"
              value={exp.duration}
              onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Key responsibilities and achievements (use bullet points with -)"
              value={exp.responsibilities}
              onChange={(e) => handleArrayChange('experience', index, 'responsibilities', e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {resumeData.experience.length > 1 && (
              <button
                onClick={() => removeItem('experience', index)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certifications (one per line)
        </label>
        <textarea
          placeholder="AWS Certified Solutions Architect&#10;Google Analytics Certification"
          value={resumeData.certifications}
          onChange={(e) => handleInputChange('certifications', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Achievements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Achievements (one per line)
        </label>
        <textarea
          placeholder="Winner of National Hackathon 2023&#10;Published research paper in IEEE"
          value={resumeData.achievements}
          onChange={(e) => handleInputChange('achievements', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default ResumeForm;
