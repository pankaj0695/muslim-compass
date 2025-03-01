export default function FilterToast({ text }) {
    return (
        <button className="p-3 py-1 border border-black/40 rounded-full w-fit text-sm font-semibold text-black/60 hover:text-black hover:border-black transition-all ease-in-out duration-200">
            {text}
        </button>
    )
}