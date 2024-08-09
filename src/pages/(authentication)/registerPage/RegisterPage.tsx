import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/redux/authentication/authApi";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [register, { isLoading, isError, isSuccess }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target); // e.target is the form element

    await register(formData);
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-full font-kanit font-[400] px-6">
      <form
        onSubmit={handleSubmit}
        className="text-center flex flex-col gap-4 md:w-1/3 w-full"
      >
        <h1 className="text-3xl">Carepduya kaydolun</h1>

        <Input type="text" name="username" placeholder="Kullanıcı Adı" />
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password1" placeholder="Şifre" />
        <Input type="password" name="password2" placeholder="Şifre Tekrarı" />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Kaydoluyor..." : "Kaydol"}
        </Button>
      </form>

      {isError && <p className="text-red-500">Bir hata oluştu. Lütfen tekrar deneyin.</p>}
      {isSuccess && <p className="text-green-500">Kayıt başarılı!</p>}

      <div>
        <p>
          Zaten bir hesabınız var mı?{" "}
          <Link className="text-blue-500 underline" to={"/login"}>
            Oturum Aç
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
