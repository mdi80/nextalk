import { StatusBar, StyleSheet } from "react-native";
import colors from "../../theme/colors";
import typogrphy from "../../theme/font";




export default StyleSheet.create({

    container: {
        flex: 1
    },
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
        paddingHorizontal: 20,
        paddingBottom: 0,
        paddingTop: StatusBar.currentHeight,
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