import React, { useEffect, useState } from 'react';
import { useFetchSalesQuery } from '../../store/salesApi';
import SalesCard from './SalesCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const SalesList = () => {
  const [renderedSales, setRenderedSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: sales, isLoading, isError, error } = useFetchSalesQuery({ pageParam: currentPage });

  useEffect(() => {
    if (sales) {
      setRenderedSales((prevSales) => [...prevSales, ...sales]);
    }
  }, [sales]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (isLoading && renderedSales.length === 0) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error fetching data: {error.message}</div>;
  } else {
    return (
      <div className="sales-list">
        {renderedSales.map((sale, index) => (
          <SalesCard key={index} country={sale.country} sales={sale.sales} value={sale.value} bounce={sale.bounce} />
        ))}
        {sales && (
          <InfiniteScroll
            dataLength={renderedSales.length}
            next={handleLoadMore}
            hasMore={sales.length > 0}
            loader={<p>Loading...</p>}
            scrollableTarget="sales-list"
            scrollThreshold={0.8}
          />
        )}
      </div>
    );
  }
};

export default SalesList;
