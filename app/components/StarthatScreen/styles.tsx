import { StatusBar, StyleSheet } from "react-native";
import colors from "../../theme/colors";
import typogrphy from "../../theme/font";

const innerPadding = 20

export default StyleSheet.create({

    container: {
        padding: innerPadding,
        paddingTop: (StatusBar.currentHeight ? StatusBar.currentHeight : innerPadding),
        paddingBottom: 20,
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        justifyContent: 'space-between',
    },
    mainTitle: {
        color: 'white',
        fontSize: typogrphy.fontSize.lg,
        marginLeft: 20,
        fontWeight: 'bold',
    }
})