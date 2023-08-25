import { StyleSheet } from "react-native";
import typogrphy from "../../theme/font";


export default StyleSheet.create({
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