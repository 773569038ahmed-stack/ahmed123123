import Link from "next/link";

export const metadata = {
  title: "عن الشركة — فرص العمل",
};

export default function CompanyPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">عن الشركة</h1>

      <p className="mb-4">
        هذه صفحة خاصة بالشركة التي تبحث عن موظفين. يمكنك وضع هنا نبذة عن
        الشركة، ثقافتها، مزايا العمل، وطريقة التقديم.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">الوصف</h2>
        <p>
          شركة مثال متخصصة في تقديم حلول رقمية وتسعى لتوسيع فريقها بالمواهب
          المتميزة في مجالات الهندسة والتسويق والعمليات.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">الوظائف الشاغرة</h2>
        <ul className="list-disc pl-5">
          <li>مهندس واجهات أمامية</li>
          <li>مهندس باك إند</li>
          <li>مدير تسويق رقمي</li>
        </ul>
      </section>

      <div className="mt-6">
        <Link href="/employer-dashboard" className="text-blue-600 hover:underline">
          الانتقال إلى لوحة أصحاب العمل
        </Link>
      </div>
    </main>
  );
}
