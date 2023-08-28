import { Modal, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { SimpleDialogStyle as styles } from "./styles"
import useTheme from "../../theme"
import Text from "../Text"



interface propsType {
    visible: boolean
    close: () => void
    text: string
    btnText: string
    btnCilck: () => void
}

export default function SimpleDialog({ visible, close, text, btnText, btnCilck }: propsType) {

    const { colorBackground } = useTheme()

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => close()}
            style={{
                backgroundColor: 'red'
            }}>
            <TouchableWithoutFeedback
                
            >
                <View
                    style={{ ...styles.modalContainer, backgroundColor: "#333" }}>
                    <Text style={{ ...styles.textView }}>
                        {text}
                    </Text>

                    <TouchableOpacity onPress={close}
                        style={styles.btn}>
                        <Text style={{ ...styles.btnText }}>
                            {btnText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}


