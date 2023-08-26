import { Modal, TouchableOpacity } from "react-native"
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

const SimpleDialog = ({ visible, close, text, btnText, btnCilck }: propsType) => {

    const { colorBackground } = useTheme()

    return (
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={() => close()}>
            <TouchableOpacity
                style={{ ...styles.modalContainer, backgroundColor: colorBackground }}
                onPressOut={() => close()}>
                <Text>
                    {text}
                </Text>

                <TouchableOpacity onPress={btnCilck}>
                    {btnText}
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}