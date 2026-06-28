import type { ReactNode } from 'react';
import './Table.css';

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  highlight?: boolean;
}

export interface TableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  responsive?: boolean;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  responsive = true,
}: TableProps<T>) {
  return (
    <div className={`moz-table-wrapper ${responsive ? 'moz-table-wrapper--responsive' : ''}`}>
      <table className={`moz-table ${responsive ? 'moz-table--responsive' : ''}`}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => {
                const value = row[col.key as keyof T];
                const content = col.render ? col.render(row) : String(value ?? '');
                return (
                  <td
                    key={String(col.key)}
                    data-label={col.header}
                    className={col.highlight ? 'moz-table__highlight' : ''}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
