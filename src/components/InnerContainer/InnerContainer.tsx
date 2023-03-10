import './InnerContainer.scss';

interface InnerContainerProps {
  index: number;
  name: string;
  price: string;
}

export const InnerContainer = ({ index, name, price }: InnerContainerProps) => {
  return (
    <div className='inner-container'>
      <span>{index}</span>
      <span>{name}</span>
      <span>US$ {price}</span>
    </div>
  );
};
