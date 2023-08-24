import { StyleSheet } from "react-native";
import typogrphy from "../../theme/font";
import colors from "../../theme/colors";


export function stylesphoneVeify(colorScheme: "dark" | "light" = "light") {

    return StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        contentContainer: {
            height: 300,
            width: "100%",
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        phoneTextInput: {
            width: 250,
            marginLeft: 10,
            backgroundColor: colorScheme === "dark" ? '#333' : "#e8e8e8",
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 2,
        },
        errortv: {
            fontSize: typogrphy.fontSize.sm,
            color: colors.error,
            marginBottom: 10
        },
        enterPhonetv: {
            fontSize: typogrphy.fontSize.sm,
            color: "#888",
            marginBottom: 30
        },
        enterCodetv: {
            fontSize: typogrphy.fontSize.sm,
            color: "#aaaaaa",
            marginBottom: 10
        },
        phoneTextView: {
            fontSize: typogrphy.fontSize.sm,
            color: "#aaaaaa",
            marginBottom: 10,
            marginRight: 10,
        },
        editBtntv: {
            color: colors.primary,
            fontSize: typogrphy.fontSize.sm,
        }

    })

}


export function stylesLogin() {

    return StyleSheet.create({
        contentContainer: {


        }
    })

}