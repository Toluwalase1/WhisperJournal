import { useState } from "react"
import { useUserHook } from "@/lib/context/userContext";
import { useEffect, useState } from "react";
let mediaRecorderRef: MediaRecorder | null = null;
let socketRef: WebSocket | null = null;
let streamRef: MediaStream | null = null;

export const useJournalActions = () => {
    const [loading, setLoading] = useState<boolean>()
    const [error, setError] = useState(null)
      const { user } = useUserHook();
  const [journals, setJournals] = useState();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const key = import.meta.env.VITE_DEEPGRAM;

  useEffect(() => {
    const getJournals = async () => {
      const response = await fetch("http://localhost:3000/user/journals", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setJournals(json);
      }
    };
    getJournals();
  }, []);

  const handleRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef = mediaRecorder;

      const socket = new WebSocket("wss://api.deepgram.com/v1/listen", [
        "token",
        key,
      ]);
      socketRef = socket;

      socket.onopen = () => {
        mediaRecorder.addEventListener("dataavailable", (event) => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(event.data);
          }
        });
        mediaRecorder.start(100);
      };

      const fullMessage: string[] = text ? [text] : [""];

      socket.onmessage = (message) => {
        const receivedMessage = JSON.parse(message.data);
        const transcript = receivedMessage.channel.alternatives[0].transcript;

        if (transcript && transcript.trim() !== "") {
          fullMessage.push(transcript);
          const filteredMessage = fullMessage.filter((t) => t !== "");
          setText(filteredMessage.join(" ").trim());
        }
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Error starting recording:", error);
      // Clean up if there's an error
      stopRecording();
    }
  };

  const stopRecording = () => {
    // 1. Stop MediaRecorder (if exists)
    if (mediaRecorderRef && mediaRecorderRef.state !== "inactive") {
      mediaRecorderRef.stop(); // Stops recording
      mediaRecorderRef = null;
    }

    // 2. Close WebSocket (if open)
    if (socketRef && socketRef.readyState === WebSocket.OPEN) {
      socketRef.close(); // Closes Deepgram connection
      socketRef = null;
    }

    // 3. Stop microphone tracks (if stream exists)
    if (streamRef) {
      streamRef.getTracks().forEach((track) => track.stop());
      streamRef = null;
    }

    setRecording(false); // Update UI state
  };

    const addJournal = async (title: string, body: string) => {
        setLoading(true)

        const response = await fetch('http://localhost:3000/user/new-journal', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({title, body})
        }
        )

        console.log('before json',response)
        const json = await response.json()
        console.log('after json',json)

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            setLoading(false)
        }
    }

    return {
        addJournal,
        loading,
        error,
        user,
        title,
        text,
        recording,
        journals,
        handleRecording,
        stopRecording,
        setRecording
    }

}