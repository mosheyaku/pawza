function ImageCard({ img }: { img: string }) {
  return <img src={img} style={{ borderRadius: '2rem', width: '100%' }} />;
}

export default ImageCard;
