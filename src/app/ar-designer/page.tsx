import ArToolClient from "@/components/ar/ar-tool-client";

export default function ArDesignerPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold">ستوديو المصمم الذكي</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
          حوّل رؤيتك إلى حقيقة. استخدم أدوات الذكاء الاصطناعي المتطورة للحصول على اقتراحات أثاث بناءً على صورة غرفتك، وحسّن التصميم لتحقيق الانسجام والتدفق المثالي.
        </p>
      </div>
      <div className="mt-12">
        <ArToolClient />
      </div>
    </div>
  );
}
