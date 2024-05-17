import { type ComponentPropsWithRef } from 'react';

function ImageCard(props: ComponentPropsWithRef<'img'>) {
  return <img {...props} style={{ borderRadius: '2rem', width: '100%', ...props.style }} />;
}

export default ImageCard;
