import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ProfileService, UserProfile } from '../services/profileService';
import { getUserStatistics } from '../models/user';

export const useProfile = () => {
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [statistics, setStatistics] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, [user]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      if (user) {
        setUserProfile(user);
        const userStats = await ProfileService.getUserStatistics();
        setStatistics(userStats);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    // Lógica para editar perfil será implementada posteriormente
    console.log('Editar perfil do usuário:', userProfile);
  };

  const handleSignOut = async () => {
    try {
      await ProfileService.clearUserProfile();
      signOut();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      signOut(); // Faz logout mesmo se houver erro
    }
  };

  const handleGoBack = () => {
    // Lógica para voltar será implementada pelo componente pai
    console.log('Voltar para tela anterior');
  };

  return {
    userProfile,
    statistics,
    loading,
    handleEditProfile,
    handleSignOut,
    handleGoBack,
  };
};
