import { useContext, useEffect, useState } from "react"
import { SectionList, View, StyleSheet } from "react-native"
import Text from "../Text"
import { WebSocketContext } from "../../webSocketContextContainer"
import { convertDataToSection } from "./utils"
import { chatsType } from "../MainScreen/ChatList/types"
import typogrphy from "../../theme/font"
import { Image } from "expo-image"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import useTheme from "../../theme"


export type contactType = {
    name: string
    phone: string
}

export type sectionType = {
    title: string,
    data: contactType[]
}

const DATA = [
    {
        name: "ali",
        phone: "+98934345",
    },
    {
        name: "reza",
        phone: "+98934345"
    },
    {
        name: "Hasan",
        phone: "+98934345"
    },
    {
        name: "alireza",
        phone: "+98934345"
    },
    {
        name: "hosein",
        phone: "+98934345"
    },
    {
        name: "ali",
        phone: "+98934345"
    },
    {
        name: "reza",
        phone: "+98934345"
    },
    {
        name: "hasan",
        phone: "+98934345"
    },
    {
        name: "alireza",
        phone: "+98934345"
    },
    {
        name: "hosein",
        phone: "+98934345"
    }, {
        name: "ali",
        phone: "+98934345"
    },
    {
        name: "reza",
        phone: "+98934345"
    },
    {
        name: "hasan",
        phone: "+98934345"
    },
    {
        name: "alireza",
        phone: "+98934345"
    },
    {
        name: "hosein",
        phone: "+98934345"
    },
]


const ContactsList = () => {

    const { colorText } = useTheme()

    const socket = useContext(WebSocketContext)
    const [chats, setChats] = useState<contactType[]>(DATA)
    const [len, setLen] = useState([])

    const onPress = () => {


    }

    const Header = () => (
        <>
            <View
                style={styles.btns}
            >
                <FontAwesome5 name="user-alt" color={colorText} size={20} />

                <Text style={{ marginLeft: 15 }}>
                    Start Chat With User ID
                </Text>
            </View>
            <View
                style={styles.btns}
            >
                <FontAwesome5 name="user-plus" color={colorText} size={20} />
                <Text style={{ marginLeft: 15 }}>
                    New Contact
                </Text>
            </View>
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
                ListHeaderComponent={Header}
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