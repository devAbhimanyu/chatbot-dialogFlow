import Card from './Card';
import styles from './Cards.module.css';

const Cards = ({ cards = [] }) => {
  return (
    <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
      <div
        className={styles.container}
        style={{
          width: cards.length * 270,
        }}
      >
        {cards.map((card, i) => (
          <Card key={`card-${i}`} details={card.structValue.fields} />
        ))}
      </div>
    </div>
  );
};
export default Cards;
