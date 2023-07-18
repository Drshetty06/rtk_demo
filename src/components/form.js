import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import SalesCard from './SalesCard';
import {
  selectSales,
  selectPage,
  selectIsLoading,
  selectError,
  fetchSalesStart,
  fetchSalesSuccess,
  fetchSalesFailure,
} from './salesSlice';

const SalesList = () => {
  const dispatch = useDispatch();
  const sales = useSelector(selectSales);
  const page = useSelector(selectPage);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchSalesStart());
    fetchSalesData();
  }, [dispatch]);

  const fetchSalesData = async () => {
    try {
      const response = await fetch(`/api/sales?page=${page}`);
      const data = await response.json();
      dispatch(fetchSalesSuccess(data));
    } catch (error) {
      dispatch(fetchSalesFailure(error.message));
    }
  };

  const handleLoadMore = () => {
    dispatch(fetchSalesStart());
    fetchSalesData();
  };

  return (
    <InfiniteScroll
      dataLength={sales.length}
      next={handleLoadMore}
      hasMore={!isLoading && !error}
      loader={<p>Loading...</p>}
    >
      {sales.map((sale, index) => (
        <SalesCard
          key={index}
          country={sale.country}
          sales={sale.sales}
          value={sale.value}
          bounce={sale.bounce}
        />
      ))}
      {isLoading && <p>Loading more...</p>}
      {error && <p>Error: {error}</p>}
    </InfiniteScroll>
  );
};

export default SalesList;
