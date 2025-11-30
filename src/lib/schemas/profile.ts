import { z } from 'zod';

// Schema para editar perfil (Formulario de usuario)
const profileSchema = z.object({
  fullname: z.string().min(2, "Name is too short"),
  username: z.string().min(3, "Username must be at least 3 chars"),
  email: z.string().email(),
  // readonly fields like created_at don't go in the form schema
});

// Tipo completo de la DB
export type User = z.infer<typeof profileSchema> & {
  id: string; // UUID que viene de auth.users
  created_at: string;
  updated_at: string;
};