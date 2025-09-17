import React from 'react';
import { UserProfile } from '../services/profileService';
import { getRoleText, getDefaultAvatar } from '../models/user';
import {
  ProfileCard as StyledProfileCard,
  Avatar,
  Name,
  Email,
  RoleBadge,
  RoleText,
  SpecialtyText,
} from '../styles';

interface ProfileCardProps {
  user: UserProfile | null;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <StyledProfileCard>
      <Avatar 
        source={{ 
          uri: user.image || getDefaultAvatar(user.role) 
        }} 
      />
      <Name>{user.name}</Name>
      <Email>{user.email}</Email>
      <RoleBadge role={user.role}>
        <RoleText>{getRoleText(user.role)}</RoleText>
      </RoleBadge>
      
      {user.role === 'doctor' && user.specialty && (
        <SpecialtyText>Especialidade: {user.specialty}</SpecialtyText>
      )}
    </StyledProfileCard>
  );
};
