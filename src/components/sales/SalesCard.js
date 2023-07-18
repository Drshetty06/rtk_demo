import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const SalesCard = ({ country, sales, value, bounce }) => {
  return (
    <Card className="sales-card">
      <Meta title={country} description={`Sales: ${sales} | Value: ${value} | Bounce: ${bounce}`} />
    </Card>
  );
};

export default SalesCard;
