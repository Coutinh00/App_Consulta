// Model for EditProfileScreen user (can be extended as needed)
export type EditProfileUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'admin' | 'doctor' | 'patient';
  specialty?: string;
};
