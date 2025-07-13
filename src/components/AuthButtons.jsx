import { Button } from "./ui/button";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

export function GoogleLoginButton() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Button 
      onClick={handleLogin}
      variant="outline" 
      className="flex gap-2 w-full"
    >
      <img src="/google.svg" alt="Google" className="h-5 w-5" />
      Continue with Google
    </Button>
  );
}