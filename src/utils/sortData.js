export const sortData = ({ column, order, setOrder, data, setData }) => {
  const newDirection =
    order.column === column && order.direction === "asc" ? "desc" : "asc";

  const sortedData = [...data].sort((a, b) => {
    if (a[column] < b[column]) return newDirection === "asc" ? -1 : 1;
    if (a[column] > b[column]) return newDirection === "asc" ? 1 : -1;
    return 0;
  });

  setData(sortedData);
  setOrder({ column, direction: newDirection });
};
