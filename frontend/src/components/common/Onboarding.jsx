import React, { useState } from 'react';

const Onboarding = ({ setActiveTab, setUserData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    condition: 'unknown', // 'pcos', 'pcod', 'unknown'
    familyHistory: false,
    lifestyleFactors: [],
    symptoms: []
  });

  const lifestyleOptions = [
    'Sedentary lifestyle',
    'High sugar diet',
    'Stressful job/life',
    'Irregular sleep',
    'Smoking',
    'Alcohol consumption',
    'Regular exercise',
    'Balanced diet'
  ];

  const symptomOptions = [
    'Irregular periods',
    'Heavy bleeding',
    'Acne',
    'Weight gain',
    'Hair loss',
    'Excess hair growth',
    'Fatigue',
    'Mood swings',
    'Pelvic pain',
    'Headaches',
    'None of the above'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'lifestyleFactors' || name === 'symptoms') {
        setFormData(prev => {
          const updatedArray = checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value);
          
          return { ...prev, [name]: updatedArray };
        });
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    setActiveTab('assessment');
  };

  const calculateBMI = () => {
    if (formData.weight && formData.height) {
      const heightInMeters = formData.height / 100;
      const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      return bmi;
    }
    return null;
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      <div className="aura-card relative overflow-hidden bg-slate-800/80 backdrop-blur-sm border-slate-700/50">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[50px] rounded-full" />
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6 flex items-center gap-2">
          <span className="text-teal-400">📋</span> Create Clinical Profile
        </h2>
        
        <div className="mb-8 flex justify-between gap-2">
          {[1, 2, 3].map(num => (
            <div 
              key={num} 
              className={`flex-1 h-2 rounded-full transition-colors duration-500 ${step >= num ? 'bg-teal-500' : 'bg-slate-700'}`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
              <h3 className="text-xl text-teal-300 mb-6 font-semibold">Basic Demographics</h3>
              
              <div className="mb-4">
                <label className="block text-slate-300 font-medium mb-2 text-sm uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="aura-input"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-slate-300 font-medium mb-2 text-sm uppercase tracking-wider">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="aura-input"
                  min="12"
                  max="80"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="mb-4">
                  <label className="block text-slate-300 font-medium mb-2 text-sm uppercase tracking-wider">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="aura-input"
                    min="30"
                    max="200"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-slate-300 font-medium mb-2 text-sm uppercase tracking-wider">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="aura-input"
                    min="120"
                    max="220"
                    required
                  />
                </div>
              </div>
              
              {calculateBMI() && (
                <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-teal-300 text-sm font-semibold uppercase tracking-wider">Calculated BMI</p>
                    <p className="text-3xl font-bold text-white">{calculateBMI()}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
              <h3 className="text-xl text-teal-300 mb-6 font-semibold">Clinical Status</h3>
              
              <div className="mb-8">
                <label className="block text-slate-300 font-medium mb-4 text-sm uppercase tracking-wider">Do you have an existing diagnosis?</label>
                <div className="grid grid-cols-3 gap-4">
                  <label className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${formData.condition === 'pcos' ? 'border-teal-500 bg-teal-500/10' : 'border-slate-700 bg-slate-800 hover:border-slate-500'}`}>
                    <input
                      type="radio"
                      name="condition"
                      value="pcos"
                      checked={formData.condition === 'pcos'}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="text-center">
                      <span className="block text-xl font-bold mb-1 text-white">PCOS</span>
                      <span className="text-xs text-teal-400 font-medium tracking-wide">DIAGNOSED</span>
                    </div>
                  </label>
                  
                  <label className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${formData.condition === 'pcod' ? 'border-teal-500 bg-teal-500/10' : 'border-slate-700 bg-slate-800 hover:border-slate-500'}`}>
                    <input
                      type="radio"
                      name="condition"
                      value="pcod"
                      checked={formData.condition === 'pcod'}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="text-center">
                      <span className="block text-xl font-bold mb-1 text-white">PCOD</span>
                      <span className="text-xs text-teal-400 font-medium tracking-wide">DIAGNOSED</span>
                    </div>
                  </label>
                  
                  <label className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${formData.condition === 'unknown' ? 'border-teal-500 bg-teal-500/10' : 'border-slate-700 bg-slate-800 hover:border-slate-500'}`}>
                    <input
                      type="radio"
                      name="condition"
                      value="unknown"
                      checked={formData.condition === 'unknown'}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="text-center">
                      <span className="block text-xl font-bold mb-1 text-white">None</span>
                      <span className="text-xs text-slate-400 font-medium tracking-wide">UNDIAGNOSED</span>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 mt-6">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="familyHistory"
                      checked={formData.familyHistory}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-slate-500 text-teal-500 focus:ring-teal-500 focus:ring-offset-slate-900 bg-slate-700 mr-3 cursor-pointer"
                    />
                  </div>
                  <span className="text-white font-medium group-hover:text-teal-400 transition-colors">Family history of PCOS/PCOD</span>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-300">
              <h3 className="text-xl text-teal-300 mb-6 font-semibold">Lifestyle & Symptoms Matrix</h3>
              
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                <label className="block text-slate-300 font-medium mb-4 text-sm uppercase tracking-wider">Lifestyle Factors</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lifestyleOptions.map(option => (
                    <label key={option} className={`flex items-center cursor-pointer p-4 rounded-xl border transition-all ${formData.lifestyleFactors.includes(option) ? 'border-teal-500 bg-teal-500/10 text-white' : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'}`}>
                      <input
                        type="checkbox"
                        name="lifestyleFactors"
                        value={option}
                        checked={formData.lifestyleFactors.includes(option)}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-slate-500 text-teal-500 mr-3 cursor-pointer"
                      />
                      <span className="font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                <label className="block text-slate-300 font-medium mb-4 text-sm uppercase tracking-wider">Active Symptoms</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {symptomOptions.map(option => (
                    <label key={option} className={`flex items-center cursor-pointer p-4 rounded-xl border transition-all ${formData.symptoms.includes(option) ? 'border-sky-500 bg-sky-500/10 text-white' : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'}`}>
                      <input
                        type="checkbox"
                        name="symptoms"
                        value={option}
                        checked={formData.symptoms.includes(option)}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-slate-500 text-sky-500 mr-3 cursor-pointer"
                      />
                      <span className="font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-10">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={prevStep}
                className="px-6 py-3 rounded-xl border-2 border-slate-600 text-slate-300 font-bold hover:bg-slate-700 transition-colors"
              >
                ← Back
              </button>
            ) : (
              <button 
                type="button" 
                onClick={() => setActiveTab('home')}
                className="px-6 py-3 rounded-xl border-2 border-slate-700 text-slate-400 font-bold hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
            )}
            
            {step < 3 ? (
              <button 
                type="button" 
                onClick={nextStep}
                className="aura-button"
              >
                Proceed →
              </button>
            ) : (
              <button 
                type="submit"
                className="aura-button bg-gradient-to-r from-teal-500 to-sky-500 border-none shadow-[0_0_20px_rgba(20,184,166,0.4)]"
              >
                Initialize Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;