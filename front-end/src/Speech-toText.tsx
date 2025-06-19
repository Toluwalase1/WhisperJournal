import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Settings, Copy, Trash2, Save } from 'lucide-react';

interface TranscriptionResult {
  text: string;
  timestamp: number;
  id: string;
}

interface ElevenLabsConfig {
  apiKey: string;
  language: string;
  model: string;
}

const SpeechToTextApp: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptions, setTranscriptions] = useState<TranscriptionResult[]>([]);
  const [config, setConfig] = useState<ElevenLabsConfig>({
    apiKey: 'sk_c60271ca4f6ef59392cd4e15dd86d9b8cfabf754ede54419',
    language: 'en',
    model: 'scribe-v1'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout>();
  const silenceTimerRef = useRef<NodeJS.Timeout>();

  // Process audio chunks every 3 seconds of speech
  const processAudio = async () => {
    if (audioChunksRef.current.length === 0) return;

    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
      ? 'audio/webm;codecs=opus' 
      : 'audio/webm';
    
    const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
    audioChunksRef.current = [];

    if (!config.apiKey) {
      setError('API key is required');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('model', config.model);
      
      if (config.language !== 'auto') {
        formData.append('language', config.language);
      }

      const response = await fetch('https://api.elevenlabs.io//v1/speech-to-text', {
        method: 'POST',
        headers: {
          'xi-api-key': config.apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.text) {
        const transcription: TranscriptionResult = {
          text: result.text,
          timestamp: Date.now(),
          id: `${Date.now()}-${Math.random()}`,
        };
        
        setTranscriptions(prev => [...prev, transcription]);
      }
    } catch (error) {
      console.error('Transcription error:', error);
      setError(error instanceof Error ? error.message : 'Failed to transcribe audio');
    } finally {
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    try {
      setError(null);
      setRecordingDuration(0);
      
      audioStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
        ? 'audio/webm;codecs=opus' 
        : 'audio/webm';
      
      mediaRecorderRef.current = new MediaRecorder(audioStreamRef.current, {
        mimeType: mimeType,
        audioBitsPerSecond: 128000
      });

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          
          // Reset silence timer whenever we get new data
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }
          
          // Process audio after 3 seconds of silence
          silenceTimerRef.current = setTimeout(() => {
            processAudio();
          }, 3000);
        }
      };

      mediaRecorderRef.current.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setError('Recording error occurred');
      };

      // Start recording and request data every 1 second
      mediaRecorderRef.current.start();
      mediaRecorderRef.current.requestData();
      setIsRecording(true);

      // Request data periodically
      const dataInterval = setInterval(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.requestData();
        }
      }, 1000);

      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

      return () => {
        clearInterval(dataInterval);
      };
    } catch (error) {
      console.error('Error starting recording:', error);
      setError(error instanceof Error ? error.message : 'Failed to start recording');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }

    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
      audioStreamRef.current = null;
    }

    // Process any remaining audio chunks
    if (audioChunksRef.current.length > 0) {
      processAudio();
    }
  };

  // ... (keep the existing copyToClipboard, clearTranscriptions, saveTranscription functions)

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header and Settings Panel (keep the same structure) */}

        {/* Recording Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Record Button */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!config.apiKey || isProcessing}
              className={`p-6 rounded-full shadow-lg transition-all duration-300 ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white scale-110'
                  : 'bg-purple-600 hover:bg-purple-700 text-white hover:scale-105'
              } ${
                (!config.apiKey || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
            </button>

            {/* Status Indicators */}
            {isRecording && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-medium">Recording: {formatDuration(recordingDuration)}</span>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="font-medium">Processing speech...</span>
              </div>
            )}

            {/* Action Buttons (keep the same) */}
          </div>
        </div>

        {/* Live Transcription Display */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Live Transcription</h2>
            <div className="text-sm text-gray-500">
              {transcriptions.length} segment{transcriptions.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {transcriptions.length > 0 ? (
              transcriptions.map((transcription) => (
                <div
                  key={transcription.id}
                  className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
                >
                  <p className="text-gray-800 font-medium">{transcription.text}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Mic size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">
                  {config.apiKey ? 'Click the microphone to start speaking' : 'Enter your API key to begin'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToTextApp;