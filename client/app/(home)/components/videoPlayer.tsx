const VideoPlayer = () => {
  return (
    <div className='flex items-center justify-center'>
      <iframe
        className='max-w-full h-[515px] w-full md:w-[80%] border-none '
        width='560'
        height='315'
        src='https://www.youtube.com/embed/uorkQGuUUkg?si=WCxKaxzAYP1tgvWr'
        title='YouTube Video Player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
