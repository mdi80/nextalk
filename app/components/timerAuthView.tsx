import { StyleSheet, View } from "react-native"
import Text from "./Text"
import typogrphy from "../theme/font"



const TimerAuthView = ({ timer }: { timer: number }) => {

    return (
        <View
            style={styles.container}>
            <Text style={styles.textView}>

                {Math.floor((timer) / 60)}
                :
                {((timer) % 60) < 10 && "0"}{(timer) % 60}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        bottom: 20,
    },
    textView: {
        color: "#777",
        fontSize: typogrphy.fontSize.lg
    }

})


export default TimerAuthView