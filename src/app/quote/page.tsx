import QuoteForm from '@/components/quote/quote-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuotePage() {
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center py-12">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-4xl">احصل على عرض سعر مجاني</CardTitle>
          <CardDescription className="text-lg">
            أخبرنا عن مشروعك، وسنعاود الاتصال بك بعرض أسعار مخصص.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuoteForm />
        </CardContent>
      </Card>
    </div>
  );
}
