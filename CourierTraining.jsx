import React, { useState, useEffect } from 'react';
import { Menu, CheckCircle, Circle, Home, Shield, Droplet, Book, ChevronRight, ChevronLeft } from 'lucide-react';

// Import the content data
import coreContent from './core-content.json';
import hipaaContent from './hipaa-content.json';
import bloodborneContent from './bloodborne-content.json';

// Main App Component
export default function CourierTraining() {
  const [currentModule, setCurrentModule] = useState('home');
  const [completedModules, setCompletedModules] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('completedModules');
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
  }, []);

  const markComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      const updated = [...completedModules, moduleId];
      setCompletedModules(updated);
      localStorage.setItem('completedModules', JSON.stringify(updated));
    }
  };

  const modules = [
    { id: 'core', name: 'Core Competencies', icon: Book, content: coreContent },
    { id: 'hipaa', name: 'HIPAA Compliance', icon: Shield, content: hipaaContent },
    { id: 'bloodborne', name: 'Bloodborne Pathogens', icon: Droplet, content: bloodborneContent }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="mr-4 p-2 rounded-md hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Medical Courier Training
              </h1>
            </div>
            <button
              onClick={() => setCurrentModule('home')}
              className="p-2 rounded-md hover:bg-gray-100"
              title="Home"
            >
              <Home className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <aside className={`
          ${menuOpen ? 'block' : 'hidden'} lg:block
          w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] p-6 fixed lg:sticky top-16 left-0 z-40
        `}>
          <nav className="space-y-2">
            {modules.map((module) => {
              const Icon = module.icon;
              const isCompleted = completedModules.includes(module.id);
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    setCurrentModule(module.id);
                    setMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-colors text-left
                    ${currentModule === module.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 font-medium">{module.name}</span>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300" />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 lg:ml-64">
          {currentModule === 'home' && (
            <HomeView 
              modules={modules} 
              completedModules={completedModules}
              onSelectModule={setCurrentModule}
            />
          )}
          {currentModule === 'core' && (
            <ModuleView 
              content={coreContent}
              onComplete={() => markComplete('core')}
              isCompleted={completedModules.includes('core')}
            />
          )}
          {currentModule === 'hipaa' && (
            <ModuleView 
              content={hipaaContent}
              onComplete={() => markComplete('hipaa')}
              isCompleted={completedModules.includes('hipaa')}
            />
          )}
          {currentModule === 'bloodborne' && (
            <ModuleView 
              content={bloodborneContent}
              onComplete={() => markComplete('bloodborne')}
              isCompleted={completedModules.includes('bloodborne')}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// Home View Component
function HomeView({ modules, completedModules, onSelectModule }) {
  const progress = (completedModules.length / modules.length) * 100;

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Medical Courier Training Study Guide
      </h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <p className="text-gray-700 leading-relaxed mb-4">
          This is a free study guide for people who need to take medical courier compliance training. 
          It won't replace your employer's required courses, but it will make them less painful by 
          covering the material clearly and without the corporate nonsense.
        </p>
        <p className="text-sm text-gray-600 italic">
          <strong>Disclaimer:</strong> This is supplementary educational material only. It does not 
          replace employer-required or state-mandated training, and completion does not constitute 
          certification.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Your Progress</span>
          <span className="text-sm text-gray-600">
            {completedModules.length} of {modules.length} modules
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Module Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {modules.map((module) => {
          const Icon = module.icon;
          const isCompleted = completedModules.includes(module.id);
          const chapterCount = module.content.chapters.length;
          
          return (
            <button
              key={module.id}
              onClick={() => onSelectModule(module.id)}
              className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                {isCompleted && (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {module.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {chapterCount} chapters
              </p>
              <p className="text-xs text-gray-500">
                {isCompleted ? 'Completed' : 'Not started'}
              </p>
            </button>
          );
        })}
      </div>

      {/* What You'll Learn */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          What's Covered
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Core Competencies</h4>
            <p className="text-gray-600 text-sm">
              Route planning, specimen handling, documentation, vehicle safety, professional communication, 
              and everything you need to know about actually doing the job.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">HIPAA Compliance</h4>
            <p className="text-gray-600 text-sm">
              Privacy rules, security requirements, breach protocols, and practical scenarios. 
              What you actually need to know, not just the legal boilerplate.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Bloodborne Pathogens</h4>
            <p className="text-gray-600 text-sm">
              OSHA requirements, exposure prevention, PPE usage, spill response, and post-exposure procedures. 
              The safety stuff that actually matters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Module View Component
function ModuleView({ content, onComplete, isCompleted }) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState(new Set([0]));

  const currentChapter = content.chapters[currentChapterIndex];

  const toggleSection = (index) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const goToChapter = (index) => {
    setCurrentChapterIndex(index);
    setExpandedSections(new Set([0]));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = (item) => {
    switch (item.type) {
      case 'subheading':
        return (
          <h4 key={Math.random()} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            {item.text}
          </h4>
        );
      case 'paragraph':
        return (
          <p key={Math.random()} className="text-gray-700 mb-4 leading-relaxed">
            {item.text}
          </p>
        );
      case 'list':
        const ListTag = item.ordered ? 'ol' : 'ul';
        return (
          <ListTag 
            key={Math.random()} 
            className={`mb-4 ml-6 space-y-2 ${item.ordered ? 'list-decimal' : 'list-disc'}`}
          >
            {item.items.map((listItem, i) => (
              <li key={i} className="text-gray-700">{listItem}</li>
            ))}
          </ListTag>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Module Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {content.title.replace(/📘|📋|🩸|Table of Contents/, '').trim()}
        </h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>{content.chapters.length} chapters</span>
          {isCompleted && (
            <span className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              Completed
            </span>
          )}
        </div>
      </div>

      {/* Chapter Navigation */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">Chapters</h3>
          <span className="text-sm text-gray-600">
            {currentChapterIndex + 1} of {content.chapters.length}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {content.chapters.map((chapter, index) => (
            <button
              key={index}
              onClick={() => goToChapter(index)}
              className={`
                px-3 py-2 rounded text-sm text-left transition-colors
                ${index === currentChapterIndex
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
              `}
              title={chapter.title}
            >
              <span className="font-medium">Ch {index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Chapter Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {currentChapter.title.replace(/📘|📦|⚖️|🔐|🩺|🧬|🚨|💼|🗣️|🚗|📝|✅|🩸|🦠|🧤|⚠️|🏥|📋|🎯|🧾/, '').trim()}
        </h3>

        {currentChapter.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <button
              onClick={() => toggleSection(sectionIndex)}
              className="w-full flex items-center justify-between text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <h4 className="text-lg font-semibold text-gray-900">
                {section.title.replace(/📘|🎯|🧾|🚚|👥|📦|🤝|📈|📝|❓|📌|🛣️|🏛️|🚛|💊|⚕️|🧪|📊|📄|⏰|🔐|📱|💻|🚨|🗂️|🩺|🧬|💼|🗣️|🚗|✅|🩸|🦠|🧤|⚠️|🏥|🧼|💉|📋/, '').trim()}
              </h4>
              <ChevronRight 
                className={`h-5 w-5 text-gray-500 transition-transform ${
                  expandedSections.has(sectionIndex) ? 'rotate-90' : ''
                }`}
              />
            </button>
            
            {expandedSections.has(sectionIndex) && (
              <div className="p-6 border-l-2 border-gray-200 ml-4 mt-2">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {renderContent(item)}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation and Complete Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => goToChapter(currentChapterIndex - 1)}
          disabled={currentChapterIndex === 0}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>

        {!isCompleted && currentChapterIndex === content.chapters.length - 1 && (
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Mark Module Complete
          </button>
        )}

        <button
          onClick={() => goToChapter(currentChapterIndex + 1)}
          disabled={currentChapterIndex === content.chapters.length - 1}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
