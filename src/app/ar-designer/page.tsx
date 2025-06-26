import ArToolClient from "@/components/ar/ar-tool-client";

export default function ArDesignerPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold">AI Designer Studio</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
          Bring your vision to life. Use our cutting-edge AI tools to get
          furniture suggestions based on your room's photo, and optimize the
          layout for perfect harmony and flow.
        </p>
      </div>
      <div className="mt-12">
        <ArToolClient />
      </div>
    </div>
  );
}
