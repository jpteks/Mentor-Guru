import MuxPlayer from "@mux/mux-player-react";

const VideoPlayer = () => {
  return (
    <MuxPlayer
      playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
      metadata={{
        video_id: "video-id-123456",
        video_title: "Bick Buck Bunny",
        viewer_user_id: "user-id-bc-789",
      }}
    />
  );
};

export default VideoPlayer;
