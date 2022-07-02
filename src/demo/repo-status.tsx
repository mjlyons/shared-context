import { useQuery } from 'react-query';

type RepoData = {
  name: string;
  description: string;
  subscribers_count: number;
  stargazers_count: number;
  forks_count: number;
};

type RepoError = {
  messsage: string;
};

export const RepoStatus = () => {
  // Lifted from `react-query` docs (https://react-query.tanstack.com/overview)
  const { isLoading, error, data } = useQuery<RepoData, RepoError>('repoData', () =>
    fetch('https://api.github.com/repos/mjlyons/shared-context').then((res) => res.json())
  );

  if (isLoading) return <>'Loading...'</>;

  if (error) return <>An error has occurred {(error as any).message}</>;

  if (!data) return <>An error has occurred: response data is empty</>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
};
