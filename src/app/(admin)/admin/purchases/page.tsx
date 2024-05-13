import { getOrders } from '@/actions/order';
import ContentShell from '@/components/shells/content-shell';
import { formatCurrency } from '@/lib/utils';
import React from 'react';
import PurchasesTable from '../_components/purchases-table';

const Purchases = async () => {
    const orders = await getOrders();

    const formattedOrders = orders?.map((order) => ({
        orderId: order.orderId,
        address: order.address,
        isPaid: order.isPaid,
        products: order.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatCurrency(order.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        storeName: order.store.name,
        createdAt: order.createdAt
    }))
  return (
    <ContentShell
        title='Purchases'
        subtitle='Manage your purchases'
    >
      <PurchasesTable purchases={formattedOrders!} />
    </ContentShell>
  )
}

export default Purchases
