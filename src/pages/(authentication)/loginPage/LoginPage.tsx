import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/authentication/authApi";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [login, { isLoading, isError, isSuccess, data }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await login({ email, password }).unwrap();
      Cookies.set("token", result.key);
      navigate("/dashboard/institution-create");
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-full font-kanit font-[400] px-6">
      <form
        onSubmit={handleSubmit}
        className="text-center flex flex-col gap-4 md:w-1/3 w-full"
      >
        <h1 className="text-3xl">Carepduya giriş yapmak için oturum açın</h1>

        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
        <Button type="submit" disabled={isLoading}>
          Oturum Aç
        </Button>

        {isError && (
          <p className="text-red-500">Login failed. Please try again.</p>
        )}
      </form>
      <p>
        veya{" "}
        <Link
          className="text-blue-500 underline"
          to={"/dashboard/institution-create"}
        >
          Şifremi Unuttum!
        </Link>
      </p>
      <div>
        <p>
          Hesabınız yok mu?{" "}
          <Link className="text-blue-500 underline" to={"/register"}>
            Kaydol
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
