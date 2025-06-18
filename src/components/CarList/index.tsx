import { useCallback } from 'react';
import styles from './styles.module.css';
import { CarType, Currency } from '../../../types';
import ImageControl from '../ImageControl';

type CarsProps = {
  cars: CarType[] | null;
};

export default function Cars({ cars }: CarsProps) {
  const formatPrice = useCallback((price: number, currency: Currency) => {
    const formatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency === 'RUR' ? 'RUB' : currency,
      maximumFractionDigits: 0,
    });
    return formatter.format(price);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {cars?.map((item) => (
          <div key={item.unique_id} className={styles.item}>
            <ImageControl item={item} />
            <span
              className={styles.name}
            >{`${item.mark_id} ${item.folder_id}`}</span>
            <div className={styles.details}>
              <span>{item.availability}</span>
              <span>{item.wheel}</span>
            </div>
            <div className={styles.details}>
              <span className={styles.price}>
                {formatPrice(item.price, item.currency)}
              </span>
              <span className={styles.year}>{item.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
