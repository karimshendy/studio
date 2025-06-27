
'use client';

import AdminProductList from "@/components/admin/admin-product-list";
import AddProductDialog from "@/components/admin/add-product-dialog";
import { useLanguage } from "@/context/language-context";
import { products } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, DollarSign, Files } from "lucide-react";

export default function AdminPage() {
  const { dictionary: t } = useLanguage();
  const T = t.adminPage;

  const stats = [
    {
      title: T.stats.totalRevenue,
      value: "$45,231.89",
      description: "+20.1% from last month",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: T.stats.totalProducts,
      value: `+${products.length}`,
      description: "All products in catalog",
      icon: <Package className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: T.stats.subscriptions,
        value: "+2,350",
        description: "+180.1% from last month",
        icon: <Files className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: T.stats.sales,
        value: "+12,234",
        description: "+19% from last month",
        icon: <Users className="h-4 w-4 text-muted-foreground" />
    }
  ]

  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold">{T.title}</h1>
            <p className="mt-1 text-muted-foreground">{T.description}</p>
        </div>
        <AddProductDialog />
      </div>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
            <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="mt-8">
        <AdminProductList />
      </div>
    </div>
  );
}
