import Link from "next/link";

export default function Page() {
  return (
    <div>
      Click <Link href="/documents/123">here</Link> to go to document id.
    </div>
  );
}
