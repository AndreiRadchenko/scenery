import * as IntentLauncher from 'expo-intent-launcher';
import { Linking, Platform } from 'react-native';

export const openMailClient = () => {
  if (Platform.OS === 'ios') {
    Linking.canOpenURL('message:0')
      .then((supported) => {
        if (!supported) {
          console.log('Cant handle url');
        } else {
          return Linking.openURL('message:0').catch(
            this.handleOpenMailClientErrors
          );
        }
      })
      .catch(this.handleOpenMailClientErrors);
  } else {
    const activityAction = 'android.intent.action.MAIN'; // Intent.ACTION_MAIN
    const intentParams = {
      flags: 268435456, // Intent.FLAG_ACTIVITY_NEW_TASK
      category: 'android.intent.category.APP_EMAIL', // Intent.CATEGORY_APP_EMAIL
    };

    IntentLauncher.startActivityAsync(activityAction, intentParams).catch(
      this.handleOpenMailClientErrors
    );
  }
};
