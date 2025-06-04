// import AsideComp from "@/components/Aside";
// import { useState } from "react";
// import { MicOff, Mic } from "lucide-react";
// import useSpeechRecognition from "@/hooks/useSpeechRecognitionHook";

// const EntriesPage = () => {
//   const [userName, setUsername] = useState("Tolu");
//   const [error, setError] = useState("");

//   const {
//     text,
//     isListening,
//     startListening,
//     stopListening,
//     hasRecognitionSupport,
//     setText
//         } = useSpeechRecognition()

    
//   return (
//     <div className="bg-[#1C1D1E] ">
//       <AsideComp />
//       <div className="text-black min-h-screen mx-auto w-[70%] md:w-[80%]  pt-5 p-2 max-[500px]:ms-20">
      
//         {/* Entry Container */}
//         <div className="border border-white p-2 flex flex-col gap-6 text-white">
//           <div className="text-2xl sm:text-4xl  text-center font-bold ">
//             Welcome back, {userName}! 🌟
//           </div>

//           <div className="border border-green-500 grid grid-cols-1 sm:grid-cols-2 p-2 gap-5">

//             <div className="border border-pink-600 flex flex-col items-center gap-4">
//               <h1>Your Journal Entry</h1>
//               {/* Recording button */}
//               <div className="flex flex-col items-center gap-2">
//                 <button
//                   className="bg-[#BB85FB] rounded-full size-10 flex justify-center items-center cursor-pointer"
//                   onClick={startListening}
//                 >
//                   <Mic className="h-8 w-8"  />
//                 </button>
//                 <span>
//                     Click to start voice recording
//                 </span>
//               </div>

//                 {/* Text Input */}
//                 <div>
//                   <textarea
//                   cols={55}
                  
//                     value={text}
                    
//                     onChange={(e) => setText(e.target.value)}
//                     placeholder="Share your thoughts, feelings, or experiences here... You can also use the microphone above to speak your journal entry."
//                     className="min-h-[200px] w-[100%] bg-white border-purple-200 focus:border-purple-400 focus:ring-purple-400 text-purple-800 placeholder:text-purple-400 rounded-md"
//                   />
//                 </div>
//                 {/* error */}
//                {/* {hasRecognitionSupport ? setError(`Your browser doesn't support speech recognition`): setError('')}
//                {error} */}

//             </div>
//             {/* Meant to be for AI Analysis */}
//             <div className="border border-yellow-600"> yo</div>
//           </div>

//           <div className="border border-green-500 flex flex-col  p-2 gap-2">
//             <span>Recent Journal Entries</span>

//             <div className="border border-white">one</div>

//             <div className="border border-white">two</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EntriesPage;

import {  useState } from "react";
import { MicOff, Mic, Send, BookOpen, Sparkles, Calendar, User, Volume2, Save } from "lucide-react";
import useSpeechRecognition from "@/hooks/useSpeechRecognitionHook";


const EntriesPage = () => {
  const [userName, setUsername] = useState("Tolu");
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedEntries, setSavedEntries] = useState([
    {
      id: 1,
      date: "Today",
      preview: "Had a wonderful day exploring new possibilities...",
      mood: "😊"
    },
    {
      id: 2,
      date: "Yesterday",
      preview: "Reflecting on the challenges and growth from this week...",
      mood: "🤔"
    }
  ]);

  const {
    text,
    setText,
    isListening,
    interimText,
    toggleListening,
    hasRecognitionSupport
  } = useSpeechRecognition();

  // Simulate AI Analysis (Replace with actual GPT API call)
  const analyzeWithAI = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    
    // TODO: Replace with actual GPT API call
    setTimeout(() => {
      setAiAnalysis(`Based on your journal entry, I can sense themes of growth and self-reflection. Your words show resilience and a positive outlook. Here are some insights:

🌱 **Growth Mindset**: You're embracing challenges as opportunities
✨ **Emotional Awareness**: Strong connection with your feelings
🎯 **Goal-Oriented**: Clear focus on personal development

**Affirmation for you**: "I am growing stronger with each experience and my journey is uniquely mine."`);
      setIsAnalyzing(false);
    }, 2000);
  };

  const saveJournalEntry = () => {
    if (!text.trim()) return;
    
    const newEntry = {
      id: savedEntries.length + 1,
      date: new Date().toLocaleDateString(),
      preview: text.substring(0, 50) + "...",
      mood: "✨"
    };
    
    setSavedEntries([newEntry, ...savedEntries]);
    setText("");
    setAiAnalysis("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black bg-opacity-20 backdrop-blur-sm border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-purple-300" />
              <h1 className="text-2xl font-bold text-white">MindSpace Journal</h1>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-purple-300" />
              <span className="text-white font-medium">{userName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome back, {userName}! 🌟
          </h2>
          <p className="text-xl text-purple-200">
            Your thoughts matter. Let's capture them together.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Journal Entry Section */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-purple-300" />
              <h3 className="text-2xl font-bold text-white">Your Journal Entry</h3>
            </div>

            {/* Voice Recording Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <button
                  onClick={toggleListening}
                  disabled={!hasRecognitionSupport}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isListening
                      ? "bg-red-500 hover:bg-red-600 animate-pulse"
                      : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  } ${
                    !hasRecognitionSupport ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="h-8 w-8 text-white" />
                  ) : (
                    <Mic className="h-8 w-8 text-white" />
                  )}
                </button>
                
                {isListening && (
                  <div className="absolute -inset-2 rounded-full border-4 border-red-400 animate-ping"></div>
                )}
              </div>
              
              <p className="text-center text-purple-200 mt-3">
                {!hasRecognitionSupport
                  ? "Speech recognition not supported in your browser"
                  : isListening
                  ? "🎤 Listening... Click to stop"
                  : "🎤 Click to start voice recording"}
              </p>
            </div>

            {/* Text Input */}
            <div className="mb-6">
              <textarea
                value={text + interimText}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts, feelings, or experiences here... You can also use the microphone above to speak your journal entry."
                className="w-full h-64 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-xl p-4 text-black placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
              />
              {interimText && (
                <p className="text-purple-300 text-sm mt-2">
                  Interim: {interimText}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={analyzeWithAI}
                disabled={!text.trim() || isAnalyzing}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
              </button>
              
              <button
                onClick={saveJournalEntry}
                disabled={!text.trim()}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Save className="h-5 w-5" />
                Save
              </button>
            </div>
          </div>

          {/* AI Analysis Section */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-6 w-6 text-yellow-300" />
              <h3 className="text-2xl font-bold text-white">AI Insights & Affirmations</h3>
            </div>

            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-4"></div>
                <p className="text-purple-200">Analyzing your thoughts...</p>
              </div>
            ) : aiAnalysis ? (
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 h-64 overflow-y-auto">
                <div className="text-white whitespace-pre-line leading-relaxed">
                  {aiAnalysis}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <BookOpen className="h-16 w-16 text-purple-300 mb-4 opacity-50" />
                <p className="text-purple-200 text-center">
                  Write or record your journal entry, then click "Analyze with AI" to get personalized insights and affirmations.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Entries Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-6 w-6 text-blue-300" />
            <h3 className="text-2xl font-bold text-white">Recent Journal Entries</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20 hover:bg-opacity-30 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-200 text-sm">{entry.date}</span>
                  <span className="text-2xl">{entry.mood}</span>
                </div>
                <p className="text-white text-sm leading-relaxed">{entry.preview}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntriesPage;
