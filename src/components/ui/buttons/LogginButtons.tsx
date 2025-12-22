import { useEffect, useState } from "react";
import Avvvatars from "avvvatars-react";
import { supabase } from "@/db/supabaseClient";
import { Button } from "@/components/ui/button"; // Asegúrate de tener tu componente Button o usa un HTML normal

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Verificar sesión actual al cargar
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkSession();

    // 2. Escuchar cambios en tiempo real (Login/Logout)
    // Esto actualiza el botón instantáneamente sin recargar la página
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="w-12 h-12"></div>; 

  return (
    <div className="flex justify-center items-center">
      {user ? (
        /* --- ESTADO: LOGUEADO (Muestra Avatar) --- */
        <a href="/Profile" title="Ir a mi perfil" className="transition-transform hover:scale-105">
          <Avvvatars 
            style="shape" 
            value={user.email || user.user_metadata?.username || "user"} 
            size={48} 
          />
        </a>
      ) : (
        <a href="/Login">
          <Button className="px-6 py-2 bg-amber-400 text-black font-bold border text-lg border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-[2px] transition-all">
            Iniciar sesión
          </Button>
        </a>
      )}
    </div>
  );
}