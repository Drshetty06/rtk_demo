import React from 'react';
import { useFetchSalesQuery } from '../../store/salesApi';
import SalesCard from './SalesCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const SalesList = () => {
  const { data: sales, isLoading, isError, fetchNextPage, hasNextPage, error } = useFetchSalesQuery();

  const renderedSales = sales || [];
  console.log(renderedSales);
  const handleLoadMore = () => {
    fetchNextPage();
  };
  if (isLoading) {

    return <div>Loading...</div>;

  } else if (error) {

    return <div>Error fetching data...</div>;

  } else {
  return (
  <div> <div className="sales-list">
  {renderedSales.map((sale, index) => (
    <SalesCard
      key={index}
      country={sale.country}
      sales={sale.sales}
      value={sale.value}
      bounce={sale.bounce}
    />
  ))}
  {!isLoading && renderedSales.length >= 10 && (
    <InfiniteScroll
      dataLength={renderedSales.length}
      next={handleLoadMore}
      hasMore={hasNextPage}
      loader={<p>Loading...</p>}
      scrollableTarget="sales-list"
      scrollThreshold={0.8}
    >
      {renderedSales.slice(10).map((sale, index) => (
        <SalesCard
          key={index + 10}
          country={sale.country}
          sales={sale.sales}
          value={sale.value}
          bounce={sale.bounce}
        />
      ))}
    </InfiniteScroll>
  )}
</div></div>
  );
          }
};

export default SalesList;
