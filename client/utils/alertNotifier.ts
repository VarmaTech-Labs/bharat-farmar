import { Toast, ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export const showSuccessToast = (title: string, message: string) => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title,
    textBody: message,
  });
};

export const showErrorToast = (title: string, message: string) => {
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title,
    textBody: message,

  });
};

export const showSuccessDialog = (title: string, message: string) => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title,
      textBody: message,
      button: 'Close',
      onPressButton: () => Dialog.hide(),  // Close dialog when button is pressed
    });
  };
  
  export const showErrorDialog = (title: string, message: string) => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title,
      textBody: message,
      closeOnOverlayTap: true,
       autoClose:true,
      button: 'Close',
      onPressButton: () => Dialog.hide(),  // Close dialog when button is pressed
      
    });
  };
  
