import { StyleSheet } from "react-native";
import typogrphy from "../../theme/font";


export const BottomDialogStyle = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: 'white',
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    negetiveBtn: {
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    postiveBtn: {
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    negetiveBtnText: {
        fontFamily: typogrphy.fontFamily,
        fontSize: typogrphy.fontSize.m,
    },
    postiveBtnText: {
        fontFamily: typogrphy.fontFamily,
        fontSize: typogrphy.fontSize.m,
        color: "white",
    }
})


export const SimpleDialogStyle = StyleSheet.create({

    modalContainer: {
        elevation: 2,
        borderRadius: 10,
        width: 200,
        height: 100,
        // alignSelf: 'center',
        padding: 20,
        justifyContent: "space-between"
    }


})
