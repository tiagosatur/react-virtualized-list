import './InnerContainer.scss';

interface InnerContainerProps {
  children: JSX.Element;
}

export const InnerContainer = ({ children }: InnerContainerProps) => {
  return <div className='inner-container'>{children}</div>;
};
