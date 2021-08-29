import React from 'react';
import styles from './Cards.module.css';

const Card = ({ details = {} }) => {
  return (
    <div className={styles.cardContainer}>
      <div className='card'>
        <div className={`${styles.imgContainer} card-image`}>
          <img
            alt={details.header.stringValue}
            src={details.image?.stringValue ?? ''}
            height='120px'
            style={{ objectFit: 'cover' }}
          />
          <span className='card-title'>
            {details.header?.stringValue ?? ''}
          </span>
        </div>
        <div className='card-content'>
          {details.description.stringValue ?? ''}
          <p>
            <a href='/'>{details.price?.stringValue ?? ''}</a>
          </p>
        </div>
        <div className='card-action'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={details.link.stringValue ?? '#'}
          >
            GET NOW
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
