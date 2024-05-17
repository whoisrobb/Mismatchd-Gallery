import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { formatCurrency, formatNumber } from '@/lib/utils';
import { getSalesCount, getStockCount, getTotalRevenue } from '@/actions/dashboard-values';
import ContentShell from '@/components/shells/content-shell';
  

const Dashboard = async () => {
    const [totalRevenue, salesCount, stockCount] = await Promise.all([getTotalRevenue(), getSalesCount(), getStockCount()])
  return (
    <ContentShell
        title='Dashboard'
        subtitle='Stats for your site.'
    >
        <div className='grid grid-cols-3 gap-2'>
            {/* Revenue */}
            <DashboardCard title={'Revenue'} value={formatCurrency(totalRevenue!)} />

            {/* Sales */}
            <DashboardCard title={'Sales'} value={formatNumber(salesCount?.count!)} />

            {/* In stock */}
            <DashboardCard title={'In Stock'} value={formatNumber(stockCount?.count!)} />
        </div>
    </ContentShell>
  )
}

export default Dashboard


type DashboardCardProps = {
    title: string,
    value: string,
}

const DashboardCard = ({ title, value }: DashboardCardProps) => {
  return (
    <Card className='rounded'>
        <CardHeader>
            <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{title}</p>
            <h1 className='font-bold text-xl'>{value}</h1>
        </CardContent>
    </Card>
  )
}