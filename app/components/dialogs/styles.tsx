import { StyleSheet } from "react-native";
import typogrphy from "../../theme/font";
import colors from "../../theme/colors";


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
        elevation: 10,
        borderRadius: 10,
        width: "75%",
        height: 150,
        // alignSelf: 'center',
        padding: 20,
        justifyContent: "space-between",
        alignItems: 'center'

    },
    btn: {
        width: '100%',
        alignItems: 'center'
    },
    btnText: {
        color: colors.primary,
        fontSize: typogrphy.fontSize.sm
    },
    textView: {
        fontSize: typogrphy.fontSize.sm,
        textAlign: 'center',
        marginTop: 5,

    }


})
