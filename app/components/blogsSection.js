import Link from "next/link";
import BlogCard from "./ui/blogsCard";

export default function BlogsSection() {
    return (
        <div>
            <h1 className="text-3xl font-semibold mb-8">Blogs</h1>
            <ul className="flex flex-col gap-6">
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </ul>

            <div className="w-full text-center py-10">
                <Link href={"/blogs"} className="underline underline-offset-4 px-1">
                    View All
                </Link>
            </div>
        </div>
    )
}