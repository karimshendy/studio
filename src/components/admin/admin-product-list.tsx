
'use client';

import { products } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useLanguage } from "@/context/language-context";

export default function AdminProductList() {
  const { dictionary: t } = useLanguage();
  const T = t.adminProductList;
  
  return (
    <Card>
        <CardHeader>
            <CardTitle>{T.allProducts}</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">{T.image}</span>
                </TableHead>
                <TableHead>{T.name}</TableHead>
                <TableHead>{T.category}</TableHead>
                <TableHead>{T.price}</TableHead>
                <TableHead>
                    <span className="sr-only">{T.actions}</span>
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                        <Image
                            alt={product.name}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={product.images[0]?.src ?? 'https://placehold.co/64x64.png'}
                            data-ai-hint={product.images[0]?.aiHint ?? 'placeholder'}
                            width="64"
                        />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                        {product.price.type === "fixed"
                            ? `$${product.price.value?.toFixed(2)}`
                            : T.onDemand}
                    </TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">{T.toggleMenu}</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{T.actions}</DropdownMenuLabel>
                        <DropdownMenuItem>{T.edit}</DropdownMenuItem>
                        <DropdownMenuItem>{T.delete}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
