import { useCallback } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from 'react-native';


const useOverwriteBackHadler = (doesOverwrite: boolean, baseOnFunc: any, onDo: () => void) => {

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (doesOverwrite) {
                    onDo();
                    return true;
                } else {
                    return false;
                }
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [doesOverwrite, baseOnFunc])
    );

}

export default useOverwriteBackHadler