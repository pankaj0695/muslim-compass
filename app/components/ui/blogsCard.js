import Link from "next/link"

export default function BlogCard() {
    return (
        <Link href="/blogs" className="flex items-start overflow-hidden max-w-[330px] gap-4 max-h-[140px] ">
            <div className="bg-black/10 aspect-square min-w-[120px] max-w-[120px]">

            </div>

            <article className="flex flex-col">
                <h3 className="text-lg font-medium">Blog Title Goes Here</h3>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
            </article>
        </Link>
    )
}