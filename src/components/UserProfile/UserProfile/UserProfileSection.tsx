import './styles.scss';

import { ReactNode } from 'react';

type UserProfileSectionProps = {
  title: string;
  children: ReactNode;
};

const UserProfileSection = ({ title, children }: UserProfileSectionProps) => {
  return (
    <section className='section__wrapper' tabIndex={0}>
      <h3 className='section__title'>{title}</h3>
      <div className='section__content'>{children}</div>
    </section>
  );
};

export default UserProfileSection;
