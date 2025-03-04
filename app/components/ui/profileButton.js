import { useUser } from "@/app/context/userContext";

export default function ProfileButton() {
  const { user, login, logout } = useUser();
  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <img
            src={user.image}
            alt="User profile"
            className="h-8 w-8 rounded-full object-cover"
          />
          <form
            action={logout}
            className="hidden items-center gap-2 h-6 md:flex"
          >
            <h4 className="font-medium">{user.name}</h4>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </form>
        </>
      ) : (
        <form action={login}>
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
}
