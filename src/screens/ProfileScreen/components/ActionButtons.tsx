import React from 'react';
import { Button } from 'react-native-elements';
import theme from '../../../styles/theme';

interface ActionButtonsProps {
  onEditProfile: () => void;
  onGoBack: () => void;
  onSignOut: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEditProfile,
  onGoBack,
  onSignOut,
}) => {
  return (
    <>
      <Button
        title="Editar Perfil"
        onPress={onEditProfile}
        buttonStyle={{
          backgroundColor: theme.colors.primary,
          paddingVertical: 12,
          marginBottom: 20,
        }}
      />

      <Button
        title="Voltar"
        onPress={onGoBack}
        buttonStyle={{
          backgroundColor: theme.colors.secondary,
          paddingVertical: 12,
          marginBottom: 20,
        }}
      />

      <Button
        title="Sair"
        onPress={onSignOut}
        buttonStyle={{
          backgroundColor: theme.colors.error,
          paddingVertical: 12,
        }}
      />
    </>
  );
};
