
'use client';

import AdminProductList from "@/components/admin/admin-product-list";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { PlusCircle } from "lucide-react";

export default function AdminPage() {
  const { dictionary: t } = useLanguage();
  const T = t.adminPage;

  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center justify-between">
        <div >
            <h1 className="font-headline text-5xl font-bold">{T.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{T.description}</p>
        </div>
        <Button>
            <PlusCircle className="ms-2 h-4 w-4"/>
            {T.addProduct}
        </Button>
      </div>
      <div className="mt-12">
        <AdminProductList />
      </div>
    </div>
  );
}
