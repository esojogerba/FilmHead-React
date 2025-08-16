import React from "react";

const VideoCard = ({ video }) => {
    const [play, setPlay] = React.useState(false);

    return (
        <div className="video-card">
            {play ? (
                <iframe
                    width={500}
                    height={294}
                    src={`https://www.youtube.com/embed/${video.key}?autoplay=1&theme=dark&color=white&rel=0`}
                    frameBorder="0"
                    allowFullScreen
                    title={video.name}
                    className="img-cover"
                />
            ) : (
                <img
                    src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                    alt={video.name}
                    onClick={() => setPlay(true)}
                    className="img-cover cursor-pointer"
                />
            )}
        </div>
    );
};

export default VideoCard;
