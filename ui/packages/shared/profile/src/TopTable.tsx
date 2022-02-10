import React, {useEffect, useState} from 'react';
import {ProfileSource} from './ProfileSource';
import {QueryRequest, QueryResponse, QueryServiceClient, ServiceError} from '@parca/client';
import * as parca_query_v1alpha1_query_pb from '@parca/client/src/parca/query/v1alpha1/query_pb';
import {Arrow} from '@parca/icons';

interface ProfileViewProps {
  queryClient: QueryServiceClient;
  profileSource: ProfileSource;
}

export interface IQueryResult {
  response: QueryResponse | null;
  error: ServiceError | null;
}

// TODO: Refactor the getLastItem from IcicleGraph.tsx
function getLastItem(thePath: string | undefined): string {
  if (thePath === undefined) {
    return '';
  }
  const index = thePath.lastIndexOf('/');
  if (index === -1) return thePath;

  return thePath.substring(index + 1);
}

const useSortableData = (response: QueryResponse | null, config = null) => {
  const [sortConfig, setSortConfig] = React.useState<{key: string; direction: string} | null>(
    config
  );

  const rawTableReport = response?.toObject().top?.listList;

  const items = rawTableReport?.map(node => ({
    ...node,
    name: node.meta?.pb_function?.name,
  }));

  const sortedItems = React.useMemo(() => {
    if (!items) return;

    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({key, direction});
  };

  return {items: sortedItems, requestSort, sortConfig};
};

export const useQuery = (
  client: QueryServiceClient,
  profileSource: ProfileSource
): IQueryResult => {
  const [result, setResult] = useState<IQueryResult>({
    response: null,
    error: null,
  });

  useEffect(() => {
    const req = profileSource.QueryRequest();
    req.setReportType(QueryRequest.ReportType.REPORT_TYPE_TOP);

    client.query(
      req,
      (
        error: ServiceError | null,
        responseMessage: parca_query_v1alpha1_query_pb.QueryResponse | null
      ) => {
        setResult({
          response: responseMessage,
          error: error,
        });
      }
    );
  }, [client, profileSource]);

  return result;
};

export const TopTable = ({queryClient, profileSource}: ProfileViewProps): JSX.Element => {
  const {response, error} = useQuery(queryClient, profileSource);
  const {items, requestSort, sortConfig} = useSortableData(response);

  if (error != null) {
    return <div className="p-10 flex justify-center">An error occurred: {error.message}</div>;
  }

  const getClassNamesFor = name => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <>
      <div className="w-full">
        <table className="table-auto text-left w-full">
          <thead>
            <tr>
              <th className="text-sm cursor-pointer" onClick={() => requestSort('name')}>
                Name
                <span>
                  <Arrow />
                </span>
              </th>
              <th
                className="min-w-[150px] max-w-[150px] text-left text-sm cursor-pointer"
                onClick={() => requestSort('flat')}
              >
                Flat
                <span>
                  <Arrow />
                </span>
              </th>
              <th
                className="min-w-[150px] max-w-[150px] text-left text-sm cursor-pointer"
                onClick={() => requestSort('cumulative')}
              >
                Cumulative
                <span>
                  <Arrow />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items?.map((report, index) => (
              <tr key={index} className="hover-[#90c7e0]">
                <td className="text-sm py-1.5 border-b-[1px] border-[#646464]">
                  {report.meta?.mapping?.file !== '' && [getLastItem(report.meta?.mapping?.file)]}{' '}
                  {report.meta?.pb_function?.name}
                </td>
                <td className="text-sm py-1.5 border-b-[1px] border-[#646464]">{report.flat}</td>
                <td className="text-sm py-1.5 border-b-[1px] border-[#646464]">
                  {report.cumulative}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TopTable;
