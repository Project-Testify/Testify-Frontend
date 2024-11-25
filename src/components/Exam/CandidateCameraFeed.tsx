import React, { useState, useRef, useEffect } from 'react';

import './styles.css';

interface CandidateCameraFeedProps {
  cameraStream: MediaStream | null;
  alertMessage: string | null;
}

export const CandidateCameraFeed: React.FC<CandidateCameraFeedProps> = ({ cameraStream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const feedContainerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startDragOffset, setStartDragOffset] = useState({ x: 0, y: 0 });

  // Assign the camera stream to the video element when the component mounts
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  // Handle dragging start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStartDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Handle dragging end
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Handle dragging movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPosition({
        x: e.clientX - startDragOffset.x,
        y: e.clientY - startDragOffset.y,
      });
    }
  };

  return (
    <div
      ref={feedContainerRef}
      className="camera-feed-container"
      style={{ top: position.y, left: position.x }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* {alertMessage && (
        <Alert
          message="Attention Required"
          description={alertMessage}
          type="warning"
          showIcon
          className="camera-feed-alert"
        />
      )} */}
      <video ref={videoRef} autoPlay playsInline muted className="camera-feed-video" />
      {/* <Button type="primary" className="camera-feed-close-btn" onClick={() => window.close()}>
        Close Feed
      </Button> */}
    </div>
  );
};
