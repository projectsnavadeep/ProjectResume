import React from 'react';

const MinimalTemplate = ({ data }) => {
  const formatBullets = (text) => {
    if (!text) return [];
    return text.split('\n').filter(line => line.trim());
  };

  return (
    <div className="font-serif text-black" style={{ fontSize: '11pt', lineHeight: '1.4' }}>
      {/* Header */}
      <div className="text-center mb-4 pb-3 border-b-2 border-black">
        <h1 className="text-3xl font-bold mb-1">{data.fullName || 'YOUR NAME'}</h1>
        <div className="text-sm">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span className="mx-2">|</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </div>

      {/* Objective */}
      {data.objective && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase mb-1 border-b border-black">Objective</h2>
          <p className="text-sm">{data.objective}</p>
        </div>
      )}

      {/* Education */}
      {data.education.some(e => e.degree || e.institution) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase mb-1 border-b border-black">Education</h2>
          {data.education.map((edu, index) => (
            edu.degree || edu.institution ? (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-bold">{edu.degree}</span>
                  <span>{edu.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="italic">{edu.institution}</span>
                  {edu.gpa && <span>{edu.gpa}</span>}
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase mb-1 border-b border-black">Skills</h2>
          <p className="text-sm">{data.skills}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.some(e => e.role || e.company) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase mb-1 border-b border-black">Experience</h2>
          {data.experience.map((exp, index) => (
            exp.role || exp.company ? (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-bold">{exp.role}</span>
                  <span>{exp.duration}</span>
                </div>
                <div className="italic mb-1">{exp.company}</div>
                {exp.responsibilities && (
                  <ul className="list-disc ml-5 text-sm">
                    {formatBullets(exp.responsibilities).map((bullet, i) => (
                      <li key={i}>{bullet.replace(/^[-•]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.some(p => p.title) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase mb-1 border-b border-black">Projects</h2>
          {data.projects.map((project, index) => (
            project.title ? (
              <div key={index} className="mb-3">
                <div className="font-bold">{project.title}</div>
                {project.technologies && (
                  <div className="italic text-sm">{project.technologies}</div>
                )}
                {project.description && (
                  <ul className="list-disc ml-5 text-sm">
                    {formatBullets(project.description).map((bullet, i) => (
                      <li key={i}>{bullet.replace(/^[-•]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* Certifications */}
      {data.certifications && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase mb-1 border-b border-black">Certifications</h2>
          <ul className="list-disc ml-5 text-sm">
            {formatBullets(data.certifications).map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {data.achievements && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase mb-1 border-b border-black">Achievements</h2>
          <ul className="list-disc ml-5 text-sm">
            {formatBullets(data.achievements).map((achievement, i) => (
              <li key={i}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
