function SocialShare({ url, title }) {
  const shareOnTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`;
    window.open(tweetUrl, "_blank", "noopener noreferrer");
  };

  return <button onClick={shareOnTwitter}>Share on Twitter</button>;
}

export default SocialShare;
