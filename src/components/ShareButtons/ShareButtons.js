import "./ShareButtons.css";
import TwitterIcon from '@mui/icons-material/Twitter';

function SocialShare({ url, title }) {
  const shareOnTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`;
    window.open(tweetUrl, "_blank", "noopener noreferrer");
  };

  return <div id="social-share">Share on
    <TwitterIcon className="social-share-icon" onClick={shareOnTwitter} />
  </div>;
}

export default SocialShare;
