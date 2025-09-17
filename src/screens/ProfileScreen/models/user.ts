export interface UserRole {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const userRoles: UserRole[] = [
  {
    id: 'admin',
    name: 'Administrador',
    description: 'Acesso completo ao sistema',
    color: '#2196F3',
  },
  {
    id: 'doctor',
    name: 'Médico',
    description: 'Gerenciar consultas e pacientes',
    color: '#4CAF50',
  },
  {
    id: 'patient',
    name: 'Paciente',
    description: 'Agendar e gerenciar consultas',
    color: '#FF9800',
  },
];

export const getRoleText = (role: string): string => {
  const roleData = userRoles.find(r => r.id === role);
  return roleData ? roleData.name : role;
};

export const getRoleColor = (role: string): string => {
  const roleData = userRoles.find(r => r.id === role);
  return roleData ? roleData.color : '#666666';
};

export const getRoleDescription = (role: string): string => {
  const roleData = userRoles.find(r => r.id === role);
  return roleData ? roleData.description : 'Função não definida';
};

export const getDefaultAvatar = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'https://via.placeholder.com/150/2196F3/FFFFFF?text=A';
    case 'doctor':
      return 'https://via.placeholder.com/150/4CAF50/FFFFFF?text=M';
    case 'patient':
      return 'https://via.placeholder.com/150/FF9800/FFFFFF?text=P';
    default:
      return 'https://via.placeholder.com/150/666666/FFFFFF?text=?';
  }
};

export const getUserStatistics = (role: string) => {
  switch (role) {
    case 'admin':
      return {
        title: 'Estatísticas Administrativas',
        metrics: ['Total de Usuários', 'Consultas do Dia', 'Médicos Ativos'],
      };
    case 'doctor':
      return {
        title: 'Estatísticas Médicas',
        metrics: ['Consultas Hoje', 'Pacientes Atendidos', 'Horários Livres'],
      };
    case 'patient':
      return {
        title: 'Minhas Consultas',
        metrics: ['Consultas Agendadas', 'Consultas Realizadas', 'Próxima Consulta'],
      };
    default:
      return {
        title: 'Estatísticas',
        metrics: ['Total', 'Concluídas', 'Pendentes'],
      };
  }
};
