import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { getPageNumbers } from './utils';

type PaginationProps = {
  page: number;
  lastPage: number;
};

export default function Pagination({ page, lastPage }: PaginationProps) {
  const router = useRouter();

  const goToPage = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  if (lastPage <= 1) return null;

  const pageNumbers = getPageNumbers(page, lastPage);

  return (
    <nav className={styles.pages}>
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        className={styles.page}
        aria-label="Предыдущая страница"
      >
        {'<'}
      </button>
      {page > 2 && (
        <button
          onClick={() => goToPage(1)}
          aria-label="На первую страницу"
          className={styles.page}
        >
          {'1'}
        </button>
      )}
      {page > 3 && <span className={styles.ellipsis}>...</span>}
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => goToPage(num)}
          className={styles.page}
          aria-label={'На страницу ' + num}
          style={{
            borderColor: page === num ? '#4caf50' : undefined,
          }}
        >
          {num}
        </button>
      ))}
      {page < lastPage - 2 && <span className={styles.ellipsis}>...</span>}
      {page < lastPage - 1 && (
        <button
          onClick={() => goToPage(lastPage)}
          className={styles.page}
          aria-label="На последнюю страницу"
        >
          {lastPage}
        </button>
      )}
      <button
        onClick={() => goToPage(page + 1)}
        disabled={page >= lastPage}
        className={styles.page}
        aria-label="На следующую страницу"
      >
        {'>'}
      </button>
    </nav>
  );
}
