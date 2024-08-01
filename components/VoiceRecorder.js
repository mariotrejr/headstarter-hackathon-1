/*import React, { useState } from 'react';
import { BsFillMicFill, BsFillStopFill, BsFillPlayFill } from 'react-icons/bs';
import RecordRTC from 'recordrtc';

const VoiceRecorder = ({ onSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recorder, setRecorder] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new RecordRTC(stream, { type: 'audio' });
      newRecorder.startRecording();
      setRecorder(newRecorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access the microphone. Please check your browser settings and permissions.');
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        setAudioBlob(recorder.getBlob());
        recorder.destroy();
        setRecorder(null);
        setIsRecording(false);
      });
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const handleSave = () => {
    if (audioBlob) {
      onSave(audioBlob);
      setAudioBlob(null);
    }
  };

  return (
    <div className="voice-recorder">
      {isRecording ? (
        <button onClick={stopRecording} title="Stop Recording">
          <BsFillStopFill size={24} />
        </button>
      ) : (
        <button onClick={startRecording} title="Start Recording">
          <BsFillMicFill size={24} />
        </button>
      )}
      {audioBlob && (
        <div>
          <button onClick={playAudio} title="Play Recording">
            <BsFillPlayFill size={24} />
          </button>
          <button onClick={handleSave} title="Save Recording">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
*/


import React, { useState } from 'react';
import { BsFillMicFill, BsFillStopFill, BsFillPlayFill, BsFillSendFill } from 'react-icons/bs';
import RecordRTC from 'recordrtc';

const VoiceRecorder = ({ onSend }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recorder, setRecorder] = useState(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const newRecorder = RecordRTC(stream, { type: 'audio' });
      newRecorder.startRecording();
      setRecorder(newRecorder);
      setIsRecording(true);
    }).catch((error) => {
      console.error('Error starting recording: ', error);
    });
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        setAudioBlob(recorder.getBlob());
        recorder.destroy();
        setRecorder(null);
        setIsRecording(false);
      });
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const handleSend = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      onSend(audioUrl); // Send the audio URL
      setAudioBlob(null); // Clear the audio blob after sending
    } else {
      console.log('No audio to send');
    }
  };

  return (
    <div className="voice-recorder">
      {isRecording ? (
        <button onClick={stopRecording}>
          <BsFillStopFill size={24} />
        </button>
      ) : (
        <button onClick={startRecording}>
          <BsFillMicFill size={24} />
        </button>
      )}
      {audioBlob && (
        <div>
          <button onClick={playAudio}>
            <BsFillPlayFill size={24} />
          </button>
          <button onClick={handleSend}>
            <BsFillSendFill size={24} /> Send
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
