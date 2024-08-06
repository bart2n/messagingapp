import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-full font-kanit font-[400] px-6">
      <form className="text-center flex flex-col gap-4 md:w-1/3 w-full">
        <h1 className="text-3xl">Carepduya giriş yapmak için oturum açın</h1>

        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button type="submit">Oturum Aç</Button>
      </form>
      <p>
        veya{" "}
        <Link className="text-blue-500 underline" to={""}>
          Şifremi Unuttum!
        </Link>
      </p>
      <div className="
      
      ">
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
