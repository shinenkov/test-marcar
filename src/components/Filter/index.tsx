import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { useMemo } from 'react';

const DEFAULT_SORT = 'price';
const ORDER_ASC = 'asc';
const ORDER_DESC = 'desc';

export default function Filter() {
  const router = useRouter();
  const { sort, order } = router.query;

  const { isSorted, isAsc } = useMemo(
    () => ({
      isSorted: sort === DEFAULT_SORT,
      isAsc: order !== ORDER_DESC,
    }),
    [sort, order]
  );

  const handleToggleSort = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort: DEFAULT_SORT,
        order: isSorted && isAsc ? ORDER_DESC : ORDER_ASC,
        page: 1,
      },
    });
  };

  const handleClearSort = () => {
    const { ...rest } = router.query;

    delete rest.sort;
    delete rest.order;
    router.push({
      pathname: router.pathname,
      query: { ...rest, page: 1 },
    });
  };

  const icon = isAsc ? '▲' : '▼';

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <button
          className={styles.sortButton}
          onClick={handleToggleSort}
          style={{ color: isSorted ? '#4caf50' : '#888' }}
          aria-label="Переключить направление сортировки"
        >
          {icon}
        </button>
        <span className={isSorted ? styles.activeLabel : styles.inactiveLabel}>
          {'Сортировка: по ' + (isSorted ? 'цене' : 'умолчанию')}
        </span>
        <button
          className={styles.sortButton}
          onClick={handleClearSort}
          disabled={!isSorted}
          aria-label="Очистить сортировку"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
