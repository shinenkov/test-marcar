import { CarType, ResponseType } from '../types';
import { GetServerSidePropsContext } from 'next';
import Cars from '@/components/CarList';
import Pagination from '@/components/Pagination';
import Filter from '@/components/Filter';

type IndexProps = {
  cars: CarType[] | null;
  page: number;
  lastPage: number;
  error?: string;
};

export default function Index(props: IndexProps) {
  const { cars: data, page, lastPage, error } = props;

  if (error) {
    return (
      <main>
        <Filter />
        <div style={{ color: '#d52424', textAlign: 'center', margin: '2rem' }}>
          Ошибка загрузки данных: {error}
        </div>
      </main>
    );
  }

  return (
    <main>
      <Filter />
      <Cars cars={data} />
      <Pagination page={page} lastPage={lastPage} />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const limit = query?.limit || '12';
  const page = query?.page || '1';
  const order = query?.order || null;
  const sort = query?.sort || null;

  const urlParams = new URLSearchParams();
  if (order) urlParams.append('_order', order as string);
  if (sort) urlParams.append('_sort', sort as string);
  if (limit) urlParams.append('_limit', limit as string);
  if (page) urlParams.append('_page', page as string);

  try {
    const resp = await fetch(
      `${process.env.API_URL}${urlParams ? `?${urlParams.toString()}` : ''}`
    );
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const response = (await resp.json()) as ResponseType;
    return {
      props: {
        cars: response.data,
        page: Number(page),
        lastPage: response.meta.last_page,
      },
    };
  } catch (err: unknown) {
    let errorMessage = 'Не удалось загрузить данные';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return {
      props: {
        cars: null,
        page: Number(page),
        lastPage: 1,
        error: errorMessage,
      },
    };
  }
}
