# Refatoração e Estrutura do Projeto App_Consulta

Este repositório passou por uma refatoração completa para melhorar a organização, manutenção e escalabilidade do código.

## O que foi feito

- **Refatoração das telas principais**: As telas `EditProfileScreen` e `CreateAppointmentScreen` foram reestruturadas seguindo o padrão modular adotado no projeto, separando hooks, components, services, models e styles em suas respectivas pastas.
- **Remoção de arquivos duplicados**: Arquivos antigos das telas que foram refatoradas foram removidos para evitar conflitos e duplicidade de código.
- **Padronização de imports e tipagem**: Todos os arquivos agora utilizam tipagem TypeScript e imports organizados, facilitando a leitura e manutenção.
- **Ajuste do tsconfig.json**: Corrigido o arquivo de configuração do TypeScript para suportar React Native, JSX e Promises.
- **Estrutura modular**: Cada tela principal agora possui sua própria pasta com subpastas para components, hooks, models, services e styles, facilitando a escalabilidade e reutilização de código.

## Estrutura após refatoração

```
src/
	components/
	contexts/
	navigation/
	routes/
	screens/
		EditProfileScreen/
			components/
			hooks/
			models/
			services/
			styles/
			index.tsx
		CreateAppointmentScreen/
			components/
			hooks/
			models/
			services/
			styles/
			index.tsx
		...outras telas
	services/
	styles/
	types/
```

## Como rodar o projeto

1. Instale as dependências:
	 ```bash
	 yarn install
	 # ou
	 npm install
	 ```
2. Instale as dependências nativas (se necessário):
	 ```bash
	 yarn add react react-native react-native-elements styled-components @react-navigation/native @react-native-async-storage/async-storage
	 yarn add -D @types/react @types/react-native @types/styled-components
	 ```
3. Execute o projeto:
	 ```bash
	 yarn android # ou yarn ios
	 # ou
	 npm run android # ou npm run ios
	 ```

## Observações

- Certifique-se de que o arquivo `expo/tsconfig.base` existe ou ajuste o `extends` do tsconfig.json conforme seu setup.
- Caso utilize Expo, siga as instruções de configuração do Expo para React Native.
- O projeto está pronto para receber novas telas seguindo o mesmo padrão modular.

---
Refatoração realizada para melhor organização, escalabilidade e manutenção do código.