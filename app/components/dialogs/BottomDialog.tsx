
import { View, TouchableOpacity, Text } from "react-native";
import { BottomSheet } from 'react-native-btr';
import { BottomDialogStyle as styles } from "./styles";
import colors from "../../theme/colors";

//@ts-ignore
const BottomSheetDialog = ({ deletedItemId, setDeletedItemId, onDelete, message, buttonsTitle, confirmColor }) => (
    <BottomSheet
        visible={deletedItemId !== -1}>
        <View style={styles.container}>
            <View style={{ padding: 20 }}>
                <Text>{message}</Text>
            </View>
            <View style={styles.body}>
                <TouchableOpacity
                    onPress={() => setDeletedItemId(-1)}
                    style={styles.negetiveBtn}
                >
                    <Text style={styles.negetiveBtnText}>
                        {buttonsTitle ? buttonsTitle.cancel : "Cancel"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onDelete(deletedItemId)}
                    style={{
                        ...styles.postiveBtn,
                        backgroundColor: confirmColor ? confirmColor : colors.error,
                    }}
                >
                    <Text style={styles.postiveBtnText}>
                        {buttonsTitle ? buttonsTitle.confirm : "Delete"}
                    </Text>

                </TouchableOpacity>
            </View>

        </View>
    </BottomSheet >
)

export default BottomSheetDialog