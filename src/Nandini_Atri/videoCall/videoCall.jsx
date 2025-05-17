import { MdOutlineVideoCall } from "react-icons/md";

const VideoCall = () => {
    return (
        <div className="videocall-main-div">
            <div className="videocall-header">
                <h1 className="videocall-title">Start a Video Call</h1>
                <button className="videoCall-button">
                    <MdOutlineVideoCall size={30} />
                </button>
            </div>

            <div className="videocall-body">
                <p>Video Call Here !</p>
            </div>
        </div>
    );
};

export default VideoCall;
