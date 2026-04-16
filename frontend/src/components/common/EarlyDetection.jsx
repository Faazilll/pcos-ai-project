import React, { useState, useRef } from 'react';

const EarlyDetection = ({ userData, setActiveTab }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const predictRiskCombined = async () => {
    if (!imageFile) {
      alert("Please upload an ultrasound image first.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        " Age (yrs)": userData.age,
        "Weight (Kg)": userData.weight,
        "Height(Cm) ": userData.height,
        "BMI": userData.weight / ((userData.height/100) * (userData.height/100)),
        "Blood Group": 11,
        "Cycle(R/I)": userData.symptoms?.includes('Irregular periods') ? 4 : 2,
        "Weight gain(Y/N)": userData.symptoms?.includes('Weight gain') ? 1 : 0,
        "hair growth(Y/N)": userData.symptoms?.includes('Excess hair growth') ? 1 : 0,
        "Hair loss(Y/N)": userData.symptoms?.includes('Hair loss') ? 1 : 0,
        "Pimples(Y/N)": userData.symptoms?.includes('Acne') ? 1 : 0,
        "Fast food (Y/N)": userData.lifestyleFactors?.includes('High sugar diet') ? 1 : 0,
        "Reg.Exercise(Y/N)": userData.lifestyleFactors?.includes('Regular exercise') ? 1 : 0
      };

      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('clinical_data', JSON.stringify(payload));

      const response = await fetch('http://localhost:5000/api/predict/combined', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      let riskLevel = "Low";
      if (data.risk_score > 70) riskLevel = "High";
      else if (data.risk_score > 30) riskLevel = "Moderate";

      setResult({
        score: Math.round(data.risk_score),
        tabular_score: Math.round(data.tabular_risk),
        image_score: Math.round(data.image_risk),
        level: riskLevel,
        recommendation: data.message + ". " + getRiskRecommendation(riskLevel)
      });
    } catch (err) {
      console.error(err);
      setResult({ score: 0, level: "Error", recommendation: "Failed to reach AI Backend. " + err.message });
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
    }
  };
  
  const getRiskRecommendation = (level) => {
    switch(level) {
      case "Low":
        return "Your risk factors for PCOS/PCOD appear to be low. Continue maintaining a healthy lifestyle with regular check-ups.";
      case "Moderate":
        return "You have some risk factors for PCOS/PCOD. Consider consulting with a healthcare provider for further evaluation.";
      case "High":
        return "You have several risk factors associated with PCOS/PCOD. We strongly recommend consulting with a healthcare provider for proper diagnosis and treatment.";
      default:
        return "Continue to monitor your symptoms and consult with a healthcare provider if you notice any changes.";
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="aura-card">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-teal-400">Diagnostic Hub</h2>
          <div className="bg-teal-500/10 px-4 py-2 rounded-lg border border-teal-500/20">
            <span className="text-teal-400 text-sm font-bold uppercase tracking-widest">Combined AI Analysis</span>
          </div>
        </div>
        
        {!result && !loading && (
           <div className="mb-8 border-2 border-dashed border-slate-600 rounded-2xl p-8 text-center bg-slate-800/50">
             <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
             {imagePreview ? (
               <div className="flex flex-col items-center">
                 <img src={imagePreview} alt="Ultrasound preview" className="max-h-64 object-cover rounded-lg mb-4 border border-slate-600" />
                 <button onClick={() => fileInputRef.current.click()} className="text-teal-400 underline mb-6">Change Image</button>
                 
                 {userData && Object.keys(userData).length > 0 && userData.age ? (
                   <button onClick={predictRiskCombined} className="aura-button">Run Combined Analysis</button>
                 ) : (
                   <div className="mt-4 flex flex-col items-center">
                     <p className="text-amber-400 mb-4 font-bold">Clinical profile is incomplete.</p>
                     <button onClick={() => setActiveTab('onboarding')} className="aura-button mx-auto px-8 py-3">Complete Profile First</button>
                   </div>
                 )}
               </div>
             ) : (
               <div className="flex flex-col items-center py-6">
                 <div className="text-5xl mb-4">🩻 + 🧬</div>
                 <h3 className="text-lg text-white mb-2">Upload Ultrasound Scan & Sync Clinical Data</h3>
                 <p className="text-slate-400 mb-6 max-w-lg">Our dual-model AI analyzes both your clinical profile (symptoms, vitals) and your ovarian ultrasound image to provide a highly accurate combined prediction score.</p>
                 <button onClick={() => fileInputRef.current.click()} className="aura-button-outline">Select Ultrasound Image</button>
                 
                 {(!userData || !userData.age) && (
                   <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl max-w-sm">
                     <p className="text-sm text-amber-200">You also need to complete your profile before generating a prediction.</p>
                     <button onClick={() => setActiveTab('onboarding')} className="text-amber-400 font-bold mt-2 text-sm hover:underline">Complete Profile →</button>
                   </div>
                 )}
               </div>
             )}
           </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-t-teal-500 border-r-sky-500 border-b-pink-500 border-l-purple-500 rounded-full animate-spin"></div>
            <p className="mt-6 text-slate-300 font-medium">Processing dual-modality data via Neural Network...</p>
          </div>
        ) : result ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center p-8 bg-slate-800/50 rounded-3xl border border-slate-700">
              <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Combined AI Risk Assessment</div>
              <div className={`text-7xl font-black mb-2 ${
                result.level === "Low" ? "text-teal-400" : 
                result.level === "Moderate" ? "text-yellow-400" : 
                "text-pink-500"
              }`}>
                {result.score}%
              </div>
              <div className={`text-2xl font-bold mb-6 ${
                result.level === "Low" ? "text-teal-400" : 
                result.level === "Moderate" ? "text-yellow-400" : 
                "text-pink-500"
              }`}>
                {result.level} Risk
              </div>

              <div className="flex gap-8 text-center border-t border-slate-700 pt-6 w-full max-w-md justify-center">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Clinical Model</div>
                  <div className="text-xl font-bold text-sky-400">{result.tabular_score}%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Imaging Model</div>
                  <div className="text-xl font-bold text-pink-400">{result.image_score}%</div>
                </div>
              </div>
            </div>
            
            <div className="aura-card bg-slate-800/80">
              <h3 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-400">⚡</span> Clinical Recommendation
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">{result.recommendation}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
               <div className="aura-card p-6 bg-slate-800/80 hover:-translate-y-1 transition-transform">
                 <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold mb-4">1</div>
                 <h4 className="text-lg text-white font-bold mb-2">Monitor Trends</h4>
                 <p className="text-sm text-slate-400 mb-4">Log symptoms daily.</p>
                 <button onClick={() => setActiveTab('tracker')} className="text-teal-400 text-sm font-bold hover:underline">Launch Tracker →</button>
               </div>
               <div className="aura-card p-6 bg-slate-800/80 hover:-translate-y-1 transition-transform">
                 <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold mb-4">2</div>
                 <h4 className="text-lg text-white font-bold mb-2">Adjust Lifestyle</h4>
                 <p className="text-sm text-slate-400 mb-4">View your custom plan.</p>
                 <button onClick={() => setActiveTab('resources')} className="text-sky-400 text-sm font-bold hover:underline">View Guidelines →</button>
               </div>
               <div className="aura-card p-6 bg-slate-800/80 hover:-translate-y-1 transition-transform">
                 <div className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center font-bold mb-4">3</div>
                 <h4 className="text-lg text-white font-bold mb-2">Seek Expertise</h4>
                 <p className="text-sm text-slate-400 mb-4">Consult a specialist.</p>
                 <button onClick={() => setActiveTab('doctors')} className="text-pink-500 text-sm font-bold hover:underline">Find Doctors →</button>
               </div>
            </div>
            
            <div className="text-center pt-4">
              <button 
                onClick={() => { setResult(null); setImageFile(null); setImagePreview(null); }}
                className="aura-button-outline mx-auto"
              >
                Run Another Analysis
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EarlyDetection;