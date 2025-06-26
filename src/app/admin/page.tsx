import AdminProductList from "@/components/admin/admin-product-list";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center justify-between">
        <div >
            <h1 className="font-headline text-5xl font-bold">Admin Panel</h1>
            <p className="mt-2 text-lg text-muted-foreground">Manage your product catalog.</p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4"/>
            Add Product
        </Button>
      </div>
      <div className="mt-12">
        <AdminProductList />
      </div>
    </div>
  );
}
