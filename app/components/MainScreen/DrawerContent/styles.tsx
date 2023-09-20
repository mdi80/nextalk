import { StatusBar, StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import typogrphy from "../../../theme/font";




export const drawerHeaderStyles = (scheme: "light" | "dark") => {

    return StyleSheet.create({


        profileListContainer: {
            overflow: 'hidden',
            elevation: 2
        },
        profileListHeaderItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        profileListHeaderItemText: {
            color: 'white',
            fontWeight: "bold"
        },
        profileListHeaderItemNumberText: {
            color: 'white',
            fontSize: typogrphy.fontSize.sm,
        },
        profileListItem: {

            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 20,

        },
        profileListItemCheckIcon: {
            position: 'absolute',
            bottom: 0,
            right: 0,
        },
        headerDrawerContainer: {
            backgroundColor: scheme === "light" ? colors.primary : colors.dark.background,
            paddingHorizontal: 20,
            paddingBottom: 0,
            paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 40,
        },
        headerDrawerContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        addAccountBtn: {
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 20,
        }

    })

}
export const drawerBodyStyles = (scheme: "light" | "dark") => {

    return StyleSheet.create({
        container: {

        },
        btnItem: {
            flexDirection: 'row',
            padding: 20,

        },
        divider: {
            width: "100%",
            height: 1,
            backgroundColor: scheme === "light" ? 'gray' : colors.dark.background,
        },
        btnItemText: {
            marginLeft: 20,
        }
    })
}