import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configurar comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Solicitar permissão
export async function solicitarPermissao() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    alert('Permissão de notificação negada!');
    return false;
  }
  return true;
}

// Enviar notificação imediata
export async function enviarNotificacao(titulo: string, corpo: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: corpo,
      sound: 'default',
    },
    trigger: null, // null = envia imediatamente
  });
}

// Agendar notificação para horário específico
export async function agendarNotificacao(
  titulo: string, 
  corpo: string, 
  hora: number, // 0-23
  minuto: number // 0-59
) {
  // Calcula próximo horário
  const agora = new Date();
  const dataAgendada = new Date();
  dataAgendada.setHours(hora, minuto, 0, 0);
  
  if (dataAgendada <= agora) {
    dataAgendada.setDate(dataAgendada.getDate() + 1);
  }
  
  const segundos = Math.floor((dataAgendada.getTime() - agora.getTime()) / 1000);
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: corpo,
      sound: 'default',
    },
    trigger: {
      seconds: segundos,
      repeats: true, // Repete todo dia
    },
  });
}

// Cancelar todas notificações
export async function cancelarNotificacoes() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Configurar canal para Android 8+
export async function configurarCanalAndroid() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}