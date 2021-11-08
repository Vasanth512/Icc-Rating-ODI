import React from 'react';
import './App.css';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
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

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (team) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === team ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <caption>ICC T20 Ratings</caption>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('team')}
              className={getClassNamesFor('team')}
            >
              Team
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('points')}
              className={getClassNamesFor('points')}
            >
              Points
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('rating')}
              className={getClassNamesFor('rating')}
            >
              Ratings
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.team}</td>
            <td>{item.points}</td>
            <td>{item.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function App() {
  return (
    <div className="App">
      <ProductTable
        products={[
          { id: 1, team: 'England', points: 8655, rating: 279 },
          { id: 2, team: 'Pakistan', points: 9792, rating: 265 },
          { id: 3, team: 'India', points: 7667, rating: 267 },
          { id: 4, team: 'New Zealand', points: 7405, rating: 255 },
          { id: 5, team: 'South Africa', points: 8244, rating: 250 },
          { id: 6, team: 'Australia ', points: 8735, rating: 243 },
          { id: 7, team: 'Afghanisthan', points: 3286, rating: 235 },
        ]}
      />
    </div>
  );
}
