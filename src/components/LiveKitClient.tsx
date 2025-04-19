
import React, { useEffect, useRef, useState } from 'react';
import { Room, RoomEvent, Track, ConnectionState } from 'livekit-client';
import { AudioRenderer } from '@livekit/components-react';
import '@livekit/components-styles';

const LiveKitClient: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [transcriptions, setTranscriptions] = useState<{ timestamp: string; text: string }[]>([]);
  const [subscribedTracks, setSubscribedTracks] = useState<Track[]>([]);
  const [showAudioStartButton, setShowAudioStartButton] = useState(false);

  const roomRef = useRef<Room | null>(null);
  const transcriptionBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize room
    const room = new Room({
      adaptiveStream: true,
      dynacast: true,
      audioCodes: ['opus']
    });

    roomRef.current = room;

    // Set up event listeners
    room
      .on(RoomEvent.Connected, () => handleRoomConnected())
      .on(RoomEvent.Disconnected, () => handleRoomDisconnected())
      .on(RoomEvent.DataReceived, (data) => handleDataReceived(data))
      .on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
        handleTrackSubscribed(track, publication, participant);
      })
      .on(RoomEvent.TrackUnsubscribed, (track, publication, participant) => {
        handleTrackUnsubscribed(track, publication, participant);
      })
      .on(RoomEvent.Reconnecting, () => {
        console.log("reconnecting to room");
        updateStatus("Reconnecting...", false);
      })
      .on(RoomEvent.Reconnected, () => {
        console.log("reconnected to room");
        updateStatus("Reconnected", true);
      })
      .on(RoomEvent.ConnectionStateChanged, (state) => {
        console.log("connection state changed:", state);
      })
      .on(RoomEvent.AudioPlaybackStatusChanged, () => {
        handleAudioPlaybackChanged();
      });

    // Clean up on unmount
    return () => {
      if (room) {
        room.disconnect();
        room.removeAllListeners();
      }
    };
  }, []);

  // Scroll to bottom of transcription box whenever new transcriptions come in
  useEffect(() => {
    if (transcriptionBoxRef.current) {
      transcriptionBoxRef.current.scrollTop = transcriptionBoxRef.current.scrollHeight;
    }
  }, [transcriptions]);

  const connectToRoom = async () => {
    if (isConnected || !roomRef.current) return;

    try {
      // Get token from your server
      const roomName = "transcription";
      const response = await fetch(`http://localhost:8000/get-token?role=output&room=${roomName}`);
      if (!response.ok) throw new Error("Failed to get token from server");

      const { token, url } = await response.json();
      if (!url) throw new Error("Server URL not provided");

      console.log('Attempting to connect to LiveKit server at:', url);

      await roomRef.current.prepareConnection(url, token);

      await roomRef.current.connect(url, token, {
        autoSubscribe: true
      });

      setIsConnected(true);
      updateStatus('Connected to room: ' + roomName, true);
    } catch (error) {
      console.error('Connection failed:', error);
      updateStatus('Connection failed: ' + error.message, false);
      setIsConnected(false);
    }
  };

  const handleRoomConnected = () => {
    if (!roomRef.current) return;
    console.log('Connected to room:', roomRef.current.name);
    updateStatus('Connected', true);
  };

  const handleRoomDisconnected = () => {
    setIsConnected(false);
    updateStatus('Disconnected', false);
    setSubscribedTracks([]);
  };

  const handleTrackSubscribed = (track: Track, publication: any, participant: any) => {
    console.log('Track subscribed:', track.sid, participant.identity, publication.trackName);
    if (track.kind === Track.Kind.Audio) {
      // Only subscribe to tracks from the translation bot
      if (participant.identity === 'translation_bot' && publication.trackName === 'translation_audio') {
        console.log('Audio track subscribed from translation bot:', track.sid);
        setSubscribedTracks(prev => [...prev, track]);
      } else {
        // Unsubscribe from other audio tracks
        console.log('Unsubscribing from non-translation audio track:', track.sid);
        publication.setSubscribed(false);
      }
    }
  };

  const handleTrackUnsubscribed = (track: Track) => {
    if (track.kind === Track.Kind.Audio) {
      console.log('Audio track unsubscribed:', track.sid);
      setSubscribedTracks(prev => prev.filter(t => t.sid !== track.sid));
    }
  };

  const handleAudioPlaybackChanged = () => {
    if (roomRef.current && !roomRef.current.canPlaybackAudio) {
      console.log('Audio playback requires user interaction');
      setShowAudioStartButton(true);
    }
  };

  const startAudio = async () => {
    if (!roomRef.current) return;
    
    try {
      await roomRef.current.startAudio();
      setShowAudioStartButton(false);
    } catch (e) {
      console.error('Failed to start audio:', e);
    }
  };

  const handleDataReceived = (data: Uint8Array) => {
    try {
      const message = JSON.parse(new TextDecoder().decode(data));
      if (message.type === 'realtime') {
        // Add new transcription with timestamp
        const timestamp = new Date().toLocaleTimeString();
        setTranscriptions(prev => [...prev, { timestamp, text: message.text }]);
      }
    } catch (error) {
      console.error('Error handling data:', error);
    }
  };

  const updateStatus = (message: string, connected: boolean) => {
    setConnectionStatus(message);
    setIsConnected(connected);
  };

  return (
    <div className="max-w-screen-md mx-auto p-4 space-y-4">
      <div className={`p-2 rounded ${isConnected ? 'bg-green-100' : 'bg-red-100'}`}>
        {connectionStatus}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={connectToRoom}
          className={`px-4 py-2 rounded ${isConnected ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Connect to Room
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Audio Playback:</h3>
        <div className="p-2 border border-gray-300 rounded min-h-16">
          {showAudioStartButton && (
            <button
              onClick={startAudio}
              className="bg-blue-500 text-white px-4 py-2 rounded border-none hover:bg-blue-600"
            >
              Start Audio
            </button>
          )}
          
          {subscribedTracks.map(track => (
            <div key={track.sid} className="w-full my-1">
              <AudioRenderer track={track} isLocal={false} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Received Transcription:</h3>
        <div 
          ref={transcriptionBoxRef}
          className="p-4 border border-gray-300 rounded min-h-52 max-h-80 overflow-y-auto"
        >
          {transcriptions.map((item, index) => (
            <div key={index} className="mb-2">
              <strong>{item.timestamp}</strong>: {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveKitClient;
