import { useQuery } from 'react-query';
import { useLocalStoreState } from '../local-store/store';

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
  const localStoreState = useLocalStoreState();
  console.log(`RepoStatus query: ${localStoreState?.query}`);

  // Lifted from `react-query` docs (https://react-query.tanstack.com/overview)
  const repoName = localStoreState?.query;

  const { isLoading, error, data } = useQuery<RepoData, RepoError>(`repoData:${repoName}`, () => {
    return fetch(`https://api.github.com/repos/mjlyons/${repoName}`).then((res) => res.json());
  });

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
