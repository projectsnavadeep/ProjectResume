import { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import ExportButtons from './components/ExportButtons';

function App() {
  const [resumeData, setResumeData] = useState({
    fullName: '',
    email: '',
    phone: '',
    objective: '',
    education: [{ degree: '', institution: '', year: '', gpa: '' }],
    skills: '',
    projects: [{ title: '', description: '', technologies: '' }],
    experience: [{ role: '', company: '', duration: '', responsibilities: '' }],
    certifications: '',
    achievements: ''
  });

  const [selectedTemplate, setSelectedTemplate] = useState('minimal');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">CleanCV</h1>
          <p className="text-sm text-gray-600">Professional Resume Generator</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <ResumeForm 
              resumeData={resumeData}
              setResumeData={setResumeData}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
          </div>
          
          <div className="sticky top-8 h-fit">
            <div className="bg-white p-6 rounded-lg shadow mb-4">
              <ExportButtons 
                resumeData={resumeData}
                selectedTemplate={selectedTemplate}
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              <ResumePreview 
                resumeData={resumeData}
                selectedTemplate={selectedTemplate}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
