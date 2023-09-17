import { useContext, useEffect, useState } from "react"
import { SectionList, View, StyleSheet, TouchableOpacity } from "react-native"
import Text from "../Text"
import { WebSocketContext } from "../../webSocketContextContainer"
import { convertDataToSection } from "./utils"
import { chatItemType } from "../MainScreen/ChatList/types"
import typogrphy from "../../theme/font"
import { Image } from "expo-image"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import useTheme from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { MainStackParams, RootStackParamsType } from "../../navigator/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"


export type contactType = {
    name: string
    phone: string
}

export type sectionType = {
    title: string,
    data: contactType[]
}

const DATA: contactType[] | (() => contactType[]) = [

]


const ContactsList = () => {

    const { colorText } = useTheme()

    const socket = useContext(WebSocketContext)
    const [chats, setChats] = useState<contactType[]>(DATA)
    const [len, setLen] = useState([])
    const navigtaion = useNavigation<NativeStackNavigationProp<MainStackParams, 'startchat'>>()

    const onPress = () => {

    }

    const goToStartWithUseridScreen = () => {
        navigtaion.navigate("startwithuserid")
    }

    const renderHeader = () => (
        <>
            <TouchableOpacity
                onPress={goToStartWithUseridScreen}
                activeOpacity={0.9}
                style={styles.btns}>

                <FontAwesome5 name="user-alt" color={colorText} size={20} />
                <Text style={{ marginLeft: 15 }}>
                    Start Chat With Username
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.btns}
            >
                <FontAwesome5 name="user-plus" color={colorText} size={20} />
                <Text style={{ marginLeft: 15 }}>
                    New Contact
                </Text>
            </TouchableOpacity>
        </>
    )

    const renderItem = ({ item, index }: { item: contactType, index: number }) => {
        return (
            <View
                style={styles.item}
            >


                <Image
                    source={require("../../assets/1_main.jpg")}
                    style={{
                        marginRight: 10,
                        width: 50,
                        height: 50,
                        borderRadius: 50 / 2
                    }} />
                <View>

                    <Text style={styles.itemTextName}>
                        {item.name}
                    </Text>
                    <Text style={styles.itemTextPhone}>
                        {item.phone}
                    </Text>
                </View>
            </View>
        )
    }
    return (
        <>

            <SectionList
                style={styles.sectionContainer}
                sections={convertDataToSection(chats)}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                keyExtractor={(item, index) => "contact-" + index}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionTitle}>{title}</Text>
                )}

            />
        </>
    )
}


const styles = StyleSheet.create({
    sectionContainer: {
        padding: 15,
    },
    btns: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        marginLeft: 40,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: 'center'
    },
    itemTextName: {

    },
    itemTextPhone: {
        fontSize: typogrphy.fontSize.sm,
        marginLeft: 5,
        color: '#444'
    },
    sectionTitle: {
        margin: 10,
        fontSize: typogrphy.fontSize.xlg
    }
})

export default ContactsList